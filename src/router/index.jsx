import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/organisms/Layout";

// Lazy load all page components
const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const Budgets = lazy(() => import("@/components/pages/Budgets"));
const Transactions = lazy(() => import("@/components/pages/Transactions"));
const Goals = lazy(() => import("@/components/pages/Goals"));
const Bills = lazy(() => import("@/components/pages/Bills"));
const Analytics = lazy(() => import("@/components/pages/Analytics"));
const Testimonials = lazy(() => import("@/components/pages/Testimonials"));
const Showcase = lazy(() => import("@/components/pages/Showcase"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Wrap each lazy component in Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

// Define main routes
const mainRoutes = [
  {
    path: "",
    index: true,
    element: withSuspense(Showcase)
  },
  {
    path: "dashboard",
    element: withSuspense(Dashboard)
  },
  {
    path: "budgets", 
    element: withSuspense(Budgets)
  },
  {
    path: "transactions",
    element: withSuspense(Transactions)
  },
  {
    path: "goals",
    element: withSuspense(Goals)
  },
  {
    path: "bills",
    element: withSuspense(Bills)
  },
  {
    path: "analytics",
    element: withSuspense(Analytics)
  },
  {
    path: "testimonials",
    element: withSuspense(Testimonials)
  },
  {
    path: "showcase",
    element: withSuspense(Showcase)
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

// Create routes array with Layout as parent
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);