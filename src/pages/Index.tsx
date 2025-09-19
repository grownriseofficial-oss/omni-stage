import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { crmStore } from "@/services/crmStore";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(crmStore.getCurrentUser());
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(crmStore.getCurrentUser());
    };
    
    // Check for auth changes periodically
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentCompany = crmStore.getCurrentCompany();

  if (!currentUser || !currentCompany) {
    return (
      <div className="min-h-screen bg-gradient-elegant">
        <LoginForm onLogin={() => setCurrentUser(crmStore.getCurrentUser())} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar 
          user={currentUser}
          company={currentCompany}
          currentPage={activeView}
          onPageChange={setActiveView}
          onLogout={() => {
            crmStore.logout();
            setCurrentUser(null);
          }}
        />
        <main className="flex-1 ml-64">
          <Dashboard activeView={activeView} />
        </main>
      </div>
    </div>
  );
};

export default Index;
