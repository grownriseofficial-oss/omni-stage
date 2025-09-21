import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  BarChart3, 
  Zap, 
  Mail, 
  Smartphone, 
  Shield, 
  Globe, 
  Bot,
  Calendar,
  FileText,
  Workflow,
  Phone,
  MessageSquare,
  Lock,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Contact Management",
      description: "Organize all your contacts in one place with detailed profiles, interaction history, and smart segmentation.",
      benefits: ["360° customer view", "Automatic data enrichment", "Smart duplicate detection", "Custom fields & tags"]
    },
    {
      icon: Target,
      title: "Deal Pipeline",
      description: "Track deals through your sales process with customizable pipelines and automated stage progression.",
      benefits: ["Visual kanban boards", "Custom pipeline stages", "Probability scoring", "Revenue forecasting"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get deep insights into your sales performance with real-time reports and predictive analytics.",
      benefits: ["Real-time dashboards", "Custom reports", "Performance tracking", "Predictive insights"]
    },
    {
      icon: Zap,
      title: "Sales Automation",
      description: "Automate repetitive tasks and workflows to focus on what matters most - closing deals.",
      benefits: ["Email sequences", "Task automation", "Lead scoring", "Follow-up reminders"]
    },
    {
      icon: Mail,
      title: "Email Integration",
      description: "Seamlessly integrate with your email to track communications and automate follow-ups.",
      benefits: ["Gmail & Outlook sync", "Email tracking", "Template library", "Automated sequences"]
    },
    {
      icon: Smartphone,
      title: "Mobile CRM",
      description: "Access your CRM data anywhere with our native mobile apps for iOS and Android.",
      benefits: ["Offline access", "Push notifications", "Mobile-optimized UI", "Camera integration"]
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Leverage AI to get insights, automate data entry, and predict customer behavior.",
      benefits: ["Smart recommendations", "Auto data capture", "Predictive scoring", "Natural language queries"]
    },
    {
      icon: Workflow,
      title: "Custom Workflows",
      description: "Create powerful automation workflows that adapt to your unique sales processes.",
      benefits: ["Visual workflow builder", "Conditional logic", "Multi-step sequences", "External integrations"]
    },
    {
      icon: Calendar,
      title: "Meeting Scheduler",
      description: "Streamline meeting booking with integrated calendar scheduling and video conferencing.",
      benefits: ["Calendar sync", "Booking pages", "Video integration", "Automated reminders"]
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Store and organize sales documents with version control and secure sharing.",
      benefits: ["File organization", "Version history", "Secure sharing", "E-signature integration"]
    },
    {
      icon: Phone,
      title: "VoIP Integration",
      description: "Make and receive calls directly from the CRM with automatic call logging and recording.",
      benefits: ["Click-to-call", "Call recording", "Voicemail transcription", "Call analytics"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance, encryption, and granular permissions.",
      benefits: ["SOC 2 compliant", "256-bit encryption", "Role-based access", "Audit trails"]
    }
  ];

  const integrations = [
    { name: "Gmail", category: "Email" },
    { name: "Outlook", category: "Email" },
    { name: "Slack", category: "Communication" },
    { name: "Zoom", category: "Video" },
    { name: "Calendly", category: "Scheduling" },
    { name: "HubSpot", category: "Marketing" },
    { name: "Salesforce", category: "Migration" },
    { name: "Zapier", category: "Automation" },
    { name: "QuickBooks", category: "Finance" },
    { name: "Stripe", category: "Payments" },
    { name: "Mailchimp", category: "Marketing" },
    { name: "DocuSign", category: "Documents" }
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
            <div className="w-16"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Features
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              Everything you need to
              <span className="text-transparent bg-clip-text bg-gradient-primary"> close more deals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              From lead capture to deal closure, CRM Pro provides all the tools your sales team needs 
              to be more productive and successful.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-primary shadow-elegant">
                Start Free Trial
              </Button>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={feature.title} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Works with your favorite tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect CRM Pro with the tools you already use to create a seamless workflow.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <Card key={integration.name} className="shadow-card hover-scale animate-fade-in text-center" style={{animationDelay: `${index * 0.05}s`}}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see your tool? We have 500+ integrations available.
            </p>
            <Button variant="outline">
              View All Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Enterprise-grade security</h2>
              <p className="text-xl text-muted-foreground">
                Your data is protected with the highest security standards in the industry.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">SOC 2 Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Independently verified security controls
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center">
                <CardContent className="p-6">
                  <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">256-bit Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Bank-level encryption in transit and at rest
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Role-based Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Granular permissions for team members
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center">
                <CardContent className="p-6">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Audit Trails</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete activity logs and compliance reports
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to transform your sales process?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of sales teams who have already boosted their productivity with CRM Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-primary shadow-elegant">
                Start Free Trial
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Setup in minutes
            </p>
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

export default Features;