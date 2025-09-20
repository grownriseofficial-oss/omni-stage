import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  BarChart3,
  HeadphonesIcon,
  PlayCircle
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Capture, track, and nurture leads from multiple sources with intelligent scoring and automation."
    },
    {
      icon: TrendingUp,
      title: "Sales Pipeline",
      description: "Visualize your sales process with customizable pipelines and advanced forecasting capabilities."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Make data-driven decisions with comprehensive analytics and real-time performance insights."
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and streamline your sales process with intelligent workflows."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with role-based permissions, audit trails, and compliance features."
    },
    {
      icon: Globe,
      title: "Integrations",
      description: "Connect with 100+ tools including email, calendar, payment processors, and marketing platforms."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director",
      company: "TechCorp Inc",
      content: "This CRM transformed our sales process. We increased our conversion rate by 40% in just 3 months.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      content: "The automation features saved us countless hours. Our team can now focus on what matters - closing deals.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "VP Sales",
      company: "Global Solutions",
      content: "Best CRM we've ever used. The reporting capabilities give us insights we never had before.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 users",
        "1,000 contacts",
        "Basic reporting",
        "Email support",
        "Mobile app"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      description: "Advanced features for growing businesses",
      features: [
        "Up to 25 users",
        "10,000 contacts",
        "Advanced reporting",
        "Workflow automation",
        "Priority support",
        "Integrations",
        "Custom fields"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Complete solution for large organizations",
      features: [
        "Unlimited users",
        "Unlimited contacts",
        "Custom reporting",
        "Advanced automation",
        "24/7 phone support",
        "Custom integrations",
        "White-label options",
        "Dedicated success manager"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">CRM Pro</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/">
                <Button className="bg-gradient-primary shadow-elegant">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              🚀 New: AI-Powered Lead Scoring Available Now
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              The CRM that grows
              <span className="text-transparent bg-clip-text bg-gradient-primary"> with your business</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Streamline your sales process, automate workflows, and close more deals with our intelligent CRM platform. 
              Trusted by 10,000+ sales teams worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Link to="/">
                <Button size="lg" className="bg-gradient-primary shadow-elegant text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to close more deals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help your sales team work smarter, not harder.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={feature.title} className="shadow-card hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Loved by sales teams everywhere</h2>
            <p className="text-xl text-muted-foreground">Join thousands of companies that trust our CRM</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="shadow-card animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that's right for your team</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={plan.name} className={`shadow-card hover-scale animate-fade-in ${plan.popular ? 'border-primary shadow-elegant' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  {plan.popular && (
                    <Badge className="bg-gradient-primary mb-4 mx-auto">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mt-4">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-primary shadow-elegant' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to transform your sales process?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of companies that have increased their sales by 40% with our CRM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="bg-gradient-primary shadow-elegant text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">C</span>
                </div>
                <span className="text-xl font-bold">CRM Pro</span>
              </div>
              <p className="text-muted-foreground">
                The modern CRM solution for growing businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><Link to="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/status" className="hover:text-foreground transition-colors">System Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CRM Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;