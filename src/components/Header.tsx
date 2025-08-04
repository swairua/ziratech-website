import { Button } from "@/components/ui/button";
import { Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "There was an error signing out. Please try again.",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    
    // If we're on home page, scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/zira-logo-small.webp"
              alt="Zira Technologies Logo"
              className="w-10 h-10"
            />
            <div>
              <span className="text-xl font-bold text-brand-navy">Zira</span>
              <span className="text-sm text-muted-foreground block leading-tight">Technologies</span>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-muted-foreground hover:text-brand-navy transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('platforms')}
              className="text-muted-foreground hover:text-brand-navy transition-colors font-medium"
            >
              Platforms
            </button>
            <button 
              onClick={() => scrollToSection('impact')}
              className="text-muted-foreground hover:text-brand-navy transition-colors font-medium"
            >
              Impact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-brand-navy transition-colors font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => {
                navigate('/careers');
                setTimeout(() => window.scrollTo(0, 0), 100);
              }}
              className="text-muted-foreground hover:text-brand-navy transition-colors font-medium"
            >
              Careers
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline text-sm text-muted-foreground">
                  Welcome back
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="hidden md:inline-flex"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                onClick={() => scrollToSection('contact')}
                className="hidden md:inline-flex bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6"
              >
                Start Building
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground hover:text-brand-navy transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('platforms')}
                className="text-left text-foreground hover:text-brand-navy transition-colors"
              >
                Platforms
              </button>
              <button 
                onClick={() => scrollToSection('impact')}
                className="text-left text-foreground hover:text-brand-navy transition-colors"
              >
                Impact
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-brand-navy transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => {
                  navigate('/careers');
                  setTimeout(() => window.scrollTo(0, 0), 100);
                  setIsMenuOpen(false);
                }}
                className="text-left text-foreground hover:text-brand-navy transition-colors"
              >
                Careers
              </button>
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full mt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="cta" 
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-4"
                >
                  Get Started
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
