import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { accountService } from "@/services/api/accountService";
import { transactionService } from "@/services/api/transactionService";
import { budgetService } from "@/services/api/budgetService";
import { goalService } from "@/services/api/goalService";
import { billService } from "@/services/api/billService";
import Button from "@/components/atoms/Button";
import BudgetOverview from "@/components/organisms/BudgetOverview";
import UpcomingBills from "@/components/organisms/UpcomingBills";
import RecentTransactions from "@/components/organisms/RecentTransactions";
import SpendingChart from "@/components/organisms/SpendingChart";
import DashboardStats from "@/components/organisms/DashboardStats";
import FeatureHighlight from "@/components/organisms/FeatureHighlight";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [accountsData, transactionsData, budgetsData, goalsData, billsData] = await Promise.all([
          accountService.getAll(),
          transactionService.getAll(),
          budgetService.getAll(),
          goalService.getAll(),
          billService.getAll()
        ]);

        setAccounts(accountsData);
        setTransactions(transactionsData);
        setBudgets(budgetsData);
        setGoals(goalsData);
        setBills(billsData);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
{/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-xl p-8 lg:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Take Control of Your 
            <span className="text-primary"> Financial Future</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Track expenses effortlessly, manage budgets with confidence, and achieve your financial goals. 
            Get real-time insights into your spending patterns and make smarter money decisions.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-accent text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => window.location.href = '/transactions'}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>

      {/* Dashboard Stats */}
<DashboardStats 
        accounts={accounts}
        transactions={transactions}
        budgets={budgets}
        goals={goals}
      />

      {/* Feature Highlights */}
      <FeatureHighlight />
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Chart */}
        <SpendingChart transactions={transactions} />
        
        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Overview */}
        <BudgetOverview budgets={budgets} transactions={transactions} />
        
        {/* Upcoming Bills */}
        <UpcomingBills bills={bills} />
      </div>
    </motion.div>
  );
};

export default Dashboard;