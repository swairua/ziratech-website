import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Code, 
  Smartphone, 
  ShoppingCart,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Star,
  Users,
  Clock,
  TrendingUp,
  Building,
  Heart,
  GraduationCap,
  Briefcase,
  Rocket
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBookingModal from "@/components/DemoBookingModal";
import ContactZiraWeb from "@/components/ContactZiraWeb";
import webDevWorkspace from "@/assets/web-dev-workspace.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import responsiveMockup from "@/assets/responsive-mockup.jpg";

const ZiraWeb = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Beautiful, Responsive Design",
      description: "Mobile-first, lightning-fast, and elegantly on-brand websites that make unforgettable first impressions"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Functional by Default",
      description: "Contact forms, booking flows, integrated payments, newsletter sign-ups — all optimized to work hard for you"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Built to Grow With You",
      description: "Whether launching your first product or running complex digital business, we scale with your ambition"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Future-Ready",
      description: "SSL encryption, clean code, optimized performance — ready for SEO, social sharing, and integrations"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Modern Technology Stack",
      description: "Built with Lovable AI, Supabase backend, GitHub version control, and flexible hosting options"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "All Organization Types",
      description: "From small businesses to tech startups, education to healthcare — we serve ambitious brands across all sectors"
    }
  ];

  const sectors = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Small Businesses",
      description: "Websites with lead generation, booking tools, and integrations"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Professional Services", 
      description: "Portfolios, contact automation, resource hubs"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education",
      description: "School websites, student portals, e-learning integration"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Healthcare",
      description: "Clinic websites, intake forms, online scheduling"
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "E-commerce",
      description: "Stores with full checkout flows, shipping, and analytics"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Tech & SaaS",
      description: "Landing pages, user onboarding, documentation systems"
    }
  ];

  const portfolioHighlights = [
    {
      title: "E-commerce Platform",
      description: "Complete online marketplace with multi-vendor support",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      results: "300% increase in online sales"
    },
    {
      title: "Corporate Website",
      description: "Professional corporate site with CMS integration",
      technologies: ["WordPress", "Custom PHP", "MySQL"],
      results: "50% increase in lead generation"
    },
    {
      title: "SaaS Application",
      description: "Cloud-based project management platform",
      technologies: ["Vue.js", "Laravel", "AWS", "Redis"],
      results: "1000+ active users within 6 months"
    }
  ];

  const whyChooseZira = [
    {
      icon: <Clock className="h-8 w-8 text-brand-orange" />,
      title: "Fast Delivery",
      description: "Most projects completed within 2-4 weeks"
    },
    {
      icon: <Code className="h-8 w-8 text-brand-orange" />,
      title: "Modern Technology",
      description: "Built with the latest web technologies and best practices"
    },
    {
      icon: <Users className="h-8 w-8 text-brand-orange" />,
      title: "Dedicated Support",
      description: "Ongoing support and maintenance after launch"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-brand-orange" />,
      title: "Scalable Solutions",
      description: "Websites that grow with your business needs"
    }
  ];

  const testimonials = [
    {
      name: "Tech Startup Founder",
      text: "Zira built us a clean, modern site that made us look like a premium brand overnight.",
      rating: 5
    },
    {
      name: "Wellness Business Owner", 
      text: "The booking system they added helped us cut customer calls by 40% — everything just works.",
      rating: 5
    },
    {
      name: "Educational Director",
      text: "Our new student portal streamlined admissions and improved parent communication tremendously.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-orange/20 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              Modern Websites for Ambitious Brands
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-brand-orange bg-clip-text text-transparent">
              Zira Web
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Build a digital presence that reflects your vision. We design and develop stunning websites and web applications that elevate your brand, streamline your processes, and help you scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 text-lg"
                onClick={scrollToContact}
              >
                Build with Zira Web
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <img 
              src={webDevWorkspace} 
              alt="Modern web development workspace"
              className="w-64 h-40 object-cover rounded-lg shadow-2xl border border-white/20"
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-16 bg-brand-orange/20 backdrop-blur-sm rounded-lg border border-brand-orange/30 flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Zira Web?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We design and develop with real-world use in mind, creating digital experiences that work hard for ambitious brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <div className="text-brand-orange">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* We Serve All Types of Organizations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              We Serve All Types of Organizations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From startups to established businesses, education to healthcare — we build for ambitious brands across all sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sectors.map((sector, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <div className="text-brand-orange">
                      {sector.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{sector.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A clean, sleek showcase of work across sectors — responsive designs that drive results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioHighlights.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-brand-navy/10 to-brand-orange/10 flex items-center justify-center">
                  {index === 0 && <img src={responsiveMockup} alt="Responsive design showcase" className="w-full h-full object-cover" />}
                  {index === 1 && <img src={teamCollaboration} alt="Team collaboration" className="w-full h-full object-cover" />}
                  {index === 2 && <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-orange flex items-center justify-center"><Rocket className="h-16 w-16 text-white" /></div>}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-100 text-green-700">
                      {project.results}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* What Powers Our Builds */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Powers Our Builds
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern technology stack for secure, professional, and future-ready websites.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseZira.map((reason, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    {reason.icon}
                  </div>
                  <CardTitle className="text-lg">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from ambitious brands we've helped succeed online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-center italic">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <ContactZiraWeb />
      <Footer />
    </div>
  );
};

export default ZiraWeb;