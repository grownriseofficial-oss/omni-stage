import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { 
  Mail, 
  Send, 
  Eye, 
  MousePointer, 
  Users, 
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'follow_up' | 'proposal' | 'newsletter' | 'custom';
  created_at: Date;
  updated_at: Date;
  usage_count: number;
  open_rate?: number;
  click_rate?: number;
}

interface EmailCampaign {
  id: string;
  name: string;
  template_id: string;
  template_name: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  scheduled_at?: Date;
  sent_at?: Date;
  created_at: Date;
  created_by: string;
}

export const EmailAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);

  // Sample data
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to our platform!',
      content: 'Thank you for joining us. Here\'s how to get started...',
      type: 'welcome',
      created_at: new Date(),
      updated_at: new Date(),
      usage_count: 45,
      open_rate: 68.5,
      click_rate: 12.3
    },
    {
      id: '2',
      name: 'Follow-up Email',
      subject: 'Following up on our conversation',
      content: 'Hi {{first_name}}, I wanted to follow up on our recent discussion...',
      type: 'follow_up',
      created_at: new Date(),
      updated_at: new Date(),
      usage_count: 78,
      open_rate: 72.1,
      click_rate: 15.7
    }
  ]);

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      name: 'Q4 Product Launch',
      template_id: '1',
      template_name: 'Welcome Email',
      status: 'sent',
      recipients: 1250,
      sent: 1250,
      opened: 856,
      clicked: 154,
      sent_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      created_by: 'Alice Johnson'
    },
    {
      id: '2',
      name: 'Lead Nurturing Series',
      template_id: '2',
      template_name: 'Follow-up Email',
      status: 'sending',
      recipients: 890,
      sent: 432,
      opened: 298,
      clicked: 47,
      scheduled_at: new Date(),
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      created_by: 'Bob Martinez'
    }
  ]);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.template_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, filterStatus]);

  // Email statistics
  const emailStats = useMemo(() => {
    const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
    const totalOpened = campaigns.reduce((sum, c) => sum + c.opened, 0);
    const totalClicked = campaigns.reduce((sum, c) => sum + c.clicked, 0);
    const activeCampaigns = campaigns.filter(c => ['scheduled', 'sending'].includes(c.status)).length;
    
    return {
      totalSent,
      totalOpened,
      totalClicked,
      activeCampaigns,
      openRate: totalSent > 0 ? (totalOpened / totalSent * 100).toFixed(1) : '0',
      clickRate: totalSent > 0 ? (totalClicked / totalSent * 100).toFixed(1) : '0'
    };
  }, [campaigns]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-success text-success-foreground';
      case 'sending': return 'bg-primary text-primary-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'paused': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'follow_up': return 'bg-green-100 text-green-800 border-green-200';
      case 'proposal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'newsletter': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Automation</h1>
          <p className="text-muted-foreground">
            Create and manage email campaigns and templates
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <TemplateCreateDialog onSubmit={() => setIsCreateTemplateOpen(false)} />
          </Dialog>
          
          <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <CampaignCreateDialog onSubmit={() => setIsCreateCampaignOpen(false)} />
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.totalSent.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opened</CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.totalOpened.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{emailStats.openRate}% rate</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicked</CardTitle>
            <MousePointer className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.totalClicked.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{emailStats.clickRate}% rate</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.activeCampaigns}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.openRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="sending">Sending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Template: {campaign.template_name}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.recipients.toLocaleString()} recipients</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Send className="w-4 h-4" />
                          <span>{campaign.sent.toLocaleString()} sent</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{campaign.opened.toLocaleString()} opened</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-4 h-4" />
                          <span>{campaign.clicked.toLocaleString()} clicked</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Created by {campaign.created_by} on {format(campaign.created_at, 'MMM dd, yyyy')}
                        {campaign.sent_at && (
                          <span> • Sent {format(campaign.sent_at, 'MMM dd, yyyy')}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {campaign.status === 'sending' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round((campaign.sent / campaign.recipients) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(campaign.sent / campaign.recipients) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.subject}</CardDescription>
                    </div>
                    
                    <Badge className={getTypeColor(template.type)}>
                      {template.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {template.content}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Used {template.usage_count} times</span>
                      <span>Updated {format(template.updated_at, 'MMM dd')}</span>
                    </div>
                    
                    {template.open_rate && (
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-success">
                          {template.open_rate}% open rate
                        </span>
                        <span className="text-warning">
                          {template.click_rate}% click rate
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Campaign Creation Dialog
const CampaignCreateDialog: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create Email Campaign</DialogTitle>
        <DialogDescription>Set up a new email campaign to reach your audience.</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Campaign Name</label>
          <Input placeholder="Enter campaign name..." />
        </div>
        
        <div>
          <label className="text-sm font-medium">Email Template</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="welcome">Welcome Email</SelectItem>
              <SelectItem value="followup">Follow-up Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Audience</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contacts</SelectItem>
              <SelectItem value="leads">Leads Only</SelectItem>
              <SelectItem value="customers">Customers Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={onSubmit} className="bg-gradient-primary">
          Create Campaign
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

// Template Creation Dialog
const TemplateCreateDialog: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Create Email Template</DialogTitle>
        <DialogDescription>Design a reusable email template.</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Template Name</label>
          <Input placeholder="Enter template name..." />
        </div>
        
        <div>
          <label className="text-sm font-medium">Subject Line</label>
          <Input placeholder="Enter email subject..." />
        </div>
        
        <div>
          <label className="text-sm font-medium">Template Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="welcome">Welcome</SelectItem>
              <SelectItem value="follow_up">Follow-up</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Email Content</label>
          <Textarea placeholder="Enter email content..." rows={4} />
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={onSubmit} className="bg-gradient-primary">
          Create Template
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};