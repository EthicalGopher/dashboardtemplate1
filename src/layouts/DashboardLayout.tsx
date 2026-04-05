import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AIFloatingChat from "../components/AIFloatingChat";
import { isAuthenticated } from "../utils/auth";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Map route path to header title
  const getTitle = (path: string) => {
    switch (path) {
      case "/home": return "Home";
      case "/workspace": return "Workspace";
      case "/applications": return "Applications";
      case "/risk-management": return "Risk Management";
      case "/compliance": return "Compliance";
      case "/settings": return "Settings";
      default: return "Platform";
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  const pageTitle = getTitle(location.pathname);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-on-surface">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activePath={location.pathname}
      />

      <main className="flex-1 h-screen overflow-y-auto relative w-full flex flex-col">
        {/* Background Blobs */}
        <div className="fixed top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"></div>
        <div className="fixed top-[20%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-yellow-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-[-10%] right-[10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"></div>
        <div className="fixed top-[50%] left-[30%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-green-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"></div>

        <Header title={pageTitle} onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="px-3 sm:px-6 md:px-8 lg:px-12 py-4 md:py-8 flex-1">
          <Outlet />
        </div>

        <AIFloatingChat />
      </main>
    </div>
  );
};

export default DashboardLayout;
