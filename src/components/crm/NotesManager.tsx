import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  FileText, 
  User, 
  Clock,
  Tag,
  Edit,
  Trash2,
  MoreHorizontal,
  Pin,
  Star
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';

interface Note {
  id: string;
  title: string;
  content: string;
  contact_id?: string;
  deal_id?: string;
  lead_id?: string;
  tags: string[];
  is_pinned: boolean;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  author_name: string;
}

export const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'pinned' | 'private'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Get unique tags from all notes
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [notes]);

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = filterTag === 'all' || note.tags.includes(filterTag);
      
      const matchesType = filterType === 'all' ||
                         (filterType === 'pinned' && note.is_pinned) ||
                         (filterType === 'private' && note.is_private);
      
      return matchesSearch && matchesTag && matchesType;
    });
  }, [notes, searchTerm, filterTag, filterType]);

  // Notes statistics
  const noteStats = useMemo(() => {
    const total = notes.length;
    const pinned = notes.filter(n => n.is_pinned).length;
    const private_notes = notes.filter(n => n.is_private).length;
    const tagged = notes.filter(n => n.tags.length > 0).length;
    
    return { total, pinned, private: private_notes, tagged };
  }, [notes]);

  const handleCreateNote = (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: noteData.title || '',
      content: noteData.content || '',
      contact_id: noteData.contact_id,
      deal_id: noteData.deal_id,
      lead_id: noteData.lead_id,
      tags: noteData.tags || [],
      is_pinned: noteData.is_pinned || false,
      is_private: noteData.is_private || false,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: crmStore.getCurrentUser()?.id || '',
      author_name: crmStore.getCurrentUser()?.first_name + ' ' + crmStore.getCurrentUser()?.last_name || 'Unknown User',
    };
    
    setNotes(prev => [newNote, ...prev]);
    setIsCreateDialogOpen(false);
  };

  const togglePin = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, is_pinned: !note.is_pinned } : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">
            Capture and organize important information and insights
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </DialogTrigger>
          <NoteCreateDialog onSubmit={handleCreateNote} allTags={allTags} />
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noteStats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned</CardTitle>
            <Pin className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noteStats.pinned}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Private</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noteStats.private}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tagged</CardTitle>
            <Tag className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noteStats.tagged}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notes</SelectItem>
            <SelectItem value="pinned">Pinned</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="shadow-card transition-all hover:shadow-md group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {note.is_pinned && <Pin className="w-4 h-4 text-warning" />}
                    {note.is_private && <User className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <CardTitle className="text-lg leading-6 line-clamp-2">{note.title}</CardTitle>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" onClick={() => togglePin(note.id)}>
                    <Pin className={`w-4 h-4 ${note.is_pinned ? 'text-warning' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {note.content}
              </p>
              
              {/* Tags */}
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-xs">
                      {getInitials(note.author_name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{note.author_name}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{format(new Date(note.created_at), 'MMM dd')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredNotes.length === 0 && (
          <div className="col-span-full">
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterTag !== 'all' || filterType !== 'all'
                    ? 'Try adjusting your filters to see more notes.'
                    : 'Create your first note to get started.'}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Create Note</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Note Creation Dialog Component
const NoteCreateDialog: React.FC<{ 
  onSubmit: (data: Partial<Note>) => void;
  allTags: string[];
}> = ({ onSubmit, allTags }) => {
  const [formData, setFormData] = useState<Partial<Note>>({
    tags: [],
    is_pinned: false,
    is_private: false,
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = () => {
    if (!formData.title?.trim() || !formData.content?.trim()) return;
    
    onSubmit(formData);
    
    setFormData({
      tags: [],
      is_pinned: false,
      is_private: false,
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Create New Note</DialogTitle>
        <DialogDescription>
          Capture important information and insights.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Enter note title..."
            value={formData.title || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Content</label>
          <Textarea
            placeholder="Write your note content..."
            value={formData.content || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Tags</label>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1"
            />
            <Button type="button" onClick={addTag} size="sm">Add</Button>
          </div>
          
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag)}
                    className="ml-1 h-auto p-0 text-xs"
                  >
                    ×
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.is_pinned || false}
              onChange={(e) => setFormData(prev => ({ ...prev, is_pinned: e.target.checked }))}
              className="rounded"
            />
            <span>Pin this note</span>
          </label>
          
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.is_private || false}
              onChange={(e) => setFormData(prev => ({ ...prev, is_private: e.target.checked }))}
              className="rounded"
            />
            <span>Private note</span>
          </label>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!formData.title?.trim() || !formData.content?.trim()}
          className="bg-gradient-primary"
        >
          Create Note
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};