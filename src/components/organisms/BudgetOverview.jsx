import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/molecules/ProgressBar";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatters";

const BudgetOverview = ({ budgets = [], transactions = [] }) => {
  const navigate = useNavigate();
  
  // Calculate spending for each budget category
  const budgetsWithSpending = budgets.map(budget => {
    const category = budget.category_c || budget.category;
    const allocated = budget.allocated_c || budget.allocated;
    
    const categorySpending = transactions
      .filter(t => (t.category_c || t.category) === category && (t.type_c || t.type) === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount_c || t.amount), 0);
    
    return {
      ...budget,
      category: category,
      allocated: allocated,
      spent: categorySpending,
      remaining: Math.max(0, allocated - categorySpending),
      percentage: allocated > 0 ? (categorySpending / allocated) * 100 : 0
    };
  }).slice(0, 4); // Show top 4 budgets

  const getCategoryIcon = (category) => {
    const icons = {
      "Housing": "Home",
      "Food": "UtensilsCrossed",
      "Transportation": "Car",
      "Entertainment": "Film",
      "Healthcare": "Heart",
      "Shopping": "ShoppingBag",
      "Utilities": "Zap",
      "Other": "MoreHorizontal"
    };
    return icons[category] || "MoreHorizontal";
  };

  if (budgetsWithSpending.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/budgets")}>
            View All
          </Button>
        </div>
        <div className="text-center py-8">
          <ApperIcon name="Target" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No budgets created yet</p>
          <Button size="sm">Create Budget</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate("/budgets")}>
          View All
        </Button>
      </div>
      
      <div className="space-y-6">
        {budgetsWithSpending.map((budget, index) => (
          <motion.div
            key={budget.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name={getCategoryIcon(budget.category)} size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{budget.category}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {budget.percentage.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(budget.remaining)} left
                </p>
              </div>
            </div>
            <ProgressBar
              value={budget.spent}
              max={budget.allocated}
              color="primary"
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button variant="ghost" size="sm" onClick={() => navigate("/budgets")} className="w-full">
          Manage All Budgets
          <ApperIcon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default BudgetOverview;