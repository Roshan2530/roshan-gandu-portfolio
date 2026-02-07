import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

interface SkillGroup {
  title: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  { title: "Primary", skills: ["Data Analytics", "Python", "ML Basics", "Flutter", "Databases", "Backend"] },
  { title: "Programming", skills: ["Python", "Java", "C", "C++", "R"] },
  { title: "Web", skills: ["HTML", "CSS", "PHP"] },
  { title: "Databases", skills: ["SQL", "MySQL"] },
  { title: "Data Science", skills: ["Data Cleaning", "EDA", "Statistics", "RapidMiner"] },
  { title: "ML Basics", skills: ["Linear Regression", "Logistic Regression", "KNN", "Decision Trees"] },
  { title: "Visualization", skills: ["Tableau", "Power BI"] },
  { title: "Tools", skills: ["Adobe Photoshop", "Adobe Premiere Pro"] },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <SectionReveal key={group.title} delay={i * 0.05}>
              <motion.div
                className="glass-card rounded-2xl p-6 h-full transition-all duration-500 group"
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + j * 0.04, duration: 0.3 }}
                      whileHover={{ scale: 1.1, backgroundColor: "hsla(185, 80%, 55%, 0.15)" }}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground group-hover:border-primary/20 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
