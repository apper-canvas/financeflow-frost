import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { pieChartOptions } from "@/utils/chartOptions";

const SpendingChart = ({ transactions }) => {
  const [chartData, setChartData] = useState({ series: [], labels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!transactions || transactions.length === 0) {
          setChartData({ series: [], labels: [] });
          setLoading(false);
          return;
        }

        // Process spending by category
        const categorySpending = {};
        transactions
          .filter(t => t.type === "expense")
          .forEach(transaction => {
            const category = transaction.category;
            categorySpending[category] = (categorySpending[category] || 0) + Math.abs(transaction.amount);
          });

        const series = Object.values(categorySpending);
        const labels = Object.keys(categorySpending);

        setChartData({ series, labels });
      } catch (err) {
        setError("Failed to load spending data");
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [transactions]);

  if (loading) return <Loading type="chart" />;
  
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  
  if (chartData.series.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No spending data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
      <Chart
        options={{
          ...pieChartOptions,
          labels: chartData.labels
        }}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </Card>
  );
};

export default SpendingChart;