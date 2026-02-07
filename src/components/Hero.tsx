import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.03,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const firstName = "Modi Roshan";
  const lastName = "Dharmeshbhai";

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20 overflow-hidden"
    >
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase"
        >
          Application Development & Data Science
        </motion.p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
          style={{ perspective: "600px" }}
        >
          <span className="inline-block">
            {firstName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <br />
          <span className="gradient-text neon-glow-text inline-block">
            {lastName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i + firstName.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Turning data into decisions and ideas into scalable applications with Flutter, Python & ML.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button asChild size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300">
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/40 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300">
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button asChild size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
              <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                <FileText size={16} className="mr-2" />
                Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          {[
            { icon: Linkedin, href: "https://www.linkedin.com/in/roshanmodi25", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Roshan2530", label: "GitHub" },
            { icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=roshanmodi761@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
