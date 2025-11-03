import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;