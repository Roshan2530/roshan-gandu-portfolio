import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingLines from "@/components/FloatingLines";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => {
    setLoading(false);
    window.scrollTo(0, 0);
  }, []);

  // Always reset to top on mount (every refresh)
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    setLoading(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-background text-foreground relative">
          <FloatingLines />
          <Navbar />
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
