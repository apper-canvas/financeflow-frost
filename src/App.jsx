import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Dashboard from "@/components/pages/Dashboard";
import Budgets from "@/components/pages/Budgets";
import Transactions from "@/components/pages/Transactions";
import Goals from "@/components/pages/Goals";
import Bills from "@/components/pages/Bills";
import Analytics from "@/components/pages/Analytics";
import Testimonials from "@/components/pages/Testimonials";
import Showcase from "@/components/pages/Showcase";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<Routes>
<Route path="/" element={<Showcase />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/showcase" element={<Showcase />} />
          </Routes>
        </main>

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
      </div>
    </BrowserRouter>
  );
}

export default App;