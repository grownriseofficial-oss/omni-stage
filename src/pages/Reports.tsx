import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, Filter, TrendingUp, DollarSign, Users, Target, BarChart3, PieChart, LineChart } from 'lucide-react';
import { crmStore } from '@/services/crmStore';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('sales');
  
  const metrics = crmStore.getDashboardMetrics();
  const leads = crmStore.getLeads();
  const deals = crmStore.getDeals();

  // Mock data for charts
  const salesData = [
    { month: 'Jan', revenue: 45000, deals: 12 },
    { month: 'Feb', revenue: 52000, deals: 15 },
    { month: 'Mar', revenue: 48000, deals: 11 },
    { month: 'Apr', revenue: 61000, deals: 18 },
    { month: 'May', revenue: 55000, deals: 16 },
    { month: 'Jun', revenue: 67000, deals: 21 },
  ];

  const leadSourceData = [
    { source: 'Website', count: 45, percentage: 35 },
    { source: 'Referral', count: 32, percentage: 25 },
    { source: 'Social Media', count: 28, percentage: 22 },
    { source: 'Advertising', count: 23, percentage: 18 },
  ];

  const conversionData = [
    { stage: 'Lead', count: 128, percentage: 100 },
    { stage: 'Qualified', count: 64, percentage: 50 },
    { stage: 'Proposal', count: 32, percentage: 25 },
    { stage: 'Negotiation', count: 16, percentage: 12.5 },
    { stage: 'Closed Won', count: 8, percentage: 6.25 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Analyze your sales performance and track key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +8.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.25%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +1.3% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,685</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              +5.7% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Analysis</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((item, index) => (
                    <div key={item.month} className="flex items-center justify-between animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">{item.month}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${item.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{item.deals} deals</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Sales by Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span>Closed Won</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">35%</Badge>
                      <div className="text-sm text-muted-foreground">$115k</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span>Negotiation</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">28%</Badge>
                      <div className="text-sm text-muted-foreground">$92k</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>Proposal</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">22%</Badge>
                      <div className="text-sm text-muted-foreground">$72k</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted rounded-full"></div>
                      <span>Qualification</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">15%</Badge>
                      <div className="text-sm text-muted-foreground">$49k</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Lead Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSourceData.map((source, index) => (
                    <div key={source.source} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{source.source}</span>
                        <div className="text-right">
                          <span className="font-bold">{source.count}</span>
                          <span className="text-sm text-muted-foreground ml-2">({source.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500" 
                          style={{width: `${source.percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Conversion Funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionData.map((stage, index) => (
                    <div key={stage.stage} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stage.stage}</span>
                        <div className="text-right">
                          <span className="font-bold">{stage.count}</span>
                          <span className="text-sm text-muted-foreground ml-2">({stage.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-gradient-primary h-3 rounded-full transition-all duration-500" 
                          style={{width: `${stage.percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pipeline Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{deals.length}</div>
                  <div className="text-sm text-muted-foreground">Active Deals</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-success">${(metrics.totalDealValue / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Pipeline Value</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-warning">{metrics.conversionRate.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">JD</span>
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">Sales Rep</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$85,000</div>
                    <div className="text-sm text-muted-foreground">15 deals</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">JS</span>
                    </div>
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">Sales Rep</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$72,000</div>
                    <div className="text-sm text-muted-foreground">12 deals</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;