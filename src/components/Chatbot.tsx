import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (e: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || `Error ${resp.status}`);
      return;
    }
    if (!resp.body) { onError("No response body"); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") break;
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Connection failed");
  }
}

const TypingDots = () => (
  <div className="flex gap-1.5 items-center px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-primary/60"
        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const SUGGESTIONS = [
  "Who is Roshan?",
  "What are his skills?",
  "Tell me about his projects",
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: msg };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: newMsgs,
      onDelta: upsert,
      onDone: () => setLoading(false),
      onError: (err) => {
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${err}` }]);
        setLoading(false);
      },
    });
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
        style={{
          background: "linear-gradient(135deg, hsl(var(--neon-teal)), hsl(var(--neon-purple)))",
          boxShadow: open
            ? "0 0 0px transparent"
            : "0 0 30px hsla(var(--neon-cyan), 0.4), 0 0 60px hsla(var(--neon-purple), 0.2)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 40px hsla(185, 90%, 55%, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        animate={open ? { rotate: 90 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-background" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} className="text-background" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-[100px] right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] rounded-3xl flex flex-col overflow-hidden border border-border/50"
            style={{
              background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
              boxShadow: "0 25px 80px -20px hsla(var(--neon-cyan), 0.15), 0 0 1px hsla(var(--neon-cyan), 0.3)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-neon)" }} />
              <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--neon-teal)), hsl(var(--neon-purple)))" }}>
                <Sparkles size={18} className="text-background" />
              </div>
              <div className="relative flex-1">
                <p className="text-sm font-bold text-foreground tracking-tight">RM Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-[10px] text-muted-foreground">Online • AI Powered</p>
                </div>
              </div>
              {messages.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMessages([])}
                  className="relative w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 size={14} />
                </motion.button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 pb-4"
                >
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--neon-teal) / 0.15), hsl(var(--neon-purple) / 0.15))" }}>
                    <Bot size={28} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">Hey there! 👋</p>
                    <p className="text-xs text-muted-foreground mt-1">Ask me anything, I'm here to help.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {SUGGESTIONS.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => send(s)}
                        className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, hsl(var(--neon-teal) / 0.2), hsl(var(--neon-purple) / 0.2))" }}>
                      <Bot size={13} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-lg text-primary-foreground"
                        : "rounded-2xl rounded-bl-lg bg-secondary/60 text-foreground backdrop-blur-sm"
                    }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg, hsl(var(--neon-teal)), hsl(var(--neon-blue)))" } : undefined}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:mb-1 [&_p]:mt-0 [&_code]:text-primary [&_code]:bg-secondary/80 [&_code]:px-1 [&_code]:rounded">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <User size={13} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--neon-teal) / 0.2), hsl(var(--neon-purple) / 0.2))" }}>
                    <Bot size={13} className="text-primary" />
                  </div>
                  <div className="bg-secondary/60 rounded-2xl rounded-bl-lg px-4 py-3 backdrop-blur-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/30">
              <div className="flex gap-2 items-end bg-secondary/40 rounded-2xl px-3 py-2 border border-border/40 focus-within:border-primary/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none max-h-20 py-1"
                  maxLength={500}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="h-8 w-8 shrink-0 rounded-xl transition-all disabled:opacity-30"
                  style={{ background: "linear-gradient(135deg, hsl(var(--neon-teal)), hsl(var(--neon-blue)))" }}
                >
                  <Send size={14} className="text-background" />
                </Button>
              </div>
              <p className="text-[9px] text-muted-foreground/50 text-center mt-2">Powered by AI • Responses may be inaccurate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
