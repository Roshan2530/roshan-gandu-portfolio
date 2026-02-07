import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*",
  className = "",
}: {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
}) => {
  const [displayed, setDisplayed] = useState(
    text.split("").map(() => characters[Math.floor(Math.random() * characters.length)])
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    const iterations = new Array(text.length).fill(0);
    const interval = setInterval(() => {
      setDisplayed((prev) =>
        prev.map((char, i) => {
          if (iterations[i] >= maxIterations) return text[i];
          iterations[i]++;
          return characters[Math.floor(Math.random() * characters.length)];
        })
      );
      if (iterations.every((it) => it >= maxIterations)) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters]);

  return (
    <span className={className}>
      {displayed.map((char, i) => (
        <span
          key={i}
          className={done && char === text[i] ? "" : "opacity-70"}
        >
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
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 1.5;
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

export default Preloader;
