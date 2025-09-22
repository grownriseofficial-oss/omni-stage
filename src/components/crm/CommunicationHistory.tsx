import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  FileText,
  Search,
  Filter,
  Clock,
  ArrowUpRight,
  User,
  Building,
  ChevronDown,
  ExternalLink,
  Plus
} from 'lucide-react';

interface CommunicationItem {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'sms' | 'video_call';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  contact_id?: string;
  contact_name?: string;
  lead_id?: string;
  deal_id?: string;
  duration?: number; // in minutes
  status: 'completed' | 'scheduled' | 'cancelled' | 'no_show';
  created_at: Date;
  created_by: string;
  created_by_name: string;
  attachments?: string[];
  tags?: string[];
}

export const CommunicationHistory: React.FC = () => {
  const [communications, setCommunications] = useState<CommunicationItem[]>([
    // Sample data
    {
      id: '1',
      type: 'email',
      direction: 'outbound',
      subject: 'Follow-up on Product Demo',
      content: 'Thank you for attending our product demonstration yesterday. As discussed, I\'m attaching the pricing information and next steps...',
      contact_name: 'John Smith',
      status: 'completed',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      created_by: 'user1',
      created_by_name: 'Alice Johnson',
      tags: ['follow-up', 'demo']
    },
    {
      id: '2',
      type: 'call',
      direction: 'inbound',
      content: 'Customer called to inquire about enterprise pricing options. Scheduled a follow-up meeting for next week.',
      contact_name: 'Sarah Wilson',
      duration: 25,
      status: 'completed',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      created_by: 'user2',
      created_by_name: 'Bob Martinez',
      tags: ['pricing', 'enterprise']
    },
    {
      id: '3',
      type: 'meeting',
      direction: 'outbound',
      subject: 'Product Discovery Session',
      content: 'Initial discovery meeting to understand customer requirements and pain points. Great engagement and interest shown.',
      contact_name: 'Michael Brown',
      duration: 60,
      status: 'completed',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
      created_by: 'user1',
      created_by_name: 'Alice Johnson',
      tags: ['discovery', 'requirements']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDirection, setFilterDirection] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter communications
  const filteredCommunications = useMemo(() => {
    return communications.filter(comm => {
      const matchesSearch = comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || comm.type === filterType;
      const matchesDirection = filterDirection === 'all' || comm.direction === filterDirection;
      const matchesStatus = filterStatus === 'all' || comm.status === filterStatus;
      const matchesTab = activeTab === 'all' || comm.type === activeTab;
      
      return matchesSearch && matchesType && matchesDirection && matchesStatus && matchesTab;
    });
  }, [communications, searchTerm, filterType, filterDirection, filterStatus, activeTab]);

  // Communication statistics
  const commStats = useMemo(() => {
    const total = communications.length;
    const emails = communications.filter(c => c.type === 'email').length;
    const calls = communications.filter(c => c.type === 'call').length;
    const meetings = communications.filter(c => c.type === 'meeting').length;
    const recent = communications.filter(c => 
      new Date(c.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;
    
    return { total, emails, calls, meetings, recent };
  }, [communications]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'video_call': return <Calendar className="w-4 h-4" />;
      case 'sms': return <MessageCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'call': return 'text-green-600 bg-green-50 border-green-200';
      case 'meeting': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'video_call': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'sms': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDirectionBadge = (direction: string) => {
    return direction === 'inbound' ? (
      <Badge variant="outline" className="text-xs text-success border-success">
        <ArrowUpRight className="w-3 h-3 mr-1 rotate-180" />
        Inbound
      </Badge>
    ) : (
      <Badge variant="outline" className="text-xs text-primary border-primary">
        <ArrowUpRight className="w-3 h-3 mr-1" />
        Outbound
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication History</h1>
          <p className="text-muted-foreground">
            Track all customer interactions and communications
          </p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Log Communication
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Communications</CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commStats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commStats.emails}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls</CardTitle>
            <Phone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commStats.calls}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commStats.meetings}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commStats.recent}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="call">Call</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterDirection} onValueChange={setFilterDirection}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Directions</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Communication Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="email">Emails</TabsTrigger>
          <TabsTrigger value="call">Calls</TabsTrigger>
          <TabsTrigger value="meeting">Meetings</TabsTrigger>
          <TabsTrigger value="note">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {/* Communications Timeline */}
          <div className="space-y-4">
            {filteredCommunications.map((comm) => (
              <Card key={comm.id} className="shadow-card transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Type Icon */}
                    <div className={`p-2 rounded-lg border ${getTypeColor(comm.type)}`}>
                      {getTypeIcon(comm.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          {comm.subject && (
                            <h3 className="font-medium leading-5">{comm.subject}</h3>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {comm.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getDirectionBadge(comm.direction)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {comm.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Communication Details */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          {comm.contact_name && (
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{comm.contact_name}</span>
                            </div>
                          )}
                          
                          {comm.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{comm.duration} min</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-1">
                            <span>by {comm.created_by_name}</span>
                          </div>
                          
                          <span>{format(new Date(comm.created_at), 'MMM dd, yyyy h:mm a')}</span>
                        </div>
                        
                        {comm.tags && comm.tags.length > 0 && (
                          <div className="flex space-x-1">
                            {comm.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredCommunications.length === 0 && (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No communications found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || filterType !== 'all' || filterDirection !== 'all' || filterStatus !== 'all'
                      ? 'Try adjusting your filters to see more communications.'
                      : 'Communication history will appear here as you interact with contacts.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};