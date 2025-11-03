import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <ApperIcon 
            name="AlertCircle" 
            size={64} 
            className="text-gray-400 mx-auto"
          />
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <ApperIcon name="Home" size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link to="/dashboard" className="text-primary hover:underline">
              Go to Dashboard
            </Link>
            {" · "}
            <Link to="/showcase" className="text-primary hover:underline">
              View Showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;