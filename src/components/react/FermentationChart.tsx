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

interface FermentationData {
  timestamps: string[];
  temperature: number[];
  gravity: number[];
}

interface Props {
  brewfatherId?: string;
}

export default function FermentationChart({ brewfatherId }: Props) {
  const [error, setError] = useState("");
  const [data, setData] = useState<FermentationData | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!brewfatherId) {
        setError("No Brewfather ID provided");
        return;
      }

      const apiUrl = new URL("/api/brewfather", window.location.href);
      apiUrl.searchParams.set("batchId", brewfatherId);

      try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData.error || response.statusText);
        }

        setData(jsonData);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        setError(errorMessage);
      }
    }

    fetchData();
  }, [brewfatherId]);

  if (error) {
    return (
      <div className="text-light-text/60 dark:text-dark-text/60 text-center py-8">
        <p>Unable to load fermentation data</p>
        <p className="text-sm mt-2 text-red-500">{error}</p>
      </div>
    );
  }

  const chartData = {
    labels: data?.timestamps || [],
    datasets: [
      {
        label: "Temperature (°F)",
        data: data?.temperature || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "temp",
        tension: 0.1,
      },
      {
        label: "Gravity (SG)",
        data: data?.gravity || [],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        yAxisID: "gravity",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <Line
        data={chartData}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            temp: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Temperature (°F)",
              },
              grid: {
                drawOnChartArea: false,
              },
            },
            gravity: {
              type: "linear",
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Gravity (SG)",
              },
              grid: {
                drawOnChartArea: false,
              },
              // Adjust gravity scale to show 3 decimal places
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
                    // Format gravity to 3 decimal places, temperature to 1
                    label += context.dataset.yAxisID === 'gravity' 
                      ? context.parsed.y.toFixed(3)
                      : context.parsed.y.toFixed(1);
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