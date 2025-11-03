import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = ({ onMobileMenuToggle }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage or your auth system
    const authToken = localStorage.getItem('authToken');
    const userSession = localStorage.getItem('userSession');
    setIsAuthenticated(!!authToken || !!userSession);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "Budgets", path: "/budgets", icon: "Target" },
    { name: "Transactions", path: "/transactions", icon: "Receipt" },
    { name: "Goals", path: "/goals", icon: "Trophy" },
    { name: "Bills", path: "/bills", icon: "Calendar" },
    { name: "Analytics", path: "/analytics", icon: "BarChart3" },
    { name: "Testimonials", path: "/testimonials", icon: "Users" }
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(!mobileMenuOpen);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FinanceFlow
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
{isAuthenticated && (
              <nav className="hidden lg:flex space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      location.pathname === item.path
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <ApperIcon name={item.icon} size={16} />
                    {item.name}
                  </button>
                ))}
              </nav>
            )}

{/* Desktop Actions */}
<div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
                  <ApperIcon name="LayoutDashboard" size={16} />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <ApperIcon name="LogIn" size={16} />
                    Log In
                  </Button>
                  <Button size="sm" className="flex items-center gap-2">
                    <ApperIcon name="UserPlus" size={16} />
                    Sign Up Free
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
                className="p-2"
              >
                <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleMobileMenuToggle} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FinanceFlow
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleMobileMenuToggle} className="p-2">
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
{isAuthenticated && navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    handleMobileMenuToggle();
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200",
                    location.pathname === item.path
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <ApperIcon name={item.icon} size={20} />
                  {item.name}
                </button>
              ))}
            </nav>
<div className="p-4 border-t border-gray-200">
              {isAuthenticated ? (
                <Button variant="ghost" onClick={() => navigate("/dashboard")} className="w-full flex items-center justify-center gap-2">
                  <ApperIcon name="LayoutDashboard" size={16} />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full flex items-center justify-center gap-2 mb-2">
                    <ApperIcon name="LogIn" size={16} />
                    Log In
                  </Button>
                  <Button className="w-full flex items-center justify-center gap-2">
                    <ApperIcon name="UserPlus" size={16} />
                    Sign Up Free
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;