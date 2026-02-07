import { useState } from "react";
import { Phone, Mail, Linkedin, Github, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionReveal from "./SectionReveal";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "+91 9106394609", href: "tel:+919106394609" },
  { icon: Mail, label: "roshanmodi761@gmail.com", href: "mailto:roshanmodi761@gmail.com" },
  { icon: Linkedin, label: "roshanmodi25", href: "https://www.linkedin.com/in/roshanmodi25" },
  { icon: Github, label: "Roshan2530", href: "https://github.com/Roshan2530" },
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <SectionReveal delay={0.1}>
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Feel free to reach out for collaborations, internship opportunities, or just a friendly chat about tech.
              </p>
              {contactInfo.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 6, scale: 1.02 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300"
                    whileHover={{ rotate: 10, boxShadow: "0 0 20px hsla(185, 80%, 55%, 0.3)" }}
                  >
                    <Icon size={18} className="text-primary" />
                  </motion.div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </SectionReveal>

          {/* Contact Form */}
          <SectionReveal delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-7 space-y-5 transition-all duration-500"
              whileHover={{ boxShadow: "0 0 40px hsla(185, 80%, 55%, 0.1)" }}
            >
              <div>
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  maxLength={100}
                  className="bg-secondary border-border focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all"
                />
              </div>
              <div>
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
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                  maxLength={1000}
                  rows={5}
                  className="bg-secondary border-border focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all resize-none"
                />
              </div>
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
      </div>
    </section>
  );
};

export default ContactSection;
