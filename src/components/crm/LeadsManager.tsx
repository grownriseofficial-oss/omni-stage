import { useState, useMemo } from "react";
import { Plus, Search, Filter, MoreVertical, Mail, Phone, Building2, TrendingUp, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { crmStore } from "@/services/crmStore";
import { Lead } from "@/types/crm";
import { format } from "date-fns";

export const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newLead, setNewLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    source: "website",
    status: "new" as Lead["status"],
    value: 0,
    notes: ""
  });
  const leads = crmStore.getLeads();

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const fullName = `${lead.first_name} ${lead.last_name}`;
      const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    crmStore.updateLead(leadId, { status: newStatus });
  };

  const handleAddLead = () => {
    crmStore.addLead({
      ...newLead,
      score: Math.floor(Math.random() * 100)
    });
    setNewLead({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      source: "website",
      status: "new",
      value: 0,
      notes: ""
    });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "contacted": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "qualified": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closed_lost": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: Lead["status"]) => {
    switch (status) {
      case "new": return "🔵";
      case "contacted": return "📞";
      case "qualified": return "✅";
      case "closed_lost": return "❌";
      default: return "⭕";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  const statusOptions: Lead["status"][] = ["new", "contacted", "qualified", "closed_lost"];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage your sales leads and prospects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover-scale shadow-elegant">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={newLead.first_name}
                    onChange={(e) => setNewLead({...newLead, first_name: e.target.value})}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={newLead.last_name}
                    onChange={(e) => setNewLead({...newLead, last_name: e.target.value})}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newLead.company}
                    onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <Label htmlFor="value">Estimated Value</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newLead.value}
                    onChange={(e) => setNewLead({...newLead, value: Number(e.target.value)})}
                    placeholder="10000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newLead.status} onValueChange={(value) => setNewLead({...newLead, status: value as Lead["status"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  placeholder="Additional notes about this lead..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLead} className="bg-gradient-primary">
                  Add Lead
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-shadow focus:shadow-elegant"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>
                {getStatusIcon(status)} {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
        {filteredLeads.map((lead, index) => (
          <Card key={lead.id} className="transition-all hover:shadow-elegant hover-scale cursor-pointer shadow-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    {getInitials(lead.first_name, lead.last_name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-foreground text-lg">
                      {lead.first_name} {lead.last_name}
                    </h3>
                    <Badge className={getStatusColor(lead.status)}>
                      {getStatusIcon(lead.status)} {lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span>{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>${(lead.value || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Badge variant="outline" className="font-mono">
                        Score: {lead.score || 0}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                      </span>
                      <span className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {lead.source}
                      </span>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Change Status</div>
                        {statusOptions.map(status => (
                          <DropdownMenuItem 
                            key={status}
                            onClick={() => handleStatusChange(lead.id, status)}
                            className={lead.status === status ? "bg-muted" : ""}
                          >
                            <span className="mr-2">{getStatusIcon(status)}</span>
                            Mark as {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {lead.notes && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground line-clamp-2">{lead.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card className="text-center py-12 animate-fade-in">
          <CardContent>
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">No leads found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "No leads match your current filters. Try adjusting your search criteria."
                : "Start building your pipeline by adding your first lead."
              }
            </p>
            {(!searchTerm && statusFilter === "all") && (
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Lead
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};