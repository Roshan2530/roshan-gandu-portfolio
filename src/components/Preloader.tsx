import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  animateOn?: "view" | "hover" | "mount";
  useOriginalCharsOnly?: boolean;
}

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}",
  className = "",
  sequential = true,
  revealDirection = "start",
  animateOn = "mount",
  useOriginalCharsOnly = false,
}: DecryptedTextProps) => {
  const charset = useOriginalCharsOnly
    ? [...new Set(text.split(""))].filter((c) => c !== " ")
    : characters.split("");

  const getRandomChar = () => charset[Math.floor(Math.random() * charset.length)];

  const [displayed, setDisplayed] = useState<string[]>(
    text.split("").map((c) => (c === " " ? " " : getRandomChar()))
  );
  const [revealed, setRevealed] = useState<boolean[]>(new Array(text.length).fill(false));
  const [started, setStarted] = useState(animateOn === "mount");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (animateOn !== "view" || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animateOn]);

  useEffect(() => {
    if (!started) return;
    const words: number[][] = [];
    let currentWord: number[] = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        if (currentWord.length) words.push(currentWord);
        currentWord = [];
      } else {
        currentWord.push(i);
      }
    }
    if (currentWord.length) words.push(currentWord);
    if (revealDirection === "end") words.reverse();

    const scrambleInterval = setInterval(() => {
      setDisplayed((prev) =>
        prev.map((c, i) => {
          if (revealed[i] || text[i] === " ") return text[i];
          return getRandomChar();
        })
      );
    }, speed);

    let wordIndex = 0;
    const wordDelay = Math.max(80, 2800 / words.length);
    const revealInterval = setInterval(() => {
      if (wordIndex >= words.length) {
        clearInterval(revealInterval);
        clearInterval(scrambleInterval);
        setDisplayed(text.split(""));
        return;
      }
      const indices = words[wordIndex];
      setRevealed((prev) => {
        const next = [...prev];
        indices.forEach((idx) => { next[idx] = true; });
        return next;
      });
      setDisplayed((prev) => {
        const next = [...prev];
        indices.forEach((idx) => { next[idx] = text[idx]; });
        return next;
      });
      wordIndex++;
    }, wordDelay);

    return () => { clearInterval(scrambleInterval); clearInterval(revealInterval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={animateOn === "hover" ? () => setStarted(true) : undefined}
    >
      {displayed.map((char, i) => (
        <span key={i} className={revealed[i] ? "opacity-100" : "opacity-60"}>
          {char}
        </span>
      ))}
    </span>
  );
};

/* ─── Animated ring for the logo ─── */
const NeonRing = ({ delay = 0, size = 160 }: { delay?: number; size?: number }) => (
  <motion.div
    className="absolute rounded-full border"
    style={{
      width: size,
      height: size,
      borderColor: "hsl(var(--primary) / 0.15)",
    }}
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{
      scale: [0.6, 1, 1.15],
      opacity: [0, 0.6, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "text" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 800);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "text") return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase("done"), 200);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 1.2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Radial glow behind logo */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--neon-purple)), transparent 70%)",
        }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-px"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-0 left-0 h-24 w-px"
        style={{ background: "linear-gradient(180deg, hsl(var(--primary)), transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-px"
        style={{ background: "linear-gradient(270deg, hsl(var(--neon-purple)), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-24 w-px"
        style={{ background: "linear-gradient(0deg, hsl(var(--neon-purple)), transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* Pulsing rings */}
      <div className="relative flex items-center justify-center">
        <NeonRing delay={0} size={180} />
        <NeonRing delay={0.8} size={220} />
        <NeonRing delay={1.6} size={260} />

        {/* RM Logo */}
        <motion.div
          className="relative w-28 h-28 rounded-3xl flex items-center justify-center border border-border/50"
          style={{
            background: "linear-gradient(135deg, hsl(var(--card)), hsl(var(--background)))",
            boxShadow: "0 0 60px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.05)",
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <motion.span
            className="text-4xl font-black tracking-tight gradient-text select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            RM
          </motion.span>

          {/* Orbiting dot */}
          <motion.div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "0 0 10px hsl(var(--primary) / 0.8)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            // Position the dot on the border path
            // Using a wrapper approach
          >
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "0 0 12px hsl(var(--primary))",
                top: -60,
                left: "50%",
                marginLeft: -4,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Text & Progress */}
      <AnimatePresence>
        {phase !== "logo" && (
          <motion.div
            className="mt-10 text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl sm:text-2xl font-bold gradient-text mb-2">
              <DecryptedText
                text="Roshan Modi"
                speed={40}
                maxIterations={10}
                sequential
                revealDirection="start"
              />
            </h1>

            <motion.p
              className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Application Dev & Data Scientist
            </motion.p>

            {/* Progress bar */}
            <div className="w-40 mx-auto">
              <div className="h-[2px] bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--neon-teal)), hsl(var(--primary)), hsl(var(--neon-purple)))",
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[9px] text-muted-foreground/60">LOADING</span>
                <span className="font-mono text-[9px] text-primary">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
        }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export { DecryptedText };
export default Preloader;
