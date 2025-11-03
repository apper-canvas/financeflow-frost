import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import ProgressBar from "@/components/molecules/ProgressBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { goalService } from "@/services/api/goalService";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: "",
    status: "active"
  });

  const goalCategories = [
    "Emergency Fund", "Vacation", "Home", "Car", "Education", 
    "Investment", "Debt Payoff", "Retirement", "Other"
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const goalsData = await goalService.getAll();
      setGoals(goalsData);
    } catch (err) {
      setError("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.deadline || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const goalData = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        deadline: new Date(formData.deadline).toISOString()
      };

      const newGoal = await goalService.create(goalData);
      setGoals([...goals, newGoal]);
      setFormData({
        name: "",
        targetAmount: "",
        currentAmount: "0",
        deadline: "",
        category: "",
        status: "active"
      });
      setShowAddForm(false);
      toast.success("Goal created successfully!");
    } catch (err) {
      toast.error("Failed to create goal");
    }
  };

  const handleUpdateProgress = async (id, currentAmount) => {
    try {
      const goal = goals.find(g => g.Id === id);
      const updatedGoal = await goalService.update(id, { 
        ...goal, 
        currentAmount,
        status: currentAmount >= goal.targetAmount ? "completed" : "active"
      });
      
      setGoals(goals.map(g => g.Id === id ? updatedGoal : g));
      toast.success("Goal progress updated!");
    } catch (err) {
      toast.error("Failed to update goal");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    try {
      await goalService.delete(id);
      setGoals(goals.filter(g => g.Id !== id));
      toast.success("Goal deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete goal");
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Emergency Fund": "Shield",
      "Vacation": "Plane",
      "Home": "Home",
      "Car": "Car",
      "Education": "GraduationCap",
      "Investment": "TrendingUp",
      "Debt Payoff": "CreditCard",
      "Retirement": "Clock",
      "Other": "Target"
    };
    return icons[category] || "Target";
  };

  const getStatusBadge = (status, currentAmount, targetAmount) => {
    if (status === "completed" || currentAmount >= targetAmount) {
      return <Badge variant="success">Completed</Badge>;
    }
    
    const progress = (currentAmount / targetAmount) * 100;
    if (progress >= 75) return <Badge variant="warning">Almost There</Badge>;
    if (progress >= 25) return <Badge variant="info">In Progress</Badge>;
    return <Badge variant="default">Just Started</Badge>;
  };

  const getDaysRemaining = (deadline) => {
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) return <Loading />;
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
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600 mt-1">Track your progress towards your financial objectives</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Goal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Goal Name" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Emergency Fund"
                  required
                />
              </FormField>

              <FormField label="Category" required>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {goalCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Target Amount" required>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </FormField>

              <FormField label="Current Amount">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                  placeholder="0.00"
                />
              </FormField>

              <FormField label="Target Date" required>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </FormField>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Goal</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <Empty
          title="No goals created yet"
          description="Set your first financial goal to start tracking your progress"
          actionText="Create Goal"
          onAction={() => setShowAddForm(true)}
          icon="Trophy"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <motion.div
                key={goal.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ApperIcon name={getCategoryIcon(goal.category)} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                        <p className="text-sm text-gray-500">{goal.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(goal.status, goal.currentAmount, goal.targetAmount)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.Id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {formatCurrency(goal.currentAmount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        of {formatCurrency(goal.targetAmount)} goal
                      </div>
                    </div>

                    <ProgressBar
                      value={goal.currentAmount}
                      max={goal.targetAmount}
                      showLabel={true}
                      label="Progress"
                    />

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                      </span>
                      <span className="text-gray-600">
                        Target: {formatDate(goal.deadline)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Add amount"
                          className="flex-1 text-sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const newAmount = goal.currentAmount + parseFloat(e.target.value || 0);
                              handleUpdateProgress(goal.Id, newAmount);
                              e.target.value = '';
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs px-2"
                          onClick={(e) => {
                            const input = e.target.parentElement.querySelector('input');
                            const newAmount = goal.currentAmount + parseFloat(input.value || 0);
                            handleUpdateProgress(goal.Id, newAmount);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {progress >= 100 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <ApperIcon name="Trophy" size={20} className="text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-800">Goal Completed! 🎉</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Goals;