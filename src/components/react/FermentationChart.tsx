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

  useEffect(() => {
    async function fetchData() {
      if (!brewfatherId) {
        console.log("No brewfatherId provided");
        setError("No Brewfather ID provided");
        return;
      }

      console.log("Fetching data for brewfatherId:", brewfatherId);
      const apiUrl = new URL("/api/brewfather", window.location.href);
      apiUrl.searchParams.set("batchId", brewfatherId);

      try {
        const response = await fetch(apiUrl);
        const rawData = await response.json();

        if (!response.ok) {
          throw new Error(rawData.error || response.statusText);
        }

        // Sort readings by timestamp
        const sortedReadings = rawData.sort((a: BrewfatherReading, b: BrewfatherReading) => 
          new Date(a.time).getTime() - new Date(b.time).getTime()
        );

        console.log("Received readings:", {
          count: sortedReadings.length,
          first: sortedReadings[0],
          last: sortedReadings[sortedReadings.length - 1]
        });

        setReadings(sortedReadings);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        console.error("Chart Error:", errorMessage);
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

  const chartData = {
    labels: readings.map(r => formatBrewfatherDate(r.time)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: readings.map(r => r.temp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "temp",
      },
      {
        label: "Gravity (SG)",
        data: readings.map(r => r.sg),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        yAxisID: "gravity",
      }
    ],
  };

  return (
    <div className="w-full h-64">
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
              display: true,
              ticks: {
                maxRotation: 45,
                minRotation: 45
              }
            },
            temp: {
              type: "linear" as const,
              display: true,
              position: "left" as const,
              title: {
                display: true,
                text: "Temperature (°C)",
              },
              grid: {
                drawOnChartArea: false,
              },
            },
            gravity: {
              type: "linear" as const,
              display: true,
              position: "right" as const,
              min: 1.000,
              max: 1.100,
              title: {
                display: true,
                text: "Gravity (SG)",
              },
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                callback: function(value) {
                  return value.toFixed(3);
                }
              }
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
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
          }
        }}
      />
    </div>
  );
} 