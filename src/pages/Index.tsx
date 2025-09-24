import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LeadsManager } from "@/components/crm/LeadsManager";
import { DealsKanban } from "@/components/crm/DealsKanban";
import { ContactsManager } from "@/components/crm/ContactsManager";
import { TaskManager } from "@/components/crm/TaskManager";
import { WorkflowEngine } from "@/components/workflows/WorkflowEngine";
import { AdvancedAnalytics } from "@/components/analytics/AdvancedAnalytics";
import { EmailAutomation } from "@/components/email/EmailAutomation";
import { FileManager } from "@/components/files/FileManager";
import { UserManagement } from "@/components/users/UserManagement";
import { crmStore } from "@/services/crmStore";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(crmStore.getCurrentUser());
  const location = useLocation();
  
  // Map routes to active views
  const getActiveView = () => {
    const path = location.pathname;
    if (path === '/leads') return 'leads';
    if (path === '/deals') return 'deals';
    if (path === '/contacts') return 'contacts';
    if (path === '/activities') return 'activities';
    if (path === '/workflows') return 'workflows';
    if (path === '/reports') return 'reports';
    if (path === '/settings') return 'settings';
    if (path === '/team') return 'team';
    if (path === '/email') return 'email';
    if (path === '/files') return 'files';
    return 'dashboard';
  };

  const [activeView, setActiveView] = useState(getActiveView());

  useEffect(() => {
    setActiveView(getActiveView());
  }, [location.pathname]);

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

  const renderActiveView = () => {
    switch (activeView) {
      case 'leads':
        return <LeadsManager />;
      case 'deals':
        return <DealsKanban />;
      case 'contacts':
        return <ContactsManager />;
      case 'activities':
        return <TaskManager />;
      case 'workflows':
        return <WorkflowEngine />;
      case 'reports':
        return <AdvancedAnalytics />;
      case 'email':
        return <EmailAutomation />;
      case 'files':
        return <FileManager />;
      case 'team':
        return <UserManagement />;
      default:
        return <Dashboard activeView={activeView} />;
    }
  };

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
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default Index;
