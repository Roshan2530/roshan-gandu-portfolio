import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import useActiveSection from "@/hooks/useActiveSection";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

const sectionIds = navLinks.map((l) => l.href);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.5]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `hsla(220, 20%, 4%, ${v})`),
        borderColor: useTransform(borderOpacity, (v) => `hsla(220, 15%, 15%, ${v})`),
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#home"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-teal to-neon-purple flex items-center justify-center text-sm font-bold text-primary-foreground">
            RM
          </div>
          <span className="text-sm font-medium tracking-wider text-foreground">
            RM | <span className="text-muted-foreground">Insights</span>
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <motion.a
                key={link.href}
                href={`#${link.href}`}
                className={`relative text-sm transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                  initial={false}
                  animate={{
                    width: isActive ? "100%" : "0%",
                    boxShadow: isActive
                      ? "0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary) / 0.4)"
                      : "none",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
              </motion.a>
            );
          })}
        </div>

        <button
          className="md:hidden text-foreground relative z-50 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm transition-colors ${
                    active === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
