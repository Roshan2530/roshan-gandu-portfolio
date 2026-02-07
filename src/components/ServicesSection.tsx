import { Smartphone, Server, BarChart3, GraduationCap } from "lucide-react";
import SectionReveal from "./SectionReveal";

const services = [
  { icon: Smartphone, title: "Flutter App Development", desc: "Cross-platform mobile apps with beautiful UI and smooth performance." },
  { icon: Server, title: "Backend Development", desc: "Scalable server-side solutions with Flask, Firebase, and SQL databases." },
  { icon: BarChart3, title: "Data Analytics", desc: "Data cleaning, EDA, visualization, and actionable business insights." },
  { icon: GraduationCap, title: "Student / Internship-Ready", desc: "Eager to contribute, learn fast, and deliver production-quality work." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <SectionReveal key={title} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-7 transition-all duration-500 group hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
