import { useState, useMemo } from "react";
import { Plus, Search, Mail, Phone, Building2, MoreVertical, Calendar, MapPin, Briefcase, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crmStore } from "@/services/crmStore";
import { format } from "date-fns";

export const ContactsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterBy, setFilterBy] = useState<string>("all");
  const contacts = crmStore.getContacts();

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (contact.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (contact.title || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === "all" || 
        (filterBy === "primary" && contact.is_primary) ||
        (filterBy === "recent" && contact.created_at && new Date(contact.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      
      return matchesSearch && matchesFilter;
    });
  }, [contacts, searchTerm, filterBy]);

  const contactStats = useMemo(() => {
    const total = contacts.length;
    const primary = contacts.filter(c => c.is_primary).length;
    const withEmail = contacts.filter(c => c.email).length;
    const withPhone = contacts.filter(c => c.phone).length;
    
    return { total, primary, withEmail, withPhone };
  }, [contacts]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage your business contacts and relationships</p>
        </div>
        <Button className="bg-gradient-primary hover-scale shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Contact Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{contactStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Primary Contacts</p>
                <p className="text-2xl font-bold">{contactStats.primary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Mail className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">With Email</p>
                <p className="text-2xl font-bold">{contactStats.withEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">With Phone</p>
                <p className="text-2xl font-bold">{contactStats.withPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts by name, email, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-shadow focus:shadow-elegant"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter contacts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contacts</SelectItem>
            <SelectItem value="primary">Primary Contacts</SelectItem>
            <SelectItem value="recent">Recent (7 days)</SelectItem>
          </SelectContent>
        </Select>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="text-sm text-muted-foreground">
          {filteredContacts.length} of {contacts.length} contacts
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
        {filteredContacts.map((contact, index) => (
          <Card key={contact.id} className="transition-all hover:shadow-elegant hover-scale cursor-pointer shadow-card animate-fade-in group" style={{animationDelay: `${index * 0.1}s`}}>
            <CardContent className={viewMode === "grid" ? "p-5" : "p-4"}>
              <div className={`flex items-start gap-4 ${viewMode === "list" ? "items-center" : ""}`}>
                <Avatar className={viewMode === "grid" ? "h-14 w-14" : "h-10 w-10"}>
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-lg">
                    {getInitials(contact.first_name, contact.last_name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                        {contact.first_name} {contact.last_name}
                      </h3>
                      {contact.is_primary && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="w-4 h-4 mr-2" />
                          Call Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className={`space-y-2 ${viewMode === "list" ? "grid grid-cols-4 gap-4" : ""}`}>
                    {contact.title && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="font-medium">{contact.title}</span>
                      </div>
                    )}

                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="truncate hover:text-primary cursor-pointer transition-colors">{contact.email}</span>
                      </div>
                    )}

                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="hover:text-primary cursor-pointer transition-colors">{contact.phone}</span>
                      </div>
                    )}

                    {contact.department && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span>{contact.department}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Added {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      ID: {contact.id.slice(-6)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="text-center py-12 animate-fade-in">
          <CardContent>
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterBy !== "all" 
                ? "No contacts match your current search or filter criteria."
                : "Start building your network by adding your first contact."
              }
            </p>
            {(!searchTerm && filterBy === "all") && (
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Contact
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};