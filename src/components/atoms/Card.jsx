import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, children, hover = true, ...props }, ref) => {
  const Component = hover ? motion.div : "div";
  const motionProps = hover ? {
    whileHover: { y: -2, shadow: "0 8px 30px rgba(0,0,0,0.12)" },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 p-6",
        "transition-shadow duration-200",
        hover && "hover:shadow-md",
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";

export default Card;