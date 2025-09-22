import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Video, 
  Music,
  Archive,
  Download, 
  Share2, 
  Trash2,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  FolderPlus,
  Link,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import { crmStore } from '@/services/crmStore';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  file_type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  size?: number;
  url?: string;
  thumbnail?: string;
  uploaded_by: string;
  uploaded_by_name: string;
  created_at: Date;
  updated_at: Date;
  parent_folder?: string;
  shared_with?: string[];
  is_public: boolean;
  tags?: string[];
  related_to?: {
    type: 'contact' | 'deal' | 'lead';
    id: string;
    name: string;
  };
}

export const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Proposal Documents',
      type: 'folder',
      uploaded_by: 'user1',
      uploaded_by_name: 'Alice Johnson',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      is_public: false,
    },
    {
      id: '2',
      name: 'Client Agreement.pdf',
      type: 'file',
      file_type: 'document',
      size: 2456789,
      url: '/files/agreement.pdf',
      uploaded_by: 'user1',
      uploaded_by_name: 'Alice Johnson',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      is_public: false,
      tags: ['legal', 'contract'],
      related_to: {
        type: 'deal',
        id: 'deal1',
        name: 'Enterprise Software Deal'
      }
    },
    {
      id: '3',
      name: 'Product Demo Video.mp4',
      type: 'file',
      file_type: 'video',
      size: 45678912,
      url: '/files/demo.mp4',
      uploaded_by: 'user2',
      uploaded_by_name: 'Bob Martinez',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      is_public: true,
      tags: ['demo', 'marketing']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filter files
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || 
                         (filterType === 'folders' && file.type === 'folder') ||
                         (filterType === 'files' && file.type === 'file') ||
                         (filterType !== 'folders' && filterType !== 'files' && file.file_type === filterType);
      
      const matchesFolder = !currentFolder || file.parent_folder === currentFolder;
      
      return matchesSearch && matchesType && matchesFolder;
    });
  }, [files, searchTerm, filterType, currentFolder]);

  // File statistics
  const fileStats = useMemo(() => {
    const totalFiles = files.filter(f => f.type === 'file').length;
    const totalFolders = files.filter(f => f.type === 'folder').length;
    const totalSize = files.filter(f => f.type === 'file').reduce((sum, f) => sum + (f.size || 0), 0);
    const publicFiles = files.filter(f => f.type === 'file' && f.is_public).length;
    
    return { totalFiles, totalFolders, totalSize, publicFiles };
  }, [files]);

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <File className="w-8 h-8 text-primary" />;
    }
    
    switch (file.file_type) {
      case 'document': return <FileText className="w-8 h-8 text-blue-600" />;
      case 'image': return <Image className="w-8 h-8 text-green-600" />;
      case 'video': return <Video className="w-8 h-8 text-purple-600" />;
      case 'audio': return <Music className="w-8 h-8 text-orange-600" />;
      case 'archive': return <Archive className="w-8 h-8 text-yellow-600" />;
      default: return <File className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleFolderDoubleClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">
            Organize and share files with your team
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <FileUploadDialog onSubmit={() => setIsUploadOpen(false)} />
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <File className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileStats.totalFiles}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileStats.totalFolders}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Archive className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(fileStats.totalSize)}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Files</CardTitle>
            <Share2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileStats.publicFiles}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="folders">Folders</SelectItem>
              <SelectItem value="files">Files</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedFiles.length} selected
              </span>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
          
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      {currentFolder && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button variant="link" className="p-0" onClick={() => setCurrentFolder(null)}>
            Root
          </Button>
          <span>/</span>
          <span>Current Folder</span>
        </div>
      )}

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className={`shadow-card cursor-pointer transition-all hover:shadow-md ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleFileSelect(file.id)}
              onDoubleClick={() => file.type === 'folder' && handleFolderDoubleClick(file.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    {getFileIcon(file)}
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </h4>
                    
                    {file.type === 'file' && file.size && (
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">
                          {getInitials(file.uploaded_by_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate">
                        {file.uploaded_by_name}
                      </span>
                    </div>
                    
                    {file.is_public && (
                      <Badge variant="outline" className="text-xs">
                        Public
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id}
              className={`shadow-card cursor-pointer transition-all hover:shadow-md ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleFileSelect(file.id)}
              onDoubleClick={() => file.type === 'folder' && handleFolderDoubleClick(file.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(file)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{file.name}</h4>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>By {file.uploaded_by_name}</span>
                      <span>{format(file.created_at, 'MMM dd, yyyy')}</span>
                      {file.type === 'file' && file.size && (
                        <span>{formatFileSize(file.size)}</span>
                      )}
                    </div>
                    
                    {file.tags && file.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {file.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {file.related_to && (
                      <div className="text-xs text-muted-foreground">
                        Related to {file.related_to.type}: {file.related_to.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {file.is_public && (
                      <Badge variant="outline" className="text-xs">
                        Public
                      </Badge>
                    )}
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No files found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Upload your first files to get started.'}
            </p>
            <Button onClick={() => setIsUploadOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// File Upload Dialog
const FileUploadDialog: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogDescription>
          Drag and drop files here or click to browse.
        </DialogDescription>
      </DialogHeader>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground'
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => setDragActive(false)}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">Drop files here</p>
        <p className="text-muted-foreground mb-4">
          or click to browse your computer
        </p>
        <Button variant="outline">
          Browse Files
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="public" />
          <label htmlFor="public" className="text-sm">Make files publicly accessible</label>
        </div>
        
        <div>
          <label className="text-sm font-medium">Tags (optional)</label>
          <Input placeholder="Add tags separated by commas..." />
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={onSubmit} className="bg-gradient-primary">
          Upload Files
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};