import { BarChart3, Cpu, Smartphone, Database } from "lucide-react";
import SectionReveal from "./SectionReveal";

const chips = [
  { icon: BarChart3, label: "Data Analytics" },
  { icon: Cpu, label: "ML Fundamentals" },
  { icon: Smartphone, label: "Flutter Development" },
  { icon: Database, label: "Backend & Databases" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Crafting Digital <span className="gradient-text">Experiences</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="glass-card rounded-2xl p-8 md:p-10 transition-all duration-500">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
              I'm an M.Sc. Applied Data Science student passionate about
              building impactful applications and uncovering insights from data.
              My interests span analytics, machine learning fundamentals,
              Flutter app development, backend engineering, and database
              management. I thrive at the intersection of data and development —
              turning complex problems into elegant, scalable solutions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {chips.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-300"
                >
                  <Icon size={20} className="text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default AboutSection;
