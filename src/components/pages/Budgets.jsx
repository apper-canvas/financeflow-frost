import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ProgressBar from "@/components/molecules/ProgressBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { budgetService } from "@/services/api/budgetService";
import { transactionService } from "@/services/api/transactionService";
import { formatCurrency } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    allocated: "",
    period: "monthly",
    alerts: true
  });

  const categories = [
    "Housing", "Food", "Transportation", "Entertainment", 
    "Healthcare", "Shopping", "Utilities", "Other"
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [budgetsData, transactionsData] = await Promise.all([
        budgetService.getAll(),
        transactionService.getAll()
      ]);

      setBudgets(budgetsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.allocated) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const budgetData = {
        ...formData,
        allocated: parseFloat(formData.allocated),
        startDate: new Date().toISOString()
      };

      const newBudget = await budgetService.create(budgetData);
      setBudgets([...budgets, newBudget]);
      setFormData({ category: "", allocated: "", period: "monthly", alerts: true });
      setShowAddForm(false);
      toast.success("Budget created successfully!");
    } catch (err) {
      toast.error("Failed to create budget");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;

    try {
      await budgetService.delete(id);
      setBudgets(budgets.filter(b => b.Id !== id));
      toast.success("Budget deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete budget");
    }
  };

  const getBudgetWithSpending = (budget) => {
    const categorySpending = transactions
      .filter(t => t.category === budget.category && t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    return {
      ...budget,
      spent: categorySpending,
      remaining: Math.max(0, budget.allocated - categorySpending),
      percentage: budget.allocated > 0 ? (categorySpending / budget.allocated) * 100 : 0
    };
  };

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

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const budgetsWithSpending = budgets.map(getBudgetWithSpending);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-gray-600 mt-1">Track your spending against your budgets</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add Budget
        </Button>
      </div>

      {/* Add Budget Form */}
      {showAddForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Budget</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Category" required>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </FormField>
              
              <FormField label="Budget Amount" required>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.allocated}
                  onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </FormField>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Budget</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Budgets List */}
      {budgetsWithSpending.length === 0 ? (
        <Empty
          title="No budgets created yet"
          description="Create your first budget to start tracking your spending"
          actionText="Create Budget"
          onAction={() => setShowAddForm(true)}
          icon="Target"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetsWithSpending.map((budget, index) => (
            <motion.div
              key={budget.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={getCategoryIcon(budget.category)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{budget.category}</h3>
                      <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(budget.Id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Spent</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(budget.spent)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Budget</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(budget.allocated)}</span>
                  </div>

                  <ProgressBar
                    value={budget.spent}
                    max={budget.allocated}
                    showLabel={true}
                    label="Progress"
                  />

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className={cn(
                      "font-semibold",
                      budget.remaining > 0 ? "text-success" : "text-error"
                    )}>
                      {formatCurrency(budget.remaining)}
                    </span>
                  </div>

                  {budget.percentage > 100 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <ApperIcon name="AlertTriangle" size={16} className="text-red-500" />
                        <span className="text-sm text-red-700 font-medium">Over budget!</span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">
                        You've exceeded your budget by {formatCurrency(budget.spent - budget.allocated)}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Budgets;