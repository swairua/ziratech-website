import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Rocket, Heart, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    github: "",
    cv: null as File | null,
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in joining Zira Technologies. We'll review your application and get back to you soon."
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      portfolio: "",
      github: "",
      cv: null,
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      cv: file
    }));
  };

  const values = [
    {
      icon: <Target className="h-8 w-8 text-brand-orange" />,
      title: "Innovation First",
      description: "We push boundaries and embrace new technologies to solve real African challenges."
    },
    {
      icon: <Users className="h-8 w-8 text-brand-orange" />,
      title: "Collaborative Culture",
      description: "Great ideas come from diverse minds working together towards a common vision."
    },
    {
      icon: <Rocket className="h-8 w-8 text-brand-orange" />,
      title: "Growth Mindset",
      description: "We invest in our people's development and celebrate continuous learning."
    },
    {
      icon: <Heart className="h-8 w-8 text-brand-orange" />,
      title: "Impact Driven",
      description: "Every line of code we write has the potential to transform an African business."
    }
  ];

  const openPositions = [
    {
      title: "Full Stack Developer",
      type: "Full-time",
      location: "Nairobi, Kenya",
      description: "Build and maintain our platform suite using React, Node.js, and modern web technologies."
    },
    {
      title: "Product Manager",
      type: "Full-time", 
      location: "Nairobi, Kenya",
      description: "Drive product strategy and work closely with engineering to deliver exceptional user experiences."
    },
    {
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Remote/Nairobi",
      description: "Scale our infrastructure and ensure our platforms run smoothly for thousands of users."
    },
    {
      title: "Business Development",
      type: "Full-time",
      location: "Nairobi, Kenya", 
      description: "Help expand our reach across African markets and build strategic partnerships."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy-dark">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-white/60 hover:text-white/80 mb-8 transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="max-w-4xl mx-auto text-center">
              
              <Badge variant="secondary" className="mb-8 px-6 py-3 text-white bg-brand-orange border-0 shadow-lg font-semibold text-sm tracking-wide uppercase">
                Join Our Team
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Build the Future of
                <span className="text-brand-orange"> African Tech</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Join a passionate team that's revolutionizing how African businesses operate. 
                We're building platforms that will power the next generation of digital transformation across the continent.
              </p>
            </div>
          </div>
        </section>

        {/* Why Zira */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Why Work at Zira?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be part of a mission-driven team that's making a real impact on African businesses every day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-brand-navy mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Always Hiring */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">We're Always Hiring</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're constantly looking for talented individuals to join our growing team. While we may not have specific openings listed right now, we're always interested in connecting with passionate people who want to make an impact on African businesses.
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-brand-orange">
                <h3 className="text-xl font-semibold text-brand-navy mb-4">What We Look For</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-2">Technical Roles</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Full Stack Developers</li>
                      <li>• Frontend/Backend Specialists</li>
                      <li>• DevOps Engineers</li>
                      <li>• Mobile App Developers</li>
                      <li>• Data Engineers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-2">Business Roles</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Product Managers</li>
                      <li>• Business Development</li>
                      <li>• Marketing Specialists</li>
                      <li>• Customer Success</li>
                      <li>• Sales Representatives</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-brand-navy font-medium mt-8">
                Submit your application below and we'll keep you in mind for future opportunities that match your skills.
              </p>
            </div>
          </div>
        </section>

        {/* Email Application */}
        <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Team?</h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We'd love to hear from you! Send us your application via email and let's start a conversation about your future at Zira.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange rounded-2xl mb-6">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Send Your Application</h3>
                  <div className="bg-brand-orange/20 rounded-xl p-6 mb-8">
                    <p className="text-xl font-semibold text-brand-orange mb-2">careers@ziratech.com</p>
                    <p className="text-white/80 text-sm">We respond within 6 hours during business hours</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">📧 What to Include in Your Email</h4>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Your full name and contact information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Position you're interested in</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Years of relevant experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Portfolio/LinkedIn/GitHub links</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">📎 Required Attachments</h4>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Updated CV/Resume (PDF format)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Cover letter explaining your interest</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-orange mr-2">•</span>
                        <span>Any relevant work samples (optional)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">💡 Email Subject Line</h4>
                  <p className="text-white/80 text-sm mb-2">Use this format for faster processing:</p>
                  <div className="bg-brand-navy/50 rounded-lg p-3 font-mono text-brand-orange text-sm">
                    "Application: [Position Name] - [Your Full Name]"
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Example: "Application: Full Stack Developer - John Doe"
                  </p>
                </div>

                <div className="mt-8">
                  <Button 
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.location.href = 'mailto:careers@ziratech.com?subject=Application: [Position Name] - [Your Full Name]'}
                  >
                    Open Email Client
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-white/60 text-sm mt-4">
                    We review all applications carefully and will get back to you within one week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;