import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Globe, Heart, Zap } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP of Sales at TechCorp with 15+ years in sales technology.",
      image: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google engineer with expertise in scalable systems and AI.",
      image: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Product",
      bio: "Product leader with a passion for user experience and growth.",
      image: "ER"
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Full-stack architect with 10+ years building enterprise software.",
      image: "DK"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "Every decision we make is driven by what's best for our customers and their success."
    },
    {
      icon: Target,
      title: "Results Focused",
      description: "We measure our success by the tangible results our customers achieve using our platform."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "We believe in honest communication, fair pricing, and being upfront about everything we do."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in sales technology and automation."
    }
  ];

  const stats = [
    { label: "Customers Worldwide", value: "10,000+" },
    { label: "Countries Served", value: "50+" },
    { label: "Revenue Tracked", value: "$2.5B+" },
    { label: "Team Members", value: "150+" }
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
              About Us
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              We're building the future of 
              <span className="text-transparent bg-clip-text bg-gradient-primary"> sales technology</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Founded in 2020, CRM Pro started with a simple mission: make sales teams more productive by eliminating 
              manual work and providing powerful insights. Today, we serve over 10,000 customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center shadow-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                CRM Pro was born out of frustration with existing sales tools that were either too complex for small teams 
                or too limited for growing businesses. Our founders, Sarah and Michael, experienced this firsthand while 
                scaling their previous company from 5 to 500 employees.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                They spent months evaluating dozens of CRM solutions, only to find that each had significant limitations. 
                Some were powerful but required dedicated IT teams to manage. Others were simple but lacked the automation 
                and analytics needed to scale efficiently.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                So they decided to build the CRM they wished they had - one that was powerful enough for enterprise needs 
                but simple enough for any team to adopt quickly. The result is CRM Pro: a platform that grows with your 
                business while keeping complexity under control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product decisions to customer support.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={value.title} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people building the future of sales technology
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={member.name} className="shadow-card hover-scale animate-fade-in text-center" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-foreground">{member.image}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8">
              "To empower every sales team with intelligent automation and insights, 
              so they can focus on building relationships and closing deals instead of managing data."
            </p>
            <div className="flex items-center justify-center gap-4">
              <Award className="w-12 h-12 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Recognized by industry leaders</div>
                <div className="text-sm text-muted-foreground">Winner of Best CRM Platform 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Want to join our mission?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented people who share our passion for helping businesses grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/careers">
                <Button size="lg" className="bg-gradient-primary shadow-elegant">
                  <Users className="w-5 h-5 mr-2" />
                  View Open Positions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
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

export default About;