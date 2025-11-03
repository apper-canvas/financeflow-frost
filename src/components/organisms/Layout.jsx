import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";

function Layout() {
  // App-level state and methods can be defined here
  // and passed to child routes via outletContext
  const contextValue = {
    // Add any app-level state or methods here that need to be shared
    // Example: user, setUser, theme, setTheme, etc.
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={contextValue} />
      </main>
    </div>
  );
}

export default Layout;