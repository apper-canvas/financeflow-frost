import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection, 
  className,
  valueColor = "text-gray-900"
}) => {
  const trendColor = trendDirection === "up" ? "text-success" : "text-error";
  const trendIcon = trendDirection === "up" ? "TrendingUp" : "TrendingDown";

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={cn("text-2xl font-bold mt-2", valueColor)}>{value}</p>
          {trend && (
            <div className={cn("flex items-center gap-1 mt-2", trendColor)}>
              <ApperIcon name={trendIcon} size={16} />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-xl"></div>
    </Card>
  );
};

export default StatCard;