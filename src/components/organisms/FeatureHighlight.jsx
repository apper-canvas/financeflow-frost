import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FeatureHighlight = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Budget Tracking",
      description: "Monitor your spending across different categories and stay within budget limits",
      icon: "Target",
      gradient: "from-blue-500/10 to-blue-600/20",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/budgets"
    },
    {
      id: 2,
      title: "Bill Reminders",
      description: "Never miss a payment with smart notifications and due date tracking",
      icon: "Calendar",
      gradient: "from-orange-500/10 to-orange-600/20",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      path: "/bills"
    },
    {
      id: 3,
      title: "Transaction Management",
      description: "Record, categorize, and analyze all your income and expenses effortlessly",
      icon: "Receipt",
      gradient: "from-green-500/10 to-green-600/20",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      path: "/transactions"
    },
    {
      id: 4,
      title: "Financial Goals",
      description: "Set savings targets and track your progress toward achieving them",
      icon: "TrendingUp",
      gradient: "from-purple-500/10 to-purple-600/20",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/goals"
    },
    {
      id: 5,
      title: "Analytics & Insights",
      description: "Get detailed reports and visualizations of your financial patterns",
      icon: "BarChart3",
      gradient: "from-pink-500/10 to-pink-600/20",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      path: "/analytics"
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Powerful Financial Tools
        </h2>
        <p className="text-gray-600">
          Everything you need to take control of your finances in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="relative h-full cursor-pointer group transition-all duration-300 hover:shadow-lg"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <ApperIcon name={feature.icon} size={24} className={feature.iconColor} />
                  </div>
                  <ApperIcon 
                    name="ArrowUpRight" 
                    size={20} 
                    className="text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-200" 
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-center group-hover:bg-white/80 group-hover:shadow-sm transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(feature.path);
                  }}
                >
                  Get Started
                  <ApperIcon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlight;