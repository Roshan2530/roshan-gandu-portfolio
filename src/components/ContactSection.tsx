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
    label: "Chat on WhatsApp",
    value: "+91 9106394609",
    href: "https://wa.me/919106394609",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "roshanmodi761@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=roshanmodi761@gmail.com",
    external: true,
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
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-bold mb-14">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Contact Form */}
          <SectionReveal delay={0.1}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-7 md:p-8 space-y-5 transition-all duration-500"
              whileHover={{ boxShadow: "0 0 40px hsla(185, 80%, 55%, 0.08)" }}
            >
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                maxLength={100}
                className="bg-secondary/50 border-border/60 focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all h-12"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                maxLength={255}
                className="bg-secondary/50 border-border/60 focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all h-12"
              />
              <Textarea
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                required
                maxLength={1000}
                rows={5}
                className="bg-secondary/50 border-border/60 focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all resize-none"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full rounded-full h-12 bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300"
                >
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </SectionReveal>

          {/* Right: Contact Cards stacked */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-col gap-4">
              {contactCards.map(({ icon: Icon, label, href, external }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="glass-card rounded-xl px-6 py-5 flex items-center gap-5 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    y: -3,
                    boxShadow: "0 0 30px hsla(185, 80%, 55%, 0.15), 0 6px 24px hsla(185, 80%, 55%, 0.08)",
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.3)] transition-all duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
