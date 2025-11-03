import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const RecentTransactions = ({ transactions = [] }) => {
  const navigate = useNavigate();
  const recentTransactions = transactions.slice(0, 5);

  const getCategoryIcon = (category) => {
    const icons = {
      "Housing": "Home",
      "Food": "UtensilsCrossed",
      "Transportation": "Car",
      "Entertainment": "Film",
      "Healthcare": "Heart",
      "Shopping": "ShoppingBag",
      "Utilities": "Zap",
      "Income": "TrendingUp",
      "Other": "MoreHorizontal"
    };
    return icons[category] || "MoreHorizontal";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Housing": "bg-blue-100 text-blue-600",
      "Food": "bg-orange-100 text-orange-600",
      "Transportation": "bg-purple-100 text-purple-600",
      "Entertainment": "bg-pink-100 text-pink-600",
      "Healthcare": "bg-red-100 text-red-600",
      "Shopping": "bg-yellow-100 text-yellow-600",
      "Utilities": "bg-green-100 text-green-600",
      "Income": "bg-emerald-100 text-emerald-600",
      "Other": "bg-gray-100 text-gray-600"
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  if (recentTransactions.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
            View All
          </Button>
        </div>
        <div className="text-center py-8">
          <ApperIcon name="Receipt" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No transactions yet</p>
          <Button size="sm">Add Transaction</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {recentTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", getCategoryColor(transaction.category))}>
                <ApperIcon name={getCategoryIcon(transaction.category)} size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  <Badge variant="default">{transaction.category}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "font-semibold",
                transaction.type === "income" ? "text-success" : "text-error"
              )}>
                {transaction.type === "income" ? "+" : "-"}{formatCurrency(Math.abs(transaction.amount))}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")} className="w-full">
          View All Transactions
          <ApperIcon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default RecentTransactions;