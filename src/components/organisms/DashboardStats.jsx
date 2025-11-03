import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";
import { formatCurrency } from "@/utils/formatters";

const DashboardStats = ({ accounts, transactions, budgets, goals }) => {
  const totalBalance = accounts?.reduce((sum, account) => sum + account.balance, 0) || 0;
  
  const currentMonth = new Date().getMonth();
  const monthlyTransactions = transactions?.filter(t => new Date(t.date).getMonth() === currentMonth) || [];
  const monthlySpending = monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalBudget = budgets?.reduce((sum, budget) => sum + budget.allocated, 0) || 0;
  const budgetUtilization = totalBudget > 0 ? (monthlySpending / totalBudget) * 100 : 0;
  
  const completedGoals = goals?.filter(g => g.status === "completed").length || 0;
  const totalGoals = goals?.length || 0;
  const goalsProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const stats = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: "Wallet",
      trend: "+2.5%",
      trendDirection: "up",
      valueColor: totalBalance >= 0 ? "text-success" : "text-error"
    },
    {
      title: "Monthly Spending",
      value: formatCurrency(monthlySpending),
      icon: "CreditCard",
      trend: "+12.3%",
      trendDirection: "up",
      valueColor: "text-gray-900"
    },
    {
      title: "Budget Utilization",
      value: `${budgetUtilization.toFixed(0)}%`,
      icon: "Target",
      trend: budgetUtilization > 100 ? "Over Budget" : "On Track",
      trendDirection: budgetUtilization > 100 ? "down" : "up",
      valueColor: budgetUtilization > 100 ? "text-error" : budgetUtilization > 80 ? "text-warning" : "text-success"
    },
    {
      title: "Goals Progress",
      value: `${goalsProgress.toFixed(0)}%`,
      icon: "Trophy",
      trend: `${completedGoals}/${totalGoals}`,
      trendDirection: "up",
      valueColor: "text-primary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;