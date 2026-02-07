import { useEffect, useRef } from "react";

const FloatingLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const lines = 5;
    const waves = 3;
    const colors = [
      ["rgba(0,210,190,0.4)", "rgba(0,180,220,0.3)"],
      ["rgba(60,140,255,0.35)", "rgba(130,80,255,0.25)"],
      ["rgba(0,200,200,0.3)", "rgba(100,60,255,0.2)"],
    ];

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let wave = 0; wave < waves; wave++) {
        const baseY = h * (0.3 + wave * 0.25);
        const speed = 0.0003 + wave * 0.0001;
        const amplitude = 60 + wave * 20;

        for (let line = 0; line < lines; line++) {
          const offset = line * 12;
          const t = time * speed;

          ctx.beginPath();
          const gradient = ctx.createLinearGradient(0, 0, w, 0);
          gradient.addColorStop(0, colors[wave][0]);
          gradient.addColorStop(0.5, colors[wave][1]);
          gradient.addColorStop(1, colors[wave][0]);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.6 - line * 0.08;

          for (let x = 0; x <= w; x += 4) {
            const normalX = x / w;
            const mouseInfluence =
              Math.exp(-Math.pow((normalX - mx) * 3, 2)) *
              Math.exp(-Math.pow(((baseY + offset) / h - my) * 3, 2)) *
              30;

            const y =
              baseY +
              offset +
              Math.sin(normalX * 4 + t + wave) * amplitude +
              Math.sin(normalX * 2 + t * 1.5) * (amplitude * 0.5) +
              Math.cos(normalX * 6 + t * 0.7 + line) * 15 +
              mouseInfluence * Math.sin(t * 2);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: "screen" }}
    />
  );
};

export default FloatingLines;
