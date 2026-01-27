

"use client";

import { motion } from "framer-motion";
import StableBeam from "./PrecisionBeam";
import IconNode from "./IconNode";
import { Expressjs, JWT, MongoDB, Nextjs, Nodejs, PostgreSQL, Prisma, React, Redis, Redux, Threejs, TypeScript } from "./icons";


export const CHIP_POS = { x: 50, y: 50 };

const LEFT_STACK = [
  { name: "JWT", color: "#d63aff", x: 25, y: 22, svg: <JWT/> },
  { name: "Express", color: "#ffffff", x: 18, y: 32, svg: <Expressjs className="text-white"/> },
  { name: "MongoDB", color: "#47A248", x: 10, y: 42, svg: <MongoDB/> },
  { name: "Mongoose", color: "#880000", x: 16, y: 52, svg: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" fill="currentColor"/> },
  { name: "Redis", color: "#DC382D", x: 8, y: 62, svg: <Redis/> },
  { name: "Postgres", color: "#336791", x: 15, y: 72, svg: <PostgreSQL/> },
  { name: "Prisma", color: "#5a67d8", x: 22, y: 82, svg: <Prisma/> },
];

const RIGHT_STACK = [
  { name: "Redux", color: "#764ABC", x: 75, y: 22, svg: <Redux/> },
  { name: "Next.js", color: "#ffffff", x: 82, y: 32, svg: <Nextjs/> },
  { name: "React", color: "#61DAFB", x: 90, y: 42, svg: <React/> },
  { name: "Axios", color: "#5A29E4", x: 84, y: 52, svg: <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" fill="currentColor"/> },
  { name: "Tanstack", color: "#FF4154", x: 92, y: 62, svg: <Threejs/> },
  { name: "GSAP", color: "#88CE02", x: 85, y: 72, svg: <path d="M12 2l10 10-10 10L2 12z" fill="currentColor"/> },
  { name: "Three.js", color: "#ffffff", x: 78, y: 82, svg: <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor"/> },
];




export default function Motherboard() {
  return (
    <div className="relative h-screen w-full  overflow-hidden flex items-center justify-center perspective-[1500px]">
      
      {/* 3D WRAPPER */}
      <div 
        style={{ transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(0.75)` }}
        className="absolute top-[48%] left-[50%] h-175 w-325" 
      >
        <div className="relative h-full w-full bg-[#050505]/60 border border-white/5 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,1)]">
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-5 bg-size-[60px_60px]" />

          {/* BEAMS */}
          <StableBeam tech={{ x: 50, y: 18, color: "#3178c6" }} index={0} side="top" totalInSide={1} />
          <StableBeam tech={{ x: 50, y: 82, color: "#339933" }} index={0} side="bottom" totalInSide={1} />
          {LEFT_STACK.map((t, i) => <StableBeam key={i} tech={t} index={i} side="left" totalInSide={LEFT_STACK.length} />)}
          {RIGHT_STACK.map((t, i) => <StableBeam key={i} tech={t} index={i} side="right" totalInSide={RIGHT_STACK.length} />)}

          {/* JS CHIP WITH RESTORED PINS */}
          <motion.div 
            style={{ left: `${CHIP_POS.x}%`, top: `${CHIP_POS.y}%` }} 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute h-[15%] w-[11%] -translate-x-1/2 -translate-y-1/2 z-50 rounded-sm border-2 border-yellow-500 bg-black flex flex-col items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)]"
          >
            <span className="text-[7px] uppercase tracking-tighter text-zinc-500 font-bold mb-1">Controller</span>
            <span className="text-3xl font-black text-yellow-500 italic">JS</span>
            
            {/* SIDE PINS (RESTORED) */}
            <div className="absolute -left-2 h-full py-2 flex flex-col justify-around">
              {LEFT_STACK.map((_, i) => <div key={i} className="h-1 w-2 bg-zinc-400 rounded-full shadow-[0_0_5px_white]" />)}
            </div>
            <div className="absolute -right-2 h-full py-2 flex flex-col justify-around">
              {RIGHT_STACK.map((_, i) => <div key={i} className="h-1 w-2 bg-zinc-400 rounded-full shadow-[0_0_5px_white]" />)}
            </div>
            {/* TOP/BOTTOM PINS */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-1 bg-zinc-400 rounded-full shadow-[0_0_5px_white]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-1 bg-zinc-400 rounded-full shadow-[0_0_5px_white]" />
          </motion.div>

          {/* TECH NODES */}
          <IconNode tech={{ name: "TS", color: "#3178c6", x: 50, y: 18, svg: <TypeScript/> }} side="top" />
          <IconNode tech={{ name: "Node", color: "#339933", x: 50, y: 82, svg: <Nodejs/> }} side="bottom" />
          {LEFT_STACK.map((t, i) => <IconNode key={i} tech={t} side="left" />)}
          {RIGHT_STACK.map((t, i) => <IconNode key={i} tech={t} side="right" />)}
        </div>
      </div>
    </div>
  );
}

// --- 4. GLASS ICON NODE ---
