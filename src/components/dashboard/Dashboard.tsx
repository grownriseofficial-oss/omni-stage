import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, TrendingUp, Target, Plus, ArrowUpRight } from 'lucide-react';
import { crmStore } from '@/services/crmStore';
import { LeadsManager } from "@/components/crm/LeadsManager";
import { DealsKanban } from "@/components/crm/DealsKanban";
import { ContactsManager } from "@/components/crm/ContactsManager";
import { WorkflowEngine } from "@/components/workflows/WorkflowEngine";
import { TaskManager } from "@/components/crm/TaskManager";
import { NotesManager } from "@/components/crm/NotesManager";
import { CommunicationHistory } from "@/components/crm/CommunicationHistory";

interface DashboardProps {
  activeView?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ activeView = "dashboard" }) => {
  if (activeView === "leads") return <LeadsManager />;
  if (activeView === "deals") return <DealsKanban />;
  if (activeView === "contacts") return <ContactsManager />;
  if (activeView === "workflows") return <WorkflowEngine />;
  if (activeView === "tasks") return <TaskManager />;
  if (activeView === "notes") return <NotesManager />;
  if (activeView === "communications") return <CommunicationHistory />;
  const metrics = crmStore.getDashboardMetrics();
  const leads = crmStore.getLeads().slice(0, 5);
  const deals = crmStore.getDeals().slice(0, 5);

  const kpiCards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads,
      change: '+12%',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pipeline Value',
      value: `$${(metrics.totalDealValue / 1000).toFixed(0)}K`,
      change: '+8%',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-warning',
    },
    {
      title: 'Active Deals',
      value: metrics.totalDeals,
      change: '+5',
      icon: Target,
      color: 'text-primary',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your sales.
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Quick Add
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-success" />
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest prospects in your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">
                      {lead.first_name[0]}{lead.last_name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {lead.first_name} {lead.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.company} • {lead.email}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Active Deals</CardTitle>
            <CardDescription>Opportunities in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{deal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${deal.value.toLocaleString()} • {deal.probability}% probability
                    </p>
                  </div>
                  <Badge variant="secondary">
                    In Progress
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};