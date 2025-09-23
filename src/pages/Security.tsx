import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
  User,
  Calendar
} from 'lucide-react';

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: 8,
    ipWhitelist: false,
    strongPassword: true,
    loginHistory: true
  });

  const [recentActivity] = useState([
    {
      id: '1',
      action: 'Login',
      device: 'Chrome on MacOS',
      location: 'New York, NY',
      ip: '192.168.1.1',
      timestamp: '2024-01-15 09:30:00',
      status: 'success'
    },
    {
      id: '2',
      action: 'Password Changed',
      device: 'Chrome on MacOS',
      location: 'New York, NY',
      ip: '192.168.1.1',
      timestamp: '2024-01-14 16:45:00',
      status: 'success'
    },
    {
      id: '3',
      action: 'Failed Login',
      device: 'Unknown Device',
      location: 'Unknown',
      ip: '203.0.113.1',
      timestamp: '2024-01-13 14:20:00',
      status: 'failed'
    }
  ]);

  const securityScore = 85;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground mt-1">Protect your account and data</p>
        </div>
        <Button className="bg-gradient-primary shadow-elegant">
          <Shield className="w-4 h-4 mr-2" />
          Security Audit
        </Button>
      </div>

      {/* Security Score */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Score
          </CardTitle>
          <CardDescription>
            Your account security rating based on enabled features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{securityScore}/100</div>
              <p className="text-sm text-muted-foreground">Very Good</p>
            </div>
            <div className="w-32">
              <Progress value={securityScore} className="h-3" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Two-factor authentication</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Strong password</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span>IP whitelist disabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Authentication Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Authentication
            </CardTitle>
            <CardDescription>
              Manage your login and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={securitySettings.twoFactor}
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, twoFactor: checked})
                }
              />
            </div>

            {securitySettings.twoFactor && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">2FA Enabled</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Authentication app configured for your account
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Recovery Codes</Button>
                  <Button variant="outline" size="sm">Reconfigure</Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </p>
              </div>
              <Switch
                checked={securitySettings.loginAlerts}
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, loginAlerts: checked})
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Session Timeout</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => 
                    setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})
                  }
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically log out after this period of inactivity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Access Control
            </CardTitle>
            <CardDescription>
              Control how and where your account can be accessed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>IP Address Whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Only allow logins from specific IP addresses
                </p>
              </div>
              <Switch
                checked={securitySettings.ipWhitelist}
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, ipWhitelist: checked})
                }
              />
            </div>

            {securitySettings.ipWhitelist && (
              <div className="space-y-3">
                <Label>Allowed IP Addresses</Label>
                <div className="space-y-2">
                  <Input placeholder="192.168.1.1" />
                  <Input placeholder="203.0.113.0/24" />
                </div>
                <Button variant="outline" size="sm">Add IP Address</Button>
              </div>
            )}

            <div className="space-y-3">
              <Label>Active Sessions</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">Chrome on MacOS</p>
                    </div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Mobile App</p>
                      <p className="text-xs text-muted-foreground">iPhone - 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password & Recovery */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Password & Recovery
          </CardTitle>
          <CardDescription>
            Manage your password and account recovery options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label>Change Password</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Last changed 14 days ago
                </p>
                <Button variant="outline" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Password Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    Contains uppercase and lowercase
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    Contains numbers and symbols
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Recovery Email</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Used for password reset and security alerts
                </p>
                <div className="flex gap-2">
                  <Input 
                    value="recovery@example.com" 
                    readOnly 
                    className="flex-1"
                  />
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div>
                <Label>Recovery Codes</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Use these codes if you lose access to your 2FA device
                </p>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Recovery Codes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Monitor recent account activity and login attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' : 'bg-destructive'
                  }`}></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.action}</p>
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{activity.device}</span>
                      <span>{activity.location}</span>
                      <span>{activity.ip}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{new Date(activity.timestamp).toLocaleDateString()}</p>
                  <p>{new Date(activity.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;