import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ToastContainer } from "react-toastify";
import React from "react";
import Dashboard from "@/components/pages/Dashboard";
import Testimonials from "@/components/pages/Testimonials";
import Transactions from "@/components/pages/Transactions";
import Analytics from "@/components/pages/Analytics";
import Goals from "@/components/pages/Goals";
import Budgets from "@/components/pages/Budgets";
import Bills from "@/components/pages/Bills";
import Showcase from "@/components/pages/Showcase";
import Header from "@/components/organisms/Header";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;