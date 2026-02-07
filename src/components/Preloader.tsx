import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

  // Intersection observer for "view" trigger
  useEffect(() => {
    if (animateOn !== "view" || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animateOn]);

  // Scramble + sequential reveal
  useEffect(() => {
    if (!started) return;

    const order = Array.from({ length: text.length }, (_, i) => i);
    if (revealDirection === "end") order.reverse();
    else if (revealDirection === "center") {
      const mid = Math.floor(text.length / 2);
      order.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    }

    // Scramble interval
    const scrambleInterval = setInterval(() => {
      setDisplayed((prev) =>
        prev.map((c, i) => {
          if (revealed[i] || text[i] === " ") return text[i];
          return getRandomChar();
        })
      );
    }, speed);

    // Sequential reveal
    let revealIndex = 0;
    const revealInterval = setInterval(() => {
      if (revealIndex >= order.length) {
        clearInterval(revealInterval);
        clearInterval(scrambleInterval);
        setDisplayed(text.split(""));
        return;
      }
      const idx = order[revealIndex];
      setRevealed((prev) => { const next = [...prev]; next[idx] = true; return next; });
      setDisplayed((prev) => { const next = [...prev]; next[idx] = text[idx]; return next; });
      revealIndex++;
    }, sequential ? speed * 1.5 : speed * 0.5);

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

const loadingMessages = [
  "Loading modules...",
  "Initializing components...",
  "Preparing workspace...",
  "Almost ready...",
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 0.75;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 800);
    return () => clearInterval(msgTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Top neon line */}
      <motion.div
        className="absolute top-[45%] left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--neon-purple)), hsl(var(--primary)), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <div className="relative z-10 text-center px-6 mt-8">
        <motion.p
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {">"} INITIALIZING...
        </motion.p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text neon-glow-text leading-tight">
          <DecryptedText
            text="Accessing Roshan's Workspace"
            speed={40}
            maxIterations={12}
            sequential
            revealDirection="start"
          />
        </h1>

        {/* Progress bar */}
        <div className="mt-8 w-48 mx-auto">
          <div className="h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--neon-teal)), hsl(var(--primary)))",
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <motion.p
          className="font-mono text-xs text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {loadingMessages[msgIndex]}
        </motion.p>
      </div>
    </motion.div>
  );
};

export { DecryptedText };
export default Preloader;
