import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Webhook,
  Mail,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';

const Settings = () => {
  const currentUser = crmStore.getCurrentUser();
  const currentCompany = crmStore.getCurrentCompany();
  
  const [profileData, setProfileData] = useState({
    first_name: currentUser?.first_name || '',
    last_name: currentUser?.last_name || '',
    email: currentUser?.email || '',
    phone: '',
    timezone: 'America/New_York',
    language: 'en'
  });

  const [companyData, setCompanyData] = useState({
    name: currentCompany?.name || '',
    domain: currentCompany?.domain || '',
    industry: 'Technology',
    size: '1-10',
    currency: currentCompany?.settings.currency || 'USD',
    fiscal_year_start: currentCompany?.settings.fiscal_year_start || '01/01'
  });

  const [notifications, setNotifications] = useState({
    email_leads: true,
    email_deals: true,
    email_activities: false,
    push_leads: true,
    push_deals: true,
    push_activities: true,
    weekly_reports: true,
    monthly_reports: false
  });

  const [security, setSecurity] = useState({
    two_factor: false,
    login_alerts: true,
    session_timeout: '8',
    ip_whitelist: false
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and company preferences</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-bold">
                    {profileData.first_name[0]}{profileData.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={profileData.language} onValueChange={(value) => setProfileData({...profileData, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={companyData.domain}
                    onChange={(e) => setCompanyData({...companyData, domain: e.target.value})}
                    placeholder="yourcompany.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={companyData.industry} onValueChange={(value) => setCompanyData({...companyData, industry: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="company_size">Company Size</Label>
                  <Select value={companyData.size} onValueChange={(value) => setCompanyData({...companyData, size: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={companyData.currency} onValueChange={(value) => setCompanyData({...companyData, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fiscal_year">Fiscal Year Start</Label>
                  <Select value={companyData.fiscal_year_start} onValueChange={(value) => setCompanyData({...companyData, fiscal_year_start: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01/01">January 1st</SelectItem>
                      <SelectItem value="04/01">April 1st</SelectItem>
                      <SelectItem value="07/01">July 1st</SelectItem>
                      <SelectItem value="10/01">October 1st</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Leads</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new leads are created</p>
                    </div>
                    <Switch 
                      checked={notifications.email_leads}
                      onCheckedChange={(checked) => setNotifications({...notifications, email_leads: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Deal Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified when deals are updated</p>
                    </div>
                    <Switch 
                      checked={notifications.email_deals}
                      onCheckedChange={(checked) => setNotifications({...notifications, email_deals: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Activity Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming activities</p>
                    </div>
                    <Switch 
                      checked={notifications.email_activities}
                      onCheckedChange={(checked) => setNotifications({...notifications, email_activities: checked})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Leads</Label>
                      <p className="text-sm text-muted-foreground">Instant notifications for new leads</p>
                    </div>
                    <Switch 
                      checked={notifications.push_leads}
                      onCheckedChange={(checked) => setNotifications({...notifications, push_leads: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Deal Updates</Label>
                      <p className="text-sm text-muted-foreground">Instant notifications for deal changes</p>
                    </div>
                    <Switch 
                      checked={notifications.push_deals}
                      onCheckedChange={(checked) => setNotifications({...notifications, push_deals: checked})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Reports</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly sales performance summary</p>
                    </div>
                    <Switch 
                      checked={notifications.weekly_reports}
                      onCheckedChange={(checked) => setNotifications({...notifications, weekly_reports: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Monthly Reports</Label>
                      <p className="text-sm text-muted-foreground">Monthly detailed analytics report</p>
                    </div>
                    <Switch 
                      checked={notifications.monthly_reports}
                      onCheckedChange={(checked) => setNotifications({...notifications, monthly_reports: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={security.two_factor}
                      onCheckedChange={(checked) => setSecurity({...security, two_factor: checked})}
                    />
                    {security.two_factor && <Badge variant="default">Enabled</Badge>}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch 
                    checked={security.login_alerts}
                    onCheckedChange={(checked) => setSecurity({...security, login_alerts: checked})}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="session_timeout">Session Timeout (hours)</Label>
                    <Select value={security.session_timeout} onValueChange={(value) => setSecurity({...security, session_timeout: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>IP Whitelist</Label>
                    <Switch 
                      checked={security.ip_whitelist}
                      onCheckedChange={(checked) => setSecurity({...security, ip_whitelist: checked})}
                    />
                  </div>
                  {security.ip_whitelist && (
                    <div>
                      <Textarea 
                        placeholder="Enter IP addresses (one per line)"
                        className="mt-2"
                        rows={3}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Only these IP addresses will be able to access your account
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    Export Account Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-primary" />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email Provider</h4>
                      <p className="text-sm text-muted-foreground">Connect your email service</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Payment Gateway</h4>
                      <p className="text-sm text-muted-foreground">Process payments and invoices</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Calendar Sync</h4>
                      <p className="text-sm text-muted-foreground">Sync with Google Calendar or Outlook</p>
                    </div>
                  </div>
                  <Badge variant="default">Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Billing & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Professional Plan</h4>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced CRM features with automation and integrations
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$29<span className="text-base font-normal">/month</span></span>
                  <Button variant="outline" size="sm">Change Plan</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Payment Method</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Recent Invoices</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Invoice #001</div>
                      <div className="text-sm text-muted-foreground">December 1, 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$29.00</div>
                      <Badge variant="default" className="text-xs">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Invoice #002</div>
                      <div className="text-sm text-muted-foreground">November 1, 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$29.00</div>
                      <Badge variant="default" className="text-xs">Paid</Badge>
                    </div>
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

export default Settings;