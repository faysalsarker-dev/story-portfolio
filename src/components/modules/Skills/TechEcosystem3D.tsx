

"use client";

import React, { useRef, useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- 1. THE SMOOTH BEAM COMPONENT ---
const MagicBeam = ({ containerRef, fromRef, toRef, color, delay = 0 }) => {
  const [path, setPath] = useState("");
  const id = useId();

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const c = containerRef.current.getBoundingClientRect();
        const f = fromRef.current.getBoundingClientRect();
        const t = toRef.current.getBoundingClientRect();

        const startX = f.left - c.left + f.width / 2;
        const startY = f.top - c.top + f.height / 2;
        const endX = t.left - c.left + t.width / 2;
        const endY = t.top - c.top + t.height / 2;

        // Tight orthogonal routing: Move 30% X, then full Y, then remaining X
        const midX = startX + (endX - startX) * 0.3;
        setPath(`M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`);
      }
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [containerRef, fromRef, toRef]);

  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      {/* High-Visibility Base Line (Always visible white) */}
      <path 
        d={path} 
        fill="none" 
        stroke="white" 
        strokeWidth="1.5" 
        className="opacity-20" 
      />
      
      {/* The Magic UI Style Animated Beam */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1], 
          opacity: [0, 1, 0],
          pathOffset: [0, 1] 
        }}
        transition={{
          duration: 4, // Slower, magical spread
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        }}
      />
      <defs>
        <linearGradient id={`gradient-${id}`} gradientUnits="userSpaceOnUse">
          <stop stopColor="transparent" />
          <stop stopColor={color} offset="0.5" />
          <stop stopColor="transparent" offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// --- 2. THE SHINE NODE COMPONENT ---
const TechNode = React.forwardRef(({ children, style, color, delay = 0 }, ref) => {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={style}>
      <motion.div
        ref={ref}
        animate={{ 
          borderColor: ["rgba(255,255,255,0.2)", color, "rgba(255,255,255,0.2)"],
          boxShadow: ["0 0 0px transparent", `0 0 15px ${color}33`, "0 0 0px transparent"],
          backgroundColor: ["rgba(0,0,0,0.5)", "rgba(255,255,255,0.05)", "rgba(0,0,0,0.5)"]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: delay + 2 }}
        className="flex h-8 min-w-[70px] items-center justify-center rounded border bg-zinc-950 px-2 font-mono text-[9px] font-bold text-zinc-200 backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </div>
  );
});
TechNode.displayName = "TechNode";

// --- 3. MAIN SECTION ---
export default function UltimateMotherboard() {
  const containerRef = useRef(null);
  const jsRef = useRef(null);

  const stack = [
    // Top/Bottom Center
    { name: "TypeScript", color: "#3178c6", pos: { top: "25%", left: "50%" }, delay: 0 },
    { name: "Node.js", color: "#339933", pos: { top: "75%", left: "50%" }, delay: 1.5 },
    
    // Left Side (Inner Cluster)
    { name: "Express.js", color: "#fff", pos: { top: "35%", left: "30%" }, delay: 0.5 },
    { name: "Postgres", color: "#336791", pos: { top: "45%", left: "20%" }, delay: 1.2 },
    { name: "Prisma", color: "#2D3748", pos: { top: "55%", left: "30%" }, delay: 0.8 },
    { name: "MongoDB", color: "#47A248", pos: { top: "65%", left: "15%" }, delay: 2.1 },
    
    // Left Side (Outer Edge)
    { name: "JWT", color: "#d63aff", pos: { top: "20%", left: "15%" }, delay: 0.3 },
    { name: "Redis", color: "#DC382D", pos: { top: "80%", left: "10%" }, delay: 1.9 },
    { name: "Mongoose", color: "#880000", pos: { top: "50%", left: "5%" }, delay: 3.0 },

    // Right Side (Inner Cluster)
    { name: "Next.js", color: "#fff", pos: { top: "35%", left: "70%" }, delay: 0.2 },
    { name: "React.js", color: "#61DAFB", pos: { top: "45%", left: "80%" }, delay: 1.1 },
    { name: "Tanstack", color: "#FF4154", pos: { top: "55%", left: "70%" }, delay: 0.6 },
    { name: "Three.js", color: "#fff", pos: { top: "65%", left: "85%" }, delay: 1.4 },
    
    // Right Side (Outer Edge)
    { name: "Axios", color: "#5A29E4", pos: { top: "20%", left: "85%" }, delay: 0.9 },
    { name: "GSAP", color: "#88CE02", pos: { top: "50%", left: "95%" }, delay: 2.5 },
    { name: "Redux", color: "#764ABC", pos: { top: "80%", left: "90%" }, delay: 1.7 },
  ];

  return (
    <div ref={containerRef} className="relative h-[600px] w-full bg-[#020202] overflow-hidden p-10">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:30px_30px]" />

      {/* JavaScript Center CPU */}
      <div 
        ref={jsRef}
        className="absolute left-1/2 top-1/2 z-50 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border-2 border-yellow-500 bg-black text-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
      >
        <span className="text-lg font-black tracking-tighter">JS</span>
      </div>

      {/* Render connections and nodes together to maintain ref context */}
      {stack.map((tech) => (
        <TechNodeGroup key={tech.name} tech={tech} jsRef={jsRef} containerRef={containerRef} />
      ))}
    </div>
  );
}

const TechNodeGroup = ({ tech, jsRef, containerRef }) => {
  const nodeRef = useRef(null);
  return (
    <>
      <MagicBeam 
        containerRef={containerRef} 
        fromRef={jsRef} 
        toRef={nodeRef} 
        color={tech.color} 
        delay={tech.delay} 
      />
      <TechNode ref={nodeRef} style={tech.pos} color={tech.color} delay={tech.delay}>
        {tech.name}
      </TechNode>
    </>
  );
};