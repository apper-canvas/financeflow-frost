import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { transactionService } from "@/services/api/transactionService";
import { budgetService } from "@/services/api/budgetService";
import { formatCurrency } from "@/utils/formatters";
import { pieChartOptions, barChartOptions } from "@/utils/chartOptions";

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("6");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [transactionsData, budgetsData] = await Promise.all([
        transactionService.getAll(),
        budgetService.getAll()
      ]);

      setTransactions(transactionsData);
      setBudgets(budgetsData);
    } catch (err) {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const getMonthlyData = () => {
    const months = parseInt(selectedPeriod);
    const monthlyData = {};
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = date.toISOString().slice(0, 7); // YYYY-MM format
      const monthName = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      
      monthlyData[key] = {
        name: monthName,
        income: 0,
        expenses: 0
      };
    }

    transactions.forEach(transaction => {
      const transactionMonth = transaction.date.slice(0, 7);
      if (monthlyData[transactionMonth]) {
        if (transaction.type === "income") {
          monthlyData[transactionMonth].income += transaction.amount;
        } else {
          monthlyData[transactionMonth].expenses += Math.abs(transaction.amount);
        }
      }
    });

    return Object.values(monthlyData);
  };

  const getCategorySpending = () => {
    const categorySpending = {};
    
    transactions
      .filter(t => t.type === "expense")
      .forEach(transaction => {
        const category = transaction.category;
        categorySpending[category] = (categorySpending[category] || 0) + Math.abs(transaction.amount);
      });

    return {
      series: Object.values(categorySpending),
      labels: Object.keys(categorySpending)
    };
  };

  const getTopCategories = () => {
    const categorySpending = {};
    
    transactions
      .filter(t => t.type === "expense")
      .forEach(transaction => {
        const category = transaction.category;
        categorySpending[category] = (categorySpending[category] || 0) + Math.abs(transaction.amount);
      });

    return Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getBudgetVsActual = () => {
    const budgetComparison = budgets.map(budget => {
      const categorySpending = transactions
        .filter(t => t.category === budget.category && t.type === "expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        category: budget.category,
        budget: budget.allocated,
        actual: categorySpending,
        variance: budget.allocated - categorySpending
      };
    });

    return budgetComparison;
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategorySpending();
  const topCategories = getTopCategories();
  const budgetComparison = getBudgetVsActual();

  const monthlyChartData = {
    series: [
      {
        name: "Income",
        data: monthlyData.map(m => m.income)
      },
      {
        name: "Expenses",
        data: monthlyData.map(m => m.expenses)
      }
    ]
  };

  const monthlyChartOptions = {
    ...barChartOptions,
    xaxis: {
      ...barChartOptions.xaxis,
      categories: monthlyData.map(m => m.name)
    }
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights into your spending patterns and trends</p>
        </div>
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-40"
        >
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
          <option value="12">Last 12 months</option>
        </Select>
      </div>

      {/* Monthly Trends */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Income vs Expenses Trend</h3>
        <Chart
          options={monthlyChartOptions}
          series={monthlyChartData.series}
          type="bar"
          height={350}
        />
      </Card>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
          {categoryData.series.length > 0 ? (
            <Chart
              options={{
                ...pieChartOptions,
                labels: categoryData.labels
              }}
              series={categoryData.series}
              type="donut"
              height={350}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No spending data available</p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Spending Categories</h3>
          <div className="space-y-4">
            {topCategories.length > 0 ? (
              topCategories.map(([category, amount], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">#{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{category}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No spending data available</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Budget Analysis */}
      {budgetComparison.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget vs Actual Spending</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Category</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Budget</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Actual</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Variance</th>
                </tr>
              </thead>
              <tbody>
                {budgetComparison.map((item, index) => (
                  <motion.tr
                    key={item.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 px-2 font-medium text-gray-900">{item.category}</td>
                    <td className="py-4 px-2 text-right text-gray-600">{formatCurrency(item.budget)}</td>
                    <td className="py-4 px-2 text-right text-gray-900">{formatCurrency(item.actual)}</td>
                    <td className={`py-4 px-2 text-right font-medium ${
                      item.variance >= 0 ? "text-success" : "text-error"
                    }`}>
                      {item.variance >= 0 ? "+" : ""}{formatCurrency(item.variance)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Key Insights */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Average Monthly Spending</h4>
            <p className="text-2xl font-bold text-blue-800">
              {formatCurrency(
                monthlyData.reduce((sum, month) => sum + month.expenses, 0) / monthlyData.length || 0
              )}
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Average Monthly Income</h4>
            <p className="text-2xl font-bold text-green-800">
              {formatCurrency(
                monthlyData.reduce((sum, month) => sum + month.income, 0) / monthlyData.length || 0
              )}
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Total Transactions</h4>
            <p className="text-2xl font-bold text-purple-800">{transactions.length}</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-2">Top Category</h4>
            <p className="text-lg font-bold text-orange-800">
              {topCategories.length > 0 ? topCategories[0][0] : "N/A"}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Analytics;