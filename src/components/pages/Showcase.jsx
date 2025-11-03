import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import DashboardStats from "@/components/organisms/DashboardStats";
import SpendingChart from "@/components/organisms/SpendingChart";
import BudgetOverview from "@/components/organisms/BudgetOverview";
import UpcomingBills from "@/components/organisms/UpcomingBills";
import RecentTransactions from "@/components/organisms/RecentTransactions";
import ApperIcon from "@/components/ApperIcon";

const Showcase = () => {
  const navigate = useNavigate();

  // Sample data for demonstration
  const sampleAccounts = [
    { Id: 1, name: "Checking Account", type: "checking", balance: 4250.75, institution: "Chase Bank" },
    { Id: 2, name: "Savings Account", type: "savings", balance: 12800.50, institution: "Wells Fargo" },
    { Id: 3, name: "Credit Card", type: "credit", balance: -1200.25, institution: "American Express" }
  ];

  const sampleTransactions = [
    { Id: 1, description: "Grocery Store", amount: -89.50, type: "expense", category: "Food", date: "2024-01-15", accountId: 1 },
    { Id: 2, description: "Salary Deposit", amount: 3500.00, type: "income", category: "Income", date: "2024-01-15", accountId: 1 },
    { Id: 3, description: "Electric Bill", amount: -125.00, type: "expense", category: "Utilities", date: "2024-01-14", accountId: 1 },
    { Id: 4, description: "Gas Station", amount: -45.20, type: "expense", category: "Transportation", date: "2024-01-14", accountId: 1 },
    { Id: 5, description: "Netflix Subscription", amount: -15.99, type: "expense", category: "Entertainment", date: "2024-01-13", accountId: 1 },
    { Id: 6, description: "Amazon Purchase", amount: -67.85, type: "expense", category: "Shopping", date: "2024-01-12", accountId: 1 },
    { Id: 7, description: "Doctor Visit", amount: -150.00, type: "expense", category: "Healthcare", date: "2024-01-12", accountId: 1 },
    { Id: 8, description: "Rent Payment", amount: -1200.00, type: "expense", category: "Housing", date: "2024-01-01", accountId: 1 }
  ];

  const sampleBudgets = [
    { Id: 1, category: "Food", allocated: 400, period: "monthly", startDate: "2024-01-01", alerts: true },
    { Id: 2, category: "Transportation", allocated: 200, period: "monthly", startDate: "2024-01-01", alerts: true },
    { Id: 3, category: "Entertainment", allocated: 150, period: "monthly", startDate: "2024-01-01", alerts: true },
    { Id: 4, category: "Shopping", allocated: 300, period: "monthly", startDate: "2024-01-01", alerts: true }
  ];

  const sampleGoals = [
    { Id: 1, name: "Emergency Fund", targetAmount: 10000, currentAmount: 7500, status: "in-progress" },
    { Id: 2, name: "Vacation Savings", targetAmount: 3000, currentAmount: 3000, status: "completed" },
    { Id: 3, name: "New Car", targetAmount: 15000, currentAmount: 4200, status: "in-progress" }
  ];

  const sampleBills = [
    { Id: 1, name: "Electric Bill", amount: 125.00, dueDate: "2024-01-20", category: "Utilities", isPaid: false, recurring: true, frequency: "monthly" },
    { Id: 2, name: "Internet Service", amount: 79.99, dueDate: "2024-01-18", category: "Utilities", isPaid: false, recurring: true, frequency: "monthly" },
    { Id: 3, name: "Car Insurance", amount: 180.00, dueDate: "2024-01-22", category: "Insurance", isPaid: false, recurring: true, frequency: "monthly" },
    { Id: 4, name: "Phone Bill", amount: 65.00, dueDate: "2024-01-25", category: "Phone", isPaid: false, recurring: true, frequency: "monthly" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
{/* Hero Section */}
      <Card className="text-center py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ApperIcon name="Wallet" size={40} className="text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Track All Your Accounts in One Place
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Create budgets, monitor spending, and get personalized insights
          </p>
          <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
            Join thousands of users who have transformed their financial lives with our comprehensive 
            money management platform. Get complete visibility into your finances and make smarter decisions.
          </p>
<div className="flex items-center justify-center mb-8">
            <Button size="lg" className="flex items-center gap-3 px-8 py-4 text-lg">
              <ApperIcon name="Sparkles" size={24} />
              Sign Up Free
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            No credit card required • Free forever • 2-minute setup
          </p>
        </motion.div>
      </Card>
{/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Over 10,000+ Users
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our users have saved money and improved their financial health
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <ApperIcon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              "I've saved over $2,400 this year just by following the budget recommendations. 
              The insights are incredible!"
            </p>
            <div className="font-semibold text-gray-900">Sarah Johnson</div>
            <div className="text-sm text-gray-500">Marketing Manager</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <ApperIcon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              "Finally, all my accounts in one place. The bill reminders have saved me from 
              late fees countless times."
            </p>
            <div className="font-semibold text-gray-900">Michael Chen</div>
            <div className="text-sm text-gray-500">Software Engineer</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <ApperIcon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              "The investment tracking and financial goals features helped me build an emergency fund 
              in just 8 months."
            </p>
            <div className="font-semibold text-gray-900">Emily Rodriguez</div>
            <div className="text-sm text-gray-500">Teacher</div>
          </Card>
        </div>
      </motion.div>

      {/* Money Savings Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              See How Much You Could Save
            </h3>
            <p className="text-lg text-gray-600">
              Our users save an average of $312 per month by using our financial insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Before FinanceFlow</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Overspending on dining</span>
                  <span className="text-red-600 font-semibold">-$180/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Subscription waste</span>
                  <span className="text-red-600 font-semibold">-$67/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Late payment fees</span>
                  <span className="text-red-600 font-semibold">-$45/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Impulse purchases</span>
                  <span className="text-red-600 font-semibold">-$95/mo</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">After FinanceFlow</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Smart budget alerts</span>
                  <span className="text-green-600 font-semibold">+$155/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Subscription management</span>
                  <span className="text-green-600 font-semibold">+$67/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Bill reminders</span>
                  <span className="text-green-600 font-semibold">+$45/mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Spending insights</span>
                  <span className="text-green-600 font-semibold">+$70/mo</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Monthly Savings</span>
                  <span className="text-2xl font-bold text-primary">+$337</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">That's $4,044 saved per year!</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      {/* Dashboard Stats Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Overview</h2>
          <p className="text-gray-600">Real-time insights into your financial health at a glance</p>
        </div>
        <DashboardStats 
          accounts={sampleAccounts}
          transactions={sampleTransactions}
          budgets={sampleBudgets}
          goals={sampleGoals}
        />
      </motion.div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Spending Analytics</h3>
            <p className="text-gray-600">Colorful visualizations of your spending patterns by category</p>
          </div>
          <SpendingChart transactions={sampleTransactions} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Management</h3>
            <p className="text-gray-600">Track your progress with intuitive budget progress bars</p>
          </div>
          <BudgetOverview budgets={sampleBudgets} transactions={sampleTransactions} />
        </motion.div>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-600">Stay on top of all your financial transactions</p>
          </div>
          <RecentTransactions transactions={sampleTransactions} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bill Reminders</h3>
            <p className="text-gray-600">Never miss a payment with smart bill tracking</p>
          </div>
          <UpcomingBills bills={sampleBills} />
        </motion.div>
      </div>

{/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Master Your Money
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to give you complete control over your financial future
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Target" size={32} className="text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Budget Tracking</h4>
            <p className="text-gray-600 mb-4">
              Create intelligent budgets that adapt to your spending patterns and send alerts when you're approaching limits.
            </p>
<Button variant="ghost" size="sm" className="text-green-600" onClick={() => navigate("/transactions")}>
              Learn More →
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Bell" size={32} className="text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Bill Reminders</h4>
            <p className="text-gray-600 mb-4">
              Never miss a payment again with smart reminders and automatic bill tracking that saves you from late fees.
            </p>
            <Button variant="ghost" size="sm" className="text-blue-600">
Learn More →
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="CreditCard" size={32} className="text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Credit Score Monitoring</h4>
            <p className="text-gray-600 mb-4">
              Track your credit score changes and get personalized recommendations to improve your credit health.
            </p>
            <Button variant="ghost" size="sm" className="text-purple-600">
              Learn More →
</Button>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="TrendingUp" size={32} className="text-orange-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Investment Tracking</h4>
            <p className="text-gray-600 mb-4">
              Monitor your investment portfolio performance and get insights on asset allocation and growth trends.
            </p>
<Button variant="ghost" size="sm" className="text-orange-600" onClick={() => navigate("/bills")}>
              Learn More →
            </Button>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Trophy" size={32} className="text-pink-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Financial Goals</h4>
<p className="text-gray-600 mb-4">
              Set and achieve your financial objectives with goal tracking, milestone celebrations, and progress insights.
            </p>
            <Button variant="ghost" size="sm" className="text-pink-600" onClick={() => navigate("/goals")}>
              Learn More →
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Brain" size={32} className="text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Personalized Insights</h4>
            <p className="text-gray-600 mb-4">
              Get AI-powered recommendations and spending insights tailored to your unique financial situation and goals.
</p>
            <Button variant="ghost" size="sm" className="text-indigo-600" onClick={() => navigate("/analytics")}>
              Learn More →
            </Button>
          </Card>
        </div>
      </motion.div>

      {/* Call to Action */}
{/* Final Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="text-center py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <ApperIcon name="Rocket" size={40} className="text-primary" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Finances?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join over 10,000+ users who have saved money and achieved their financial goals. 
            Start your journey to financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Button size="lg" className="flex items-center gap-3 px-10 py-4 text-lg">
              <ApperIcon name="Sparkles" size={24} />
              Sign Up Free - No Credit Card Required
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/testimonials")} className="flex items-center gap-3 px-8 py-4 text-lg">
              <ApperIcon name="Users" size={24} />
              Read Success Stories
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ApperIcon name="Shield" size={16} className="text-green-500" />
              Bank-level security
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" size={16} className="text-blue-500" />
              2-minute setup
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Heart" size={16} className="text-red-500" />
              Free forever
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Showcase;