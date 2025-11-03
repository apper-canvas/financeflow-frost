import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { billService } from "@/services/api/billService";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [view, setView] = useState("list"); // "list" or "calendar"
  
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    dueDate: "",
    recurring: false,
    frequency: "monthly",
    category: "",
    isPaid: false
  });

  const billCategories = [
    "Utilities", "Housing", "Insurance", "Subscriptions", 
    "Credit Card", "Loan", "Phone", "Internet", "Other"
  ];

  const frequencies = [
    "weekly", "bi-weekly", "monthly", "quarterly", "yearly"
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const billsData = await billService.getAll();
      setBills(billsData);
    } catch (err) {
      setError("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.dueDate || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const billData = {
        ...formData,
        amount: parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate).toISOString()
      };

      const newBill = await billService.create(billData);
      setBills([...bills, newBill]);
      setFormData({
        name: "",
        amount: "",
        dueDate: "",
        recurring: false,
        frequency: "monthly",
        category: "",
        isPaid: false
      });
      setShowAddForm(false);
      toast.success("Bill added successfully!");
    } catch (err) {
      toast.error("Failed to add bill");
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      const bill = bills.find(b => b.Id === id);
      const updatedBill = await billService.update(id, { ...bill, isPaid: true });
      setBills(bills.map(b => b.Id === id ? updatedBill : b));
      toast.success("Bill marked as paid!");
    } catch (err) {
      toast.error("Failed to update bill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await billService.delete(id);
      setBills(bills.filter(b => b.Id !== id));
      toast.success("Bill deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete bill");
    }
  };

  const getBillIcon = (category) => {
    const icons = {
      "Utilities": "Zap",
      "Housing": "Home",
      "Insurance": "Shield",
      "Subscriptions": "Repeat",
      "Credit Card": "CreditCard",
      "Loan": "Banknote",
      "Phone": "Phone",
      "Internet": "Wifi",
      "Other": "Calendar"
    };
    return icons[category] || "Calendar";
  };

  const getBillStatus = (bill) => {
    if (bill.isPaid) return { variant: "success", text: "Paid" };
    
    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    const days = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (days < 0) return { variant: "error", text: "Overdue" };
    if (days <= 2) return { variant: "warning", text: `Due in ${days} days` };
    if (days <= 7) return { variant: "info", text: `Due in ${days} days` };
    return { variant: "default", text: `Due ${formatDate(bill.dueDate)}` };
  };

  // Sort bills by due date
  const sortedBills = [...bills].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

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
          <h1 className="text-2xl font-bold text-gray-900">Bill Management</h1>
          <p className="text-gray-600 mt-1">Keep track of your recurring bills and payments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={view === "list" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="flex items-center gap-2"
            >
              <ApperIcon name="List" size={16} />
              List
            </Button>
            <Button
              variant={view === "calendar" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Calendar" size={16} />
              Calendar
            </Button>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <ApperIcon name="Plus" size={16} />
            Add Bill
          </Button>
        </div>
      </div>

      {/* Add Bill Form */}
      {showAddForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Bill</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Bill Name" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Electric Bill"
                  required
                />
              </FormField>

              <FormField label="Amount" required>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </FormField>

              <FormField label="Due Date" required>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  {billCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Frequency">
                <Select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                  {frequencies.map(freq => (
                    <option key={freq} value={freq}>{freq.replace('-', ' ')}</option>
                  ))}
                </Select>
              </FormField>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.recurring}
                  onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="recurring" className="text-sm text-gray-700">
                  Recurring bill
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Bill</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Bills Content */}
      {sortedBills.length === 0 ? (
        <Empty
          title="No bills added yet"
          description="Add your first bill to start tracking payments and due dates"
          actionText="Add Bill"
          onAction={() => setShowAddForm(true)}
          icon="Calendar"
        />
      ) : view === "list" ? (
        /* List View */
        <div className="space-y-4">
          {sortedBills.map((bill, index) => {
            const status = getBillStatus(bill);
            return (
              <motion.div
                key={bill.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ApperIcon name={getBillIcon(bill.category)} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{bill.category}</p>
                          {bill.recurring && (
                            <Badge variant="info" className="text-xs">
                              <ApperIcon name="Repeat" size={12} className="mr-1" />
                              {bill.frequency}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(bill.amount)}</p>
                        <Badge variant={status.variant} className="text-xs">
                          {status.text}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        {!bill.isPaid && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarkPaid(bill.Id)}
                            className="text-success hover:text-success/80"
                          >
                            <ApperIcon name="Check" size={16} />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(bill.Id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Calendar View */
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Bills Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBills.filter(bill => !bill.isPaid).map((bill, index) => {
              const status = getBillStatus(bill);
              return (
                <motion.div
                  key={bill.Id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-4 rounded-lg border-2",
                    status.variant === "error" ? "border-red-200 bg-red-50" :
                    status.variant === "warning" ? "border-yellow-200 bg-yellow-50" :
                    status.variant === "info" ? "border-blue-200 bg-blue-50" :
                    "border-gray-200 bg-gray-50"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <ApperIcon name={getBillIcon(bill.category)} size={16} className="text-primary" />
                    </div>
                    <Badge variant={status.variant} className="text-xs">
                      {status.text}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{bill.name}</h4>
                  <p className="text-lg font-bold text-gray-900 mb-2">{formatCurrency(bill.amount)}</p>
                  <p className="text-sm text-gray-600 mb-3">Due: {formatDate(bill.dueDate)}</p>
                  <Button
                    size="sm"
                    onClick={() => handleMarkPaid(bill.Id)}
                    className="w-full"
                  >
                    Mark as Paid
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default Bills;