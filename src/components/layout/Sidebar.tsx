import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, Users, Building2, DollarSign, UserPlus, 
  BarChart3, Settings, LogOut, Bell, Search, ChevronDown,
  Target, Calendar, Mail, FileText, Workflow, Zap, CheckSquare,
  MessageCircle, StickyNote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { User, Company } from '@/types/crm';

interface SidebarProps {
  user: User;
  company: Company;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const navigationItems = [
  {
    group: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    ]
  },
  {
    group: 'Sales',
    items: [
      { id: 'leads', label: 'Leads', icon: UserPlus, badge: 'new' },
      { id: 'deals', label: 'Pipeline', icon: Target, badge: null },
      { id: 'contacts', label: 'Contacts', icon: Users, badge: null },
      { id: 'accounts', label: 'Accounts', icon: Building2, badge: null },
    ]
  },
  {
    group: 'Activities',
    items: [
      { id: 'activities', label: 'Activities', icon: Calendar, badge: '3' },
      { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: '5' },
      { id: 'notes', label: 'Notes', icon: StickyNote, badge: null },
      { id: 'communications', label: 'Communications', icon: MessageCircle, badge: null },
      { id: 'emails', label: 'Email Center', icon: Mail, badge: null },
      { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    ]
  },
  {
    group: 'Automation',
    items: [
      { id: 'workflows', label: 'Workflows', icon: Workflow, badge: null },
      { id: 'integrations', label: 'Integrations', icon: Zap, badge: null },
    ]
  },
  {
    group: 'Administration',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  company, 
  currentPage, 
  onPageChange, 
  onLogout 
}) => {
  const getUserInitials = (user: User) => {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive text-destructive-foreground';
      case 'company_admin': return 'bg-primary text-primary-foreground';
      case 'manager': return 'bg-warning text-warning-foreground';
      case 'sales_rep': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatRole = (role: string) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col shadow-card">
      {/* Company Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-6 h-6 rounded" />
            ) : (
              <Building2 className="w-6 h-6 text-primary-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">{company.name}</h2>
            <p className="text-xs text-muted-foreground">{company.domain}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          {navigationItems.map((group) => (
            <div key={group.group}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10 px-3 font-medium",
                        isActive && "bg-primary/10 text-primary border-primary/20"
                      )}
                      onClick={() => onPageChange(item.id)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto h-5 text-xs px-2"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
              {getUserInitials(user)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium truncate">
                {user.first_name} {user.last_name}
              </p>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={cn("text-xs px-2 py-0", getRoleBadgeColor(user.role))}
              >
                {formatRole(user.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-8"
            onClick={() => onPageChange('notifications')}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            <Badge variant="destructive" className="ml-auto h-4 text-xs px-1">
              2
            </Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};