import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Settings, 
  Crown, 
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  Calendar,
  Activity,
  Lock,
  Unlock,
  UserCheck,
  UserX
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';
import { User, UserRole } from '@/types/crm';

interface TeamMember extends Omit<User, 'permissions'> {
  status: 'active' | 'inactive' | 'pending';
  last_login?: Date;
  title?: string;
  phone?: string;
  is_active: boolean;
  permissions: {
    leads: { read: boolean; write: boolean; delete: boolean };
    deals: { read: boolean; write: boolean; delete: boolean };
    contacts: { read: boolean; write: boolean; delete: boolean };
    reports: { read: boolean; write: boolean; delete: boolean };
    settings: { read: boolean; write: boolean; delete: boolean };
  };
  team_id?: string;
  manager_id?: string;
  quota?: number;
  achievements?: string[];
}

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);

  // Sample team data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      company_id: 'company1',
      email: 'alice.johnson@company.com',
      first_name: 'Alice',
      last_name: 'Johnson',
      avatar: '',
      role: 'company_admin',
      is_active: true,
      department: 'Sales',
      title: 'Sales Manager',
      phone: '+1 (555) 123-4567',
      status: 'active',
      last_login: new Date(Date.now() - 2 * 60 * 60 * 1000),
      created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      updated_at: new Date(),
      created_by: 'system',
      updated_by: 'system',
      permissions: {
        leads: { read: true, write: true, delete: true },
        deals: { read: true, write: true, delete: true },
        contacts: { read: true, write: true, delete: true },
        reports: { read: true, write: true, delete: false },
        settings: { read: true, write: true, delete: false }
      },
      quota: 50000,
      achievements: ['Top Performer Q3', 'Team Leader']
    },
    {
      id: '2',
      company_id: 'company1',
      email: 'bob.martinez@company.com',
      first_name: 'Bob',
      last_name: 'Martinez',
      avatar: '',
      role: 'sales_rep',
      is_active: true,
      department: 'Sales',
      title: 'Senior Sales Representative',
      phone: '+1 (555) 234-5678',
      status: 'active',
      last_login: new Date(Date.now() - 24 * 60 * 60 * 1000),
      created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      updated_at: new Date(),
      created_by: 'user1',
      updated_by: 'user1',
      permissions: {
        leads: { read: true, write: true, delete: false },
        deals: { read: true, write: true, delete: false },
        contacts: { read: true, write: true, delete: false },
        reports: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false }
      },
      manager_id: '1',
      quota: 35000
    },
    {
      id: '3',
      company_id: 'company1',
      email: 'carol.smith@company.com',
      first_name: 'Carol',
      last_name: 'Smith',
      avatar: '',
      role: 'user',
      is_active: false,
      department: 'Marketing',
      title: 'Marketing Specialist',
      phone: '+1 (555) 345-6789',
      status: 'pending',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updated_at: new Date(),
      created_by: 'user1',
      updated_by: 'user1',
      permissions: {
        leads: { read: true, write: false, delete: false },
        deals: { read: false, write: false, delete: false },
        contacts: { read: true, write: false, delete: false },
        reports: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false }
      }
    }
  ]);

  // Filter team members
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.department?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || member.role === filterRole;
      const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [teamMembers, searchTerm, filterRole, filterStatus]);

  // Team statistics
  const teamStats = useMemo(() => {
    const total = teamMembers.length;
    const active = teamMembers.filter(m => m.status === 'active').length;
    const pending = teamMembers.filter(m => m.status === 'pending').length;
    const admins = teamMembers.filter(m => ['super_admin', 'company_admin'].includes(m.role)).length;
    
    return { total, active, pending, admins };
  }, [teamMembers]);

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive text-destructive-foreground';
      case 'company_admin': return 'bg-primary text-primary-foreground';
      case 'manager': return 'bg-warning text-warning-foreground';
      case 'sales_rep': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatRole = (role: UserRole) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const toggleUserStatus = (userId: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === userId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and permissions
          </p>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <UserInviteDialog onSubmit={() => setIsInviteOpen(false)} />
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.active}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <UserX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.pending}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Crown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="company_admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="sales_rep">Sales Rep</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {getInitials(member.first_name, member.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">
                        {member.first_name} {member.last_name}
                      </h3>
                      
                      <Badge className={getRoleColor(member.role)}>
                        {formatRole(member.role)}
                      </Badge>
                      
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      
                      {member.achievements && member.achievements.length > 0 && (
                        <Crown className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{member.department} - {member.title}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        
                        {member.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {format(member.created_at, 'MMM dd, yyyy')}</span>
                        </div>
                        
                        {member.last_login && (
                          <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4" />
                            <span>Last active {format(member.last_login, 'MMM dd, h:mm a')}</span>
                          </div>
                        )}
                        
                        {member.quota && (
                          <div className="flex items-center space-x-1">
                            <span>Quota: ${member.quota.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      
                      {member.achievements && member.achievements.length > 0 && (
                        <div className="flex space-x-1">
                          {member.achievements.map(achievement => (
                            <Badge key={achievement} variant="outline" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleUserStatus(member.id)}
                  >
                    {member.status === 'active' ? (
                      <>
                        <Lock className="w-4 h-4 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUser(member)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredMembers.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterRole !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters to see more users.'
                  : 'Invite your first team member to get started.'}
              </p>
              <Button onClick={() => setIsInviteOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit User Dialog */}
      {selectedUser && (
        <UserEditDialog 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          onSave={(updatedUser) => {
            setTeamMembers(prev => prev.map(m => 
              m.id === updatedUser.id ? updatedUser : m
            ));
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

// User Invite Dialog
const UserInviteDialog: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: 'user' as UserRole,
    department: '',
    title: ''
  });

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Invite Team Member</DialogTitle>
        <DialogDescription>
          Send an invitation to join your team.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <Input
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              placeholder="First name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <Input
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              placeholder="Last name"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Email Address</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="user@company.com"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Role</label>
            <Select value={formData.role} onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="sales_rep">Sales Rep</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="company_admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Department</label>
            <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Job Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Job title"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={onSubmit} className="bg-gradient-primary">
          Send Invitation
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

// User Edit Dialog
const UserEditDialog: React.FC<{ 
  user: TeamMember; 
  onClose: () => void;
  onSave: (user: TeamMember) => void;
}> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and permissions.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <Input
                  value={formData.first_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  value={formData.last_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select value={formData.role} onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="sales_rep">Sales Rep</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="company_admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Department</label>
                <Input
                  value={formData.department || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <div className="space-y-4">
              {Object.entries(formData.permissions).map(([module, perms]) => (
                <div key={module} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 capitalize">{module}</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={perms.read}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              [module]: { ...perms, read: checked }
                            }
                          }))
                        }
                      />
                      <label className="text-sm">Read</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={perms.write}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              [module]: { ...perms, write: checked }
                            }
                          }))
                        }
                      />
                      <label className="text-sm">Write</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={perms.delete}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              [module]: { ...perms, delete: checked }
                            }
                          }))
                        }
                      />
                      <label className="text-sm">Delete</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)} className="bg-gradient-primary">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};