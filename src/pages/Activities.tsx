import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Calendar, Phone, Mail, MessageSquare, Clock, CheckCircle, Filter } from 'lucide-react';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

// Mock activities data
const mockActivities = [
  {
    id: '1',
    type: 'call',
    title: 'Called John Doe',
    description: 'Discussed project requirements and budget',
    contact: 'John Doe',
    company: 'Acme Corp',
    date: new Date(),
    completed: true,
    duration: '15 min'
  },
  {
    id: '2',
    type: 'email',
    title: 'Email to Jane Smith',
    description: 'Sent proposal and pricing information',
    contact: 'Jane Smith',
    company: 'TechStart Inc',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    completed: true,
    duration: null
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Demo Meeting',
    description: 'Product demonstration scheduled',
    contact: 'Mike Johnson',
    company: 'StartupXYZ',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false,
    duration: '45 min'
  },
  {
    id: '4',
    type: 'task',
    title: 'Follow up with prospect',
    description: 'Send additional documentation',
    contact: 'Sarah Wilson',
    company: 'Global Solutions',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    completed: false,
    duration: null
  },
];

const Activities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredActivities = useMemo(() => {
    return mockActivities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || activity.type === filterType;
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'completed' && activity.completed) ||
        (filterStatus === 'pending' && !activity.completed);
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, filterType, filterStatus]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'task': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'email': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'task': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const upcomingActivities = filteredActivities.filter(a => !a.completed);
  const completedActivities = filteredActivities.filter(a => a.completed);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your sales activities</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          New Activity
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="all">All Types</option>
          <option value="call">Calls</option>
          <option value="email">Emails</option>
          <option value="meeting">Meetings</option>
          <option value="task">Tasks</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <div className="text-sm text-muted-foreground">
          {filteredActivities.length} activities
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingActivities.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedActivities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <Card key={activity.id} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{activity.title}</h3>
                      <Badge variant={activity.completed ? "default" : "secondary"}>
                        {activity.completed ? 'Completed' : 'Pending'}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {activity.contact.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{activity.contact}</span>
                      </div>
                      <span>•</span>
                      <span>{activity.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{getDateLabel(activity.date)} at {format(activity.date, 'HH:mm')}</span>
                      </div>
                      {activity.duration && (
                        <>
                          <span>•</span>
                          <span>{activity.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingActivities.map((activity, index) => (
            <Card key={activity.id} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{activity.title}</h3>
                      <Badge variant="secondary">Upcoming</Badge>
                      <Badge variant="outline" className="capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {activity.contact.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{activity.contact}</span>
                      </div>
                      <span>•</span>
                      <span>{activity.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{getDateLabel(activity.date)} at {format(activity.date, 'HH:mm')}</span>
                      </div>
                      {activity.duration && (
                        <>
                          <span>•</span>
                          <span>{activity.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button size="sm">Mark Complete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedActivities.map((activity, index) => (
            <Card key={activity.id} className="shadow-card animate-fade-in opacity-75" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{activity.title}</h3>
                      <Badge variant="default">Completed</Badge>
                      <Badge variant="outline" className="capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {activity.contact.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{activity.contact}</span>
                      </div>
                      <span>•</span>
                      <span>{activity.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{getDateLabel(activity.date)} at {format(activity.date, 'HH:mm')}</span>
                      </div>
                      {activity.duration && (
                        <>
                          <span>•</span>
                          <span>{activity.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredActivities.length === 0 && (
        <Card className="text-center py-12 animate-fade-in">
          <CardContent>
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                ? "No activities match your current filters."
                : "Start tracking your sales activities to stay organized."
              }
            </p>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Activity
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Activities;