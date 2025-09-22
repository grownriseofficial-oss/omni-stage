import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, subMonths } from 'date-fns';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';

interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  leads?: number;
  deals?: number;
  conversion?: number;
}

export const AdvancedAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');

  // Sample analytics data
  const revenueData: ChartData[] = useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      return {
        name: format(date, days > 90 ? 'MMM dd' : 'dd'),
        value: Math.floor(Math.random() * 50000) + 10000,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        leads: Math.floor(Math.random() * 50) + 10,
        deals: Math.floor(Math.random() * 10) + 2,
        conversion: Math.floor(Math.random() * 30) + 10,
      };
    });
  }, [dateRange]);

  const leadSourceData: ChartData[] = [
    { name: 'Website', value: 45, revenue: 125000 },
    { name: 'Social Media', value: 25, revenue: 75000 },
    { name: 'Email Campaign', value: 15, revenue: 45000 },
    { name: 'Referrals', value: 10, revenue: 30000 },
    { name: 'Cold Outreach', value: 5, revenue: 15000 },
  ];

  const dealStageData: ChartData[] = [
    { name: 'Prospecting', value: 32, revenue: 450000 },
    { name: 'Qualification', value: 28, revenue: 380000 },
    { name: 'Proposal', value: 18, revenue: 250000 },
    { name: 'Negotiation', value: 12, revenue: 180000 },
    { name: 'Closing', value: 10, revenue: 150000 },
  ];

  const performanceData: ChartData[] = [
    { name: 'Alice Johnson', value: 85, deals: 23, revenue: 450000 },
    { name: 'Bob Martinez', value: 78, deals: 19, revenue: 380000 },
    { name: 'Carol Smith', value: 72, deals: 16, revenue: 320000 },
    { name: 'David Brown', value: 68, deals: 14, revenue: 280000 },
    { name: 'Emma Davis', value: 65, deals: 12, revenue: 240000 },
  ];

  const COLORS = ['hsl(262, 83%, 58%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)', 'hsl(220, 100%, 65%)'];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-success',
    },
    {
      title: 'Active Deals',
      value: '147',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'text-primary',
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-warning',
    },
    {
      title: 'Avg Deal Size',
      value: '$18.5K',
      change: '+5.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary',
    },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(262, 83%, 58%)" fill="hsl(262, 83%, 58%)" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="hsl(262, 83%, 58%)" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="hsl(262, 83%, 58%)" strokeWidth={2} />
              <Line type="monotone" dataKey="leads" stroke="hsl(142, 76%, 36%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
            <SelectTrigger className="w-32">
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

      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card key={index} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs ${
                  metric.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {metric.change} from last period
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue and lead generation over time</CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                >
                  <LineChartIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'area' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('area')}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of lead generation channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deal Pipeline */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Deal Pipeline</CardTitle>
            <CardDescription>Current deals by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dealStageData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Value']} />
                <Bar dataKey="revenue" fill="hsl(262, 83%, 58%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Leaderboard */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Top performers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((person, index) => (
              <div key={person.name} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{person.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${person.revenue?.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${person.value}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{person.deals} deals</span>
                      <span>•</span>
                      <span>{person.value}% target</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};