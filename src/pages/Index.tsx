import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DatabaseStatus } from "@/components/DatabaseStatus";

const Index = () => {
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {isDevelopment && (
        <div className="fixed top-20 right-4 z-40">
          <DatabaseStatus />
        </div>
      )}
      <Hero />
      <Platforms />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
