import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function RealisticCard({
  title = "Realistic Neon Card",
  subtitle = "powered by meb",
  children,
  className = "",
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, mx: 0.5, my: 0.5, active: false });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mx = x / rect.width;
    const my = y / rect.height;
    setPos({ x, y, mx, my, active: true });
  };

  const onLeave = () => setPos((p) => ({ ...p, active: false }));

  const rotateX = (0.5 - pos.my) * 45;
  const rotateY = (pos.mx - 0.5) * 25;
  const scale = pos.active ? 0.97 : 1;
  const pressDX = (pos.mx - 0.5) * 40;
  const pressDY = (pos.my - 0.5) * 40;

  const cardStyle = {
    "--x": `${pos.x}px`,
    "--y": `${pos.y}px`,
    boxShadow: pos.active
      ? `${-pressDX}px ${-pressDY}px 60px rgba(0,0,0,0.65) inset, 0 25px 50px rgba(0,0,0,0.4)`
      : "0 12px 30px rgba(0,0,0,0.25)",
    background: pos.active
      ? `
        radial-gradient(220px circle at var(--x) var(--y), rgba(99,102,241,0.35), rgba(99,102,241,0) 45%),
        radial-gradient(480px circle at var(--x) var(--y), rgba(14,165,233,0.20), rgba(14,165,233,0) 60%),
        linear-gradient(180deg, rgba(17,24,39,1), rgba(15,23,42,1))
      `
      : `linear-gradient(180deg, rgba(17,24,39,1), rgba(15,23,42,1))`,
  };

 

  return (
    <div className={`relative p-0 ${className} mt-32 `}>
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-2xl blur-sm"
        style={borderStyle}
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onMove}
        onMouseLeave={onLeave}
        style={cardStyle}
        className="relative z-10 w-[50%] rounded-2xl bg-gray-900/80 backdrop-blur p-5 md:p-6"
        animate={{
          rotateX: pos.active ? rotateX : 0,
          rotateY: pos.active ? rotateY : 0,
          scale: scale,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            left: `var(--x)`,
            top: `var(--y)`,
            background:
              "radial-gradient(120px circle, rgba(59,130,246,0.35), transparent 70%)",
          }}
          animate={{
            width: pos.active ? 260 : 0,
            height: pos.active ? 260 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-white/60">{subtitle}</p>
          <div className="mt-4 text-sm md:text-base text-white/80">
            {children ?? (
              <p>
                Hover karo — card tilt hoga, press feel aayegi, neon border glow
                follow karega. Bilkul realistic portfolio card.
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-white/40">
            powered by <b className="text-white/70">meb</b>
          </span>
          <span className="text-xs text-white/50">React + Tailwind</span>
        </div>
      </motion.div>
    </div>
  );
}

