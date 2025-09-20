import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, TrendingUp, Target, Plus, ArrowUpRight, Calendar, Clock, Bell } from 'lucide-react';
import { crmStore } from '@/services/crmStore';
import { format } from 'date-fns';

export const Dashboard = () => {
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
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Welcome back! Here's what's happening with your sales.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button className="bg-gradient-primary shadow-elegant">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUpRight className="w-4 h-4 mr-1 text-success" />
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Leads</CardTitle>
                <CardDescription>Latest prospects in your pipeline</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={lead.id} className="flex items-center space-x-4 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ${(lead.value || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Active Deals</CardTitle>
                <CardDescription>Opportunities in progress</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View Pipeline</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div key={deal.id} className="flex items-center justify-between animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{deal.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>${deal.value.toLocaleString()}</span>
                      <span>•</span>
                      <span>{deal.probability}% probability</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    In Progress
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Notifications */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Follow up with John Doe</p>
                  <p className="text-xs text-muted-foreground">Due 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Prepare proposal for Acme Corp</p>
                  <p className="text-xs text-muted-foreground">Due 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Weekly team meeting</p>
                  <p className="text-xs text-muted-foreground">Due 5:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-primary bg-primary/5">
                <p className="text-sm font-medium">New lead assigned</p>
                <p className="text-xs text-muted-foreground">Jane Smith from TechCorp</p>
              </div>
              <div className="p-3 border-l-4 border-success bg-success/5">
                <p className="text-sm font-medium">Deal won!</p>
                <p className="text-xs text-muted-foreground">$50,000 deal closed</p>
              </div>
              <div className="p-3 border-l-4 border-warning bg-warning/5">
                <p className="text-sm font-medium">Meeting reminder</p>
                <p className="text-xs text-muted-foreground">Client call in 30 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button className="w-full justify-start bg-gradient-primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Lead
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Deal
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;