import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Platforms />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
