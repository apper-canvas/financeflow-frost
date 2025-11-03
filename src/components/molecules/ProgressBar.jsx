import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showLabel = false,
  label,
  color = "primary"
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error"
  };

  const getColor = () => {
    if (color !== "primary") return colors[color];
    if (percentage >= 100) return colors.error;
    if (percentage >= 80) return colors.warning;
    return colors.success;
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-2 rounded-full transition-colors duration-200", getColor())}
        />
      </div>
    </div>
  );
};

export default ProgressBar;