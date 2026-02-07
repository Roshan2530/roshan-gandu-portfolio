import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface Project {
  title: string;
  tagline: string;
  details: string[];
  tech: string[];
  shareUrl?: string;
  youtubeEmbed?: string;
}

const projects: Project[] = [
  {
    title: "SafeX – Emergency Management System",
    tagline: "Flutter emergency alert app with IoT & GPS real-time tracking",
    details: [
      "Real-time emergency alerts with IoT sensor integration",
      "GPS-based tracking for automated routing to nearby emergency services",
      "Multi-module architecture with Flask backend and MySQL database",
    ],
    tech: ["Flutter", "Flask", "MySQL", "IoT", "GPS", "Arduino", "PHP"],
    shareUrl: "https://github.com/Roshan2530/SafeX_",
  },
  {
    title: "Smart Rain Detection System",
    tagline: "IoT-based rain sensor automation for roof/window protection",
    details: [
      "Automated rain detection using Arduino and rain sensors",
      "Motor control system for roof and window protection",
      "Real-time monitoring and instant response mechanism",
    ],
    tech: ["Arduino Uno", "Rain Sensor", "DC Motor"],
    youtubeEmbed: "https://www.youtube.com/embed/ZYYZWtk_J_o?si=7jGn2nPfLJbavnvS",
  },
  {
    title: "RD Tours & Travels",
    tagline: "Flutter-based tour booking application with Admin & User modules",
    details: [
      "Full-featured booking system with Admin and User panels",
      "Razorpay payment integration for seamless transactions",
      "Firebase backend with WhatsApp inquiry support",
    ],
    tech: ["Flutter", "Firebase", "Razorpay"],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <SectionReveal delay={index * 0.1}>
      <motion.div
        className="glass-card rounded-2xl overflow-hidden transition-all duration-500"
        whileHover={{ scale: 1.01, y: -4, boxShadow: "0 0 40px hsla(185, 80%, 55%, 0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              {project.shareUrl && (
                <a
                  href={project.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="shrink-0 mt-1 text-muted-foreground"
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50 pt-5 space-y-5">
                <ul className="space-y-3">
                  {project.details.map((d, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {d}
                    </motion.li>
                  ))}
                </ul>

                {project.youtubeEmbed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative w-full rounded-xl overflow-hidden border border-border/50"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={project.youtubeEmbed}
                      title="Project Demo Video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionReveal>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </SectionReveal>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
