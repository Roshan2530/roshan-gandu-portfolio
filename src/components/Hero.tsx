import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase"
        >
          Application Development & Data Science
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
        >
          Modi Roshan
          <br />
          <span className="gradient-text neon-glow-text">Dharmeshbhai</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Turning data into decisions and ideas into scalable applications with
          Flutter, Python & ML.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300"
          >
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-primary/40 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300"
          >
            <a href="#contact">Contact Me</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            <FileText size={16} className="mr-2" />
            Resume
          </Button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/roshanmodi25", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Roshan2530", label: "GitHub" },
            { icon: Mail, href: "mailto:roshanmodi761@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <a href="#about" className="inline-block text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
