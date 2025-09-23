import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Webhook, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Database, 
  Cloud,
  Settings,
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
  Zap
} from 'lucide-react';

const Integrations = () => {
  const [connectedIntegrations] = useState([
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      description: 'Sync emails and track communications',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      icon: Calendar,
      description: 'Schedule meetings and sync events',
      status: 'connected',
      lastSync: '1 hour ago'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: MessageSquare,
      description: 'Get notifications in your workspace',
      status: 'connected',
      lastSync: '5 minutes ago'
    }
  ]);

  const [availableIntegrations] = useState([
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: Database,
      description: 'Import data from Salesforce CRM',
      category: 'CRM'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: Database,
      description: 'Sync contacts and deals with HubSpot',
      category: 'CRM'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      icon: Mail,
      description: 'Sync contacts for email campaigns',
      category: 'Marketing'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: Zap,
      description: 'Connect with 5000+ apps via Zapier',
      category: 'Automation'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: Cloud,
      description: 'Store and share files with Dropbox',
      category: 'Storage'
    }
  ]);

  const [webhooks] = useState([
    {
      id: '1',
      name: 'Lead Notifications',
      url: 'https://api.yourapp.com/webhooks/leads',
      events: ['lead.created', 'lead.updated'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Deal Pipeline',
      url: 'https://api.yourapp.com/webhooks/deals',
      events: ['deal.stage_changed', 'deal.won'],
      status: 'active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-success text-success-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      case 'active': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect your favorite tools and automate workflows</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Browse All Integrations
        </Button>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {connectedIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                      </div>
                      <Badge className={getStatusColor(integration.status)}>
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last sync:</span>
                      <span>{integration.lastSync}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {connectedIntegrations.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Webhook className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No integrations connected</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your favorite tools to streamline your workflow
                </p>
                <Button>Browse Integrations</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="shadow-card hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Configure webhooks to receive real-time notifications</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{webhook.name}</h4>
                      <Badge className={getStatusColor(webhook.status)}>
                        {webhook.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{webhook.url}</p>
                    <div className="flex gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for custom integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">Production API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="api-key"
                      type="password"
                      value="crm_live_sk_••••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="test-api-key">Test API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="test-api-key"
                      type="password"
                      value="crm_test_sk_••••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  API Documentation
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to integrate with our API and build custom solutions.
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;