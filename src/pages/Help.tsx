import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Play, 
  MessageSquare, 
  Download,
  ChevronRight,
  Users,
  Settings,
  BarChart3,
  Zap,
  Shield,
  HeadphonesIcon
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularTopics = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of setting up your CRM",
      articles: 12,
      category: "basics"
    },
    {
      icon: Settings,
      title: "Account Setup",
      description: "Configure your account and team settings",
      articles: 8,
      category: "setup"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Understanding your sales data and metrics",
      articles: 15,
      category: "analytics"
    },
    {
      icon: Zap,
      title: "Automation & Workflows",
      description: "Set up automated processes and workflows",
      articles: 10,
      category: "automation"
    },
    {
      icon: Shield,
      title: "Security & Permissions",
      description: "Manage user access and data security",
      articles: 6,
      category: "security"
    }
  ];

  const quickLinks = [
    { title: "How to add your first lead", category: "Getting Started" },
    { title: "Setting up your sales pipeline", category: "Configuration" },
    { title: "Creating custom fields", category: "Customization" },
    { title: "Importing your contacts", category: "Data Management" },
    { title: "Setting up email automation", category: "Automation" },
    { title: "Understanding dashboard metrics", category: "Analytics" },
    { title: "Managing user permissions", category: "Administration" },
    { title: "API documentation", category: "Integration" }
  ];

  const videoTutorials = [
    {
      title: "CRM Pro Overview - Getting Started",
      duration: "5:30",
      views: "12.5K",
      category: "Basics"
    },
    {
      title: "Setting Up Your Sales Pipeline",
      duration: "8:15",
      views: "8.2K", 
      category: "Configuration"
    },
    {
      title: "Advanced Reporting Features",
      duration: "12:45",
      views: "6.8K",
      category: "Analytics"
    },
    {
      title: "Workflow Automation Best Practices",
      duration: "15:20",
      views: "9.1K",
      category: "Automation"
    }
  ];

  const faqs = [
    {
      question: "How do I import my existing contacts?",
      answer: "You can import contacts using our CSV import tool. Go to Contacts > Import and follow the step-by-step wizard."
    },
    {
      question: "Can I customize the sales pipeline stages?",
      answer: "Yes! Navigate to Settings > Pipelines to add, remove, or reorder pipeline stages to match your sales process."
    },
    {
      question: "How do I set up email automation?",
      answer: "Go to Workflows > Create New Workflow and select 'Email Automation' as your trigger type. Then configure your conditions and actions."
    },
    {
      question: "What integrations are available?",
      answer: "We support 100+ integrations including Google Workspace, Microsoft 365, Slack, Zapier, and many more. Check Settings > Integrations for the full list."
    },
    {
      question: "How do I add team members?",
      answer: "Team owners and admins can invite new members from Settings > Team Management. Just enter their email and select their role."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/landing" className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">CRM Pro</span>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="sm">
                <HeadphonesIcon className="w-4 h-4 mr-1" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Help Center
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 animate-fade-in">
              How can we
              <span className="text-transparent bg-clip-text bg-gradient-primary"> help you?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Search our knowledge base, watch tutorials, or browse by topic to get the answers you need.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for articles, guides, or tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                <p className="text-muted-foreground text-sm mb-4">Comprehensive guides and API docs</p>
                <Button variant="outline" className="w-full">Browse Docs</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
                <p className="text-muted-foreground text-sm mb-4">Step-by-step video walkthroughs</p>
                <Button variant="outline" className="w-full">Watch Videos</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-muted-foreground text-sm mb-4">Connect with other users</p>
                <Button variant="outline" className="w-full">Join Community</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="topics" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="topics">Browse Topics</TabsTrigger>
              <TabsTrigger value="articles">Popular Articles</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popularTopics.map((topic, index) => (
                    <Card key={topic.title} className="shadow-card hover-scale animate-fade-in cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <topic.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">{topic.articles} articles</Badge>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {quickLinks.map((link, index) => (
                    <Card key={link.title} className="shadow-card hover-scale animate-fade-in cursor-pointer" style={{animationDelay: `${index * 0.05}s`}}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium mb-1">{link.title}</h3>
                            <p className="text-sm text-muted-foreground">{link.category}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {videoTutorials.map((video, index) => (
                    <Card key={video.title} className="shadow-card hover-scale animate-fade-in cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardContent className="p-6">
                        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <Play className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">{video.title}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                        <Badge variant="outline" className="mt-2">{video.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={faq.question} className="shadow-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-3">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Downloads & Resources</h2>
            <p className="text-xl text-muted-foreground">Helpful resources to get the most out of CRM Pro</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quick Start Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">PDF guide to get started quickly</p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Mobile Apps</h3>
                <p className="text-sm text-muted-foreground mb-4">iOS and Android applications</p>
                <Button variant="outline" size="sm">Get Apps</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-scale animate-fade-in text-center">
              <CardContent className="p-6">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">Complete API reference</p>
                <Button variant="outline" size="sm">View Docs</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-primary shadow-elegant">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <HeadphonesIcon className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CRM Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Help;