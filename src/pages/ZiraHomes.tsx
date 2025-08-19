import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  DollarSign, 
  FileText, 
  Calendar, 
  Shield,
  CheckCircle,
  ArrowRight,
  BarChart3,
  KeyRound,
  Smartphone,
  Building,
  TrendingUp,
  Monitor,
  Phone,
  Mail,
  Video
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBookingModal from "@/components/DemoBookingModal";
import homesHero from "@/assets/zira-homes-dashboard.jpg";
import africanPersonMobile from "@/assets/african-person-mobile-estate.jpg";

const ZiraHomes = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Automated Rent Collection & Tracking",
      description: "Track payments, send automated reminders, and monitor late fees — perfect for busy diaspora landlords managing properties remotely."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Reports & Insights",
      description: "Comprehensive financial reporting and property analytics that busy professionals need to make informed investment decisions."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Lease & Expense Management",
      description: "Easily upload lease agreements and monitor recurring or usage-based expenses. Stay organized, always."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Reports & KPIs at Your Fingertips",
      description: "Understand your rental performance with real-time dashboards and downloadable reports."
    },
    {
      icon: <KeyRound className="h-6 w-6" />,
      title: "Remote Management Controls",
      description: "Assign roles, control permissions, and manage multiple properties seamlessly — ideal for investors managing portfolios from anywhere."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Global Access, Local Expertise",
      description: "Manage your Kenyan properties from London, Toronto, or anywhere. Built for the diaspora with local market knowledge and global accessibility."
    }
  ];

  const quickFeatures = [
    "Unlimited property & unit management",
    "Lease uploads & tracking",
    "Tenant onboarding with profession & employment info",
    "Rent & deposit logging",
    "Utility & service fee tracking",
    "Custom expense categories",
    "Notifications & alerts",
    "Role-based access control",
    "Secure cloud storage via Supabase",
    "Clean, modern UI/UX"
  ];

  const targetUsers = [
    "Landlords with 1 to 100+ units",
    "Property Managers managing for multiple owners",
    "Agents looking to streamline operations",
    "Housing Cooperatives & gated communities",
    "Commercial property owners needing hybrid lease tracking"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-orange/20 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
                Property Management Platform
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-brand-orange bg-clip-text text-transparent">
                Zira Homes
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Smarter Property Management. Built for Africa.
              </h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                From Kenya to the diaspora worldwide, Zira Homes revolutionizes property management for busy landlords 
                and investors. Whether you're managing rentals from London, Toronto, or right here in Nairobi, 
                our platform streamlines everything — tenant communication, rent collection, expense tracking, 
                and detailed reporting — all from one intuitive dashboard designed for today's global property owners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={scrollToContact}
                >
                  Start Managing Smarter Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <DemoBookingModal platform="Zira Homes">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-brand-navy px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all"
                  >
                    See Live Demo
                    <Video className="ml-2 h-5 w-5" />
                  </Button>
                </DemoBookingModal>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/6849846c-44dd-48b1-b784-df9410c87150.png" 
                alt="Zira Homes Dashboard" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent pointer-events-none" />
      </section>

      {/* Why Choose Zira Homes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Zira Homes?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Perfect for busy diaspora landlords and local property managers who need comprehensive insights, 
              automated operations, and seamless remote management capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center border-l-4 border-l-brand-orange">
                <CardHeader>
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <div className="text-brand-orange">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-brand-navy">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <div className="px-6 pb-6">
                  <DemoBookingModal platform="Zira Homes">
                    <Button 
                      className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-2"
                    >
                      Request Personalized Demo
                    </Button>
                  </DemoBookingModal>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features at a Glance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Features at a Glance
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools for modern property management across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickFeatures.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-3 flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is Zira Homes For */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Who Is Zira Homes For?
            </h2>
            <p className="text-xl text-muted-foreground">
              Perfect for property professionals across Africa and emerging markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {targetUsers.map((user, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-brand-navy" />
                </div>
                <p className="font-medium text-foreground">{user}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Mobile Friendly, Built for Growth
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Access your dashboard anywhere across Africa and beyond. From Nairobi to Lagos, Cape Town to Cairo, 
                you'll have the same smooth experience on desktop, tablet, or phone, even on 3G connections.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-orange mr-3" />
                  <span>Responsive design for all devices</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-orange mr-3" />
                  <span>Offline-capable for remote areas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-orange mr-3" />
                  <span>Built for African markets and connectivity</span>
                </div>
              </div>
              <div className="mt-8">
                <DemoBookingModal platform="Zira Homes">
                  <Button 
                    size="lg" 
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-3 text-lg font-semibold shadow-lg"
                  >
                    See Mobile Demo
                    <Smartphone className="ml-2 h-5 w-5" />
                  </Button>
                </DemoBookingModal>
              </div>
            </div>
            <div className="relative">
              <img 
                src={africanPersonMobile} 
                alt="African property manager using mobile app" 
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-brand-navy to-brand-orange">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join property managers across Africa and the diaspora who are revolutionizing their operations with Zira Homes. 
              Perfect for busy professionals managing rental properties remotely — get detailed insights, automate operations, 
              and stay connected with your investments from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-brand-navy hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToContact}
              >
                Get Started with Zira Homes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <DemoBookingModal platform="Zira Homes">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all"
                >
                  Schedule Live Demo
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </DemoBookingModal>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+254 757878023</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@ziratech.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ZiraHomes;