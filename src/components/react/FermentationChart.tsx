import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Site color scheme
const colors = {
  light: {
    text: '#1f2937',
    accent: '#b8956c',
    background: '#ffffff',
    grid: 'rgba(31, 41, 55, 0.1)',
  },
  dark: {
    text: '#e4d6a7',
    accent: '#e9b872',
    background: '#1f2937',
    grid: 'rgba(228, 214, 167, 0.1)',
  }
};

interface BrewfatherReading {
  type: string;
  id: string;
  temp: number;
  comment?: string;
  time: number;
  sg: number;
  pressure: number;
}

interface Props {
  brewfatherId?: string;
}

function formatBrewfatherDate(timestamp: number) {
  const date = new Date(timestamp);
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

export default function FermentationChart({ brewfatherId }: Props) {
  const [error, setError] = useState("");
  const [readings, setReadings] = useState<BrewfatherReading[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!brewfatherId) {
        setError("No Brewfather ID provided");
        return;
      }

      try {
        const apiUrl = new URL("/api/brewfather", window.location.href);
        apiUrl.searchParams.set("batchId", brewfatherId);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.details || response.statusText);
        }

        // Sort readings by timestamp
        const sortedReadings = data.sort((a: BrewfatherReading, b: BrewfatherReading) => 
          a.time - b.time
        );

        setReadings(sortedReadings);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        setError(errorMessage);
      }
    }

    fetchData();
  }, [brewfatherId]);

  if (readings.length === 0) {
    return (
      <div className="text-light-text/60 dark:text-dark-text/60 text-center py-8 h-64">
        <p>{error || "Loading fermentation data..."}</p>
      </div>
    );
  }

  const theme = isDark ? colors.dark : colors.light;

  const chartData = {
    labels: readings.map(r => formatBrewfatherDate(r.time)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: readings.map(r => r.temp),
        borderColor: theme.accent,
        backgroundColor: `${theme.accent}33`,
        yAxisID: "temp",
        borderWidth: 2,
      },
      {
        label: "Gravity (SG)",
        data: readings.map(r => r.sg),
        borderColor: theme.text,
        backgroundColor: `${theme.text}33`,
        yAxisID: "gravity",
        borderWidth: 2,
      }
    ],
  };

  return (
    <div className="w-full h-64 [&_canvas]:!border-none">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              border: { display: false },
              display: true,
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                color: theme.text,
              },
              grid: {
                color: theme.grid,
              }
            },
            temp: {
              type: "linear" as const,
              display: true,
              position: "left" as const,
              border: { display: false },
              title: {
                display: true,
                text: "Temperature (°C)",
                color: theme.text,
              },
              grid: {
                color: theme.grid,
              },
              ticks: {
                color: theme.text,
              }
            },
            gravity: {
              type: "linear" as const,
              display: true,
              position: "right" as const,
              border: { display: false },
              min: 1.000,
              max: 1.100,
              title: {
                display: true,
                text: "Gravity (SG)",
                color: theme.text,
              },
              grid: {
                color: theme.grid,
              },
              ticks: {
                color: theme.text,
                callback: function(value: number | string): string {
                  return typeof value === 'number' ? value.toFixed(3) : String(value);
                }
              }
            },
          },
          plugins: {
            legend: {
              labels: {
                color: theme.text,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                boxWidth: 6,
                boxHeight: 6,
              },
              position: 'top' as const,
              align: 'start' as const,
            },
            tooltip: {
              backgroundColor: theme.background,
              titleColor: theme.text,
              bodyColor: theme.text,
              borderColor: theme.grid,
              borderWidth: 0,
              padding: 8,
              callbacks: {
                label: function(context: { dataset: { label?: string, yAxisID?: string }, parsed: { y: number | null } }): string {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    const value = Number(context.parsed.y);
                    label += context.dataset.yAxisID === 'gravity' 
                      ? value.toFixed(3)
                      : value.toFixed(1);
                  }
                  return label;
                }
              }
            }
          },
          elements: {
            line: {
              borderWidth: 2,
              tension: 0.1
            },
            point: {
              borderWidth: 0,
              radius: 3,
              hoverRadius: 6
            }
          },
        }}
      />
    </div>
  );
} 