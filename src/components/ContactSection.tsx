import { useState } from "react";
import { Mail, Linkedin, Github, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionReveal from "./SectionReveal";
import { useToast } from "@/hooks/use-toast";

const contactCards = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 9106394609",
    href: "https://wa.me/919106394609",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "roshanmodi761@gmail.com",
    href: "mailto:roshanmodi761@gmail.com",
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "roshanmodi25",
    href: "https://www.linkedin.com/in/roshanmodi25",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Roshan2530",
    href: "https://github.com/Roshan2530",
    external: true,
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </SectionReveal>

        {/* Contact Cards Row */}
        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {contactCards.map(({ icon: Icon, label, value, href, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: "0 0 35px hsla(185, 80%, 55%, 0.2), 0 8px 32px hsla(185, 80%, 55%, 0.1)",
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300"
                  whileHover={{ rotate: 8, boxShadow: "0 0 20px hsla(185, 80%, 55%, 0.35)" }}
                >
                  <Icon size={22} className="text-primary" />
                </motion.div>
                <span className="text-xs font-mono tracking-wider text-primary uppercase">{label}</span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all">
                  {value}
                </span>
              </motion.a>
            ))}
          </div>
        </SectionReveal>

        {/* Contact Form */}
        <SectionReveal delay={0.2}>
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-7 md:p-10 space-y-5 max-w-2xl mx-auto transition-all duration-500"
            whileHover={{ boxShadow: "0 0 40px hsla(185, 80%, 55%, 0.1)" }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                maxLength={100}
                className="bg-secondary border-border focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                maxLength={255}
                className="bg-secondary border-border focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all"
              />
            </div>
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              required
              maxLength={1000}
              rows={5}
              className="bg-secondary border-border focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all resize-none"
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ContactSection;
