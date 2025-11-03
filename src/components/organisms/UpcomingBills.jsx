import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const UpcomingBills = ({ bills = [] }) => {
  const navigate = useNavigate();
  
  // Filter upcoming bills (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const upcomingBills = bills
    .filter(bill => {
      const dueDate = new Date(bill.dueDate);
      return !bill.isPaid && dueDate >= today && dueDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const getDaysUntilDue = (dueDate) => {
    const days = Math.ceil((new Date(dueDate) - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getBillStatus = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    if (days <= 0) return { variant: "error", text: "Overdue" };
    if (days <= 2) return { variant: "warning", text: `${days} days` };
    return { variant: "info", text: `${days} days` };
  };

  const getBillIcon = (category) => {
    const icons = {
      "Utilities": "Zap",
      "Housing": "Home",
      "Insurance": "Shield",
      "Subscriptions": "Repeat",
      "Credit Card": "CreditCard",
      "Loan": "Banknote",
      "Other": "Calendar"
    };
    return icons[category] || "Calendar";
  };

  if (upcomingBills.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Bills</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/bills")}>
            View All
          </Button>
        </div>
        <div className="text-center py-8">
          <ApperIcon name="Calendar" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No upcoming bills</p>
          <Button size="sm">Add Bill</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Bills</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate("/bills")}>
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {upcomingBills.map((bill, index) => {
          const status = getBillStatus(bill.dueDate);
          return (
            <motion.div
              key={bill.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name={getBillIcon(bill.category)} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{bill.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">Due {formatDate(bill.dueDate)}</p>
                    <Badge variant={status.variant}>{status.text}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(bill.amount)}</p>
                <Button size="sm" variant="ghost" className="text-xs">
                  Mark Paid
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button variant="ghost" size="sm" onClick={() => navigate("/bills")} className="w-full">
          View All Bills
          <ApperIcon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default UpcomingBills;