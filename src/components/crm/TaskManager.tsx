import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Flag,
  MoreHorizontal
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';
import { Activity, ActivityType } from '@/types/crm';

interface Task extends Omit<Activity, 'related_to_type' | 'related_to_id'> {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  assignee_id?: string;
  notes?: string;
  contact_id?: string;
  deal_id?: string;
  related_to_type?: 'lead' | 'contact' | 'account' | 'deal';
  related_to_id?: string;
}

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'completed' && task.completed) ||
                           (filterStatus === 'pending' && !task.completed) ||
                           (filterStatus === 'overdue' && task.due_date && new Date(task.due_date) < new Date() && !task.completed);
      
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, filterStatus, filterPriority]);

  // Task statistics
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && !t.completed).length;
    const highPriority = tasks.filter(t => ['high', 'urgent'].includes(t.priority) && !t.completed).length;
    
    return { total, completed, pending, overdue, highPriority };
  }, [tasks]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="w-4 h-4 text-destructive" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'medium': return <Circle className="w-4 h-4 text-primary" />;
      default: return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-destructive bg-destructive/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'medium': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleCreateTask = (taskData: Partial<Task>) => {
    const currentUser = crmStore.getCurrentUser();
    const currentCompany = crmStore.getCurrentCompany();
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      company_id: currentCompany?.id || '',
      type: 'task' as ActivityType,
      subject: taskData.subject || taskData.description || 'New Task',
      description: taskData.description,
      notes: taskData.notes,
      due_date: taskData.due_date,
      is_completed: false,
      priority: taskData.priority || 'medium',
      completed: false,
      assignee_id: taskData.assignee_id,
      contact_id: taskData.contact_id,
      deal_id: taskData.deal_id,
      owner_id: currentUser?.id || '',
      related_to_type: taskData.contact_id ? 'contact' : taskData.deal_id ? 'deal' : undefined,
      related_to_id: taskData.contact_id || taskData.deal_id || '',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: currentUser?.id || '',
      updated_by: currentUser?.id || '',
    };
    
    setTasks(prev => [...prev, newTask]);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Organize and track your team's tasks and activities
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <TaskCreateDialog onSubmit={handleCreateTask} />
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Circle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.completed}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.pending}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.overdue}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Flag className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="board">Board</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`shadow-card border-l-4 ${getPriorityColor(task.priority)} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="p-0 h-auto"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(task.priority)}
                      <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.subject || task.description}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    
                    {task.notes && (
                      <p className="text-sm text-muted-foreground">{task.notes}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {task.due_date && (
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                      
                      {task.assignee_id && (
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>Assigned</span>
                        </div>
                      )}
                      
                      <span>Created: {format(new Date(task.created_at), 'MMM dd')}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Try adjusting your filters to see more tasks.'
                  : 'Create your first task to get started.'}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>Create Task</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Task Creation Dialog Component
const TaskCreateDialog: React.FC<{ onSubmit: (data: Partial<Task>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    priority: 'medium',
  });
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSubmit = () => {
    if (!formData.subject?.trim()) return;
    
    onSubmit({
      ...formData,
      due_date: selectedDate,
    });
    
    setFormData({ priority: 'medium' });
    setSelectedDate(undefined);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>
          Add a new task to track and manage your activities.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Enter task title..."
            value={formData.subject || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Enter task details..."
            value={formData.notes || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select 
              value={formData.priority} 
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!formData.subject?.trim()}
          className="bg-gradient-primary"
        >
          Create Task
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};