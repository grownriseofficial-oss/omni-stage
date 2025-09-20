import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, HeadphonesIcon } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@crmPro.com",
      response: "Within 4 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available on our website",
      response: "Mon-Fri 9AM-9PM EST"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "New York",
      address: "456 Business Ave, Floor 20\nNew York, NY 10001",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "London",
      address: "789 Innovation Road\nLondon, EC1A 1BB, UK",
      phone: "+44 20 7123 4567"
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
            <div className="w-16"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Contact Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 animate-fade-in">
              We're here to help you
              <span className="text-transparent bg-clip-text bg-gradient-primary"> succeed</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Have questions about our CRM platform? Need help getting started? Our team is ready to assist you 
              in achieving your sales goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="shadow-card hover-scale animate-fade-in text-center" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                  <p className="font-medium mb-1">{method.contact}</p>
                  <p className="text-sm text-muted-foreground">{method.response}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary" />
                  Send us a message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inquiry_type">How can we help?</Label>
                    <select
                      id="inquiry_type"
                      value={formData.inquiry_type}
                      onChange={(e) => setFormData({...formData, inquiry_type: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales Question</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="demo">Request Demo</option>
                      <option value="billing">Billing Question</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                    Need immediate help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For urgent issues or if you need immediate assistance, don't hesitate to call us directly 
                    or start a live chat session.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button className="bg-gradient-primary">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now: +1 (555) 123-4567
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Sales Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Interested in a personalized demo or have specific questions about pricing and features?
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Enterprise Sales</p>
                    <p className="text-sm text-muted-foreground">sales@crmPro.com</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4568</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Email Support</span>
                    <span className="text-muted-foreground">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone & Chat</span>
                    <span className="text-muted-foreground">Mon-Fri 9AM-9PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Support</span>
                    <span className="text-muted-foreground">24/7 (Enterprise)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Global Offices</h2>
            <p className="text-xl text-muted-foreground">Visit us in person or get local support</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {offices.map((office, index) => (
              <Card key={office.city} className="shadow-card hover-scale animate-fade-in text-center" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-muted-foreground mb-3">
                    {office.address}
                  </div>
                  <p className="font-medium">{office.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Can't find what you're looking for? Check out our comprehensive help center.
            </p>
            <Link to="/help">
              <Button variant="outline" size="lg">
                View Help Center
              </Button>
            </Link>
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

export default Contact;