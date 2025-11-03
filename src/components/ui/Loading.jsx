import { motion } from "framer-motion";

const Loading = ({ type = "dashboard" }) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const SkeletonTable = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "dashboard") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonTable />
        </div>
      </motion.div>
    );
  }

  if (type === "chart") {
    return <SkeletonChart />;
  }

  if (type === "table") {
    return <SkeletonTable />;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;