import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { transactionService } from "@/services/api/transactionService";
import { accountService } from "@/services/api/accountService";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
const [formData, setFormData] = useState({
    account_id_c: "",
    date_c: new Date().toISOString().split('T')[0],
    description_c: "",
    amount_c: "",
    category_c: "",
    type_c: "expense",
    notes_c: ""
  });

  const categories = [
    "Housing", "Food", "Transportation", "Entertainment", 
    "Healthcare", "Shopping", "Utilities", "Income", "Other"
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [transactionsData, accountsData] = await Promise.all([
        transactionService.getAll(),
        accountService.getAll()
      ]);

      setTransactions(transactionsData);
      setAccounts(accountsData);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.accountId || !formData.description || !formData.amount || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
const transactionData = {
        ...formData,
        amount_c: parseFloat(formData.amount_c),
        date_c: new Date(formData.date_c).toISOString()
      };

      const newTransaction = await transactionService.create(transactionData);
      setTransactions([newTransaction, ...transactions]);
setFormData({
        account_id_c: "",
        date_c: new Date().toISOString().split('T')[0],
        description_c: "",
        amount_c: "",
        category_c: "",
        type_c: "expense",
        notes_c: ""
      });
      setShowAddForm(false);
      toast.success("Transaction added successfully!");
    } catch (err) {
      toast.error("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await transactionService.delete(id);
      setTransactions(transactions.filter(t => t.Id !== id));
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete transaction");
    }
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

  // Filter transactions
const filteredTransactions = transactions.filter(transaction => {
    const description = transaction.description_c || transaction.description || "";
    const notes = transaction.notes_c || transaction.notes || "";
    const category = transaction.category_c || transaction.category || "";
    
    const matchesSearch = description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || category === selectedCategory;
    const matchesType = !selectedType || transaction.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Manage your income and expenses</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add Transaction
        </Button>
      </div>

      {/* Add Transaction Form */}
      {showAddForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Transaction</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Account" required>
                <Select
                  value={formData.accountId}
                  onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map(account => (
<option key={account.Id} value={account.Id}>
                      {account.name_c || account.name} ({account.type_c || account.type})
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Date" required>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </FormField>

              <FormField label="Description" required>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Transaction description"
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

              <FormField label="Type" required>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Notes">
              <Input
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Optional notes"
              />
            </FormField>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <SearchBar
              placeholder="Search transactions..."
              onSearch={setSearchQuery}
            />
          </div>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="min-w-40"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="min-w-32"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </div>
      </Card>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <Empty
          title="No transactions found"
          description="Add your first transaction to start tracking your finances"
          actionText="Add Transaction"
          onAction={() => setShowAddForm(true)}
          icon="Receipt"
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Transaction</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Date</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Amount</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
<div className={cn("w-10 h-10 rounded-full flex items-center justify-center", getCategoryColor(transaction.category_c || transaction.category))}>
                          <ApperIcon name={getCategoryIcon(transaction.category_c || transaction.category)} size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description_c || transaction.description}</p>
                          {(transaction.notes_c || transaction.notes) && (
                            <p className="text-sm text-gray-500">{transaction.notes_c || transaction.notes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
<Badge variant="default">{transaction.category_c || transaction.category}</Badge>
                    </td>
                    <td className="py-4 px-2 text-gray-600">
{formatDate(transaction.date_c || transaction.date)}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={cn(
"font-semibold",
                        (transaction.type_c || transaction.type) === "income" ? "text-success" : "text-error"
                      )}>
                        {(transaction.type_c || transaction.type) === "income" ? "+" : "-"}{formatCurrency(Math.abs(transaction.amount_c || transaction.amount))}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction.Id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default Transactions;