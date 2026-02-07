import { GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const education = [
  { period: "2025 – 2027", title: "M.Sc. Applied Data Science", institution: "SRM Institute of Science and Technology, Chennai" },
  { period: "2022 – 2025", title: "BCA", institution: "Veer Narmad South Gujarat University" },
  { period: "2021 – 2022", title: "XII (GSEB)", institution: "Gujarat Secondary & Higher Secondary Education Board" },
  { period: "2019 – 2020", title: "X (GSEB)", institution: "Gujarat Secondary & Higher Secondary Education Board" },
];

const certifications = [
  "RapidMiner Professional & Master — ML, Data Engineering, Applications & Use Cases, Platform Administration",
  "Virtual Internship — SRM Institute of Science and Technology (ML models, pipelines, applied business cases)",
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3 uppercase">
            Background
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Timeline */}
          <SectionReveal delay={0.1}>
            <motion.div
              className="glass-card rounded-2xl p-7 h-full transition-all duration-500"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={22} className="text-primary" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <div className="space-y-6 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                {education.map((e, i) => (
                  <motion.div
                    key={e.title}
                    className="flex gap-5 relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  >
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary shrink-0 mt-1 z-10"
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                    />
                    <div>
                      <p className="font-mono text-[10px] text-primary tracking-wider mb-1">
                        {e.period}
                      </p>
                      <p className="text-sm font-semibold text-foreground">{e.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{e.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </SectionReveal>

          {/* Certifications */}
          <SectionReveal delay={0.2}>
            <motion.div
              className="glass-card rounded-2xl p-7 h-full transition-all duration-500"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={22} className="text-primary" />
                <h3 className="text-lg font-semibold">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"
                      whileInView={{ scale: [0, 1.5, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15 }}
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">{c}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
