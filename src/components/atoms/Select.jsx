import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "appearance-none pr-8",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;