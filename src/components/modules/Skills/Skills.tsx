

"use client";

import {  useRef } from "react";
import gsap ,{useGSAP} from "@/lib/gsap";


export const FRONTEND = [
  { name: "Next.js 15", category: "Core" },
  { name: "React 19", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "GSAP", category: "Animation" },
  { name: "Tailwind", category: "Visual" },
  { name: "Zod", category: "Logic" },
];

export const BACKEND = [
  { name: "Node.js", category: "Runtime" },
  { name: "NestJS", category: "Framework" },
  { name: "PostgreSQL", category: "DB" },
  { name: "Prisma", category: "ORM" },
  { name: "Redis", category: "Cache" },
  { name: "Docker", category: "DevOps" },
];

export const TOOLS = [
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Hosting" },
  { name: "CI/CD", category: "Automation" },
  { name: "Nginx", category: "Server" },
];

// SIMPLE MAC APP UI SKELETON
const AppSkeleton = () => (
  <div className="app-skeleton invisible opacity-0 absolute inset-0 bg-white flex flex-col overflow-hidden">
    {/* Mac AppBar */}
    <div className="h-8 bg-[#f6f6f6] border-b border-black/5 flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
    
    {/* Skeleton Content */}
    <div className="p-8 space-y-6">
      <div className="h-10 w-1/3 bg-black/10 rounded-sm" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-40 bg-black/5 rounded-sm border border-black/5" />
        <div className="h-40 bg-black/5 rounded-sm border border-black/5" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-black/5" />
        <div className="h-2 w-full bg-black/5" />
        <div className="h-2 w-2/3 bg-black/5" />
      </div>
    </div>
  </div>
);

const TechCard = ({ id, label, skills, index, isLast }: any) => (
  <div 
    id={id} 
    className="tech-card absolute w-[90vw] max-w-137.5 aspect-4/3 opacity-0"
    style={{ 
      transform: "rotate(-8deg) skew(12deg, 0deg)",
      zIndex: index + 10 
    }}
  >
    <div className="card-container relative w-full h-full border-2 border-white rounded-xl bg-[#0A0A0A] p-8 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* Content that disappears on expand */}
      <div className="card-content-inner flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start ">
          <h2 className="text-white text-4xl font-black italic tracking-tighter uppercase leading-none">
            {label}
          </h2>
          <span className="font-mono text-xl text-white/20 tracking-widest">MOD_0{index + 1}</span>
        </div>

        <div className="flex flex-wrap gap-2 py-4">
          {skills.map((s: string) => (
            <span key={s} className="border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-mono text-white/80 uppercase">
              {s.name}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 flex justify-between items-end">
           <p className="text-[9px] font-mono text-white/30 tracking-tight">ENGINEERING_STX // IDENTITY_V2</p>
           <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white animate-pulse" />
           </div>
        </div>
      </div>

      {isLast && <AppSkeleton />}
    </div>
  </div>
);














export default function TechStoryClean() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // DRASTICALLY REDUCED BLUR (Max 3px)
            const velocity = Math.abs(self.getVelocity());
            const blur = gsap.utils.clamp(0, 3, velocity / 1000);
            gsap.to(".tech-card", { filter: `blur(${blur}px)`, duration: 0.2 });
          }
        },
      });

      gsap.set(".tech-card", { y: 500, opacity: 0 });

      // PHASE 1: STACKING (Tight gaps)
      tl.to("#card-1", { y: 0, opacity: 1, duration: 2 })
        .to("#card-2", { y: -30, x: 20, opacity: 1, duration: 2 }, "stack-2")
        .to("#card-1", { opacity: 0.2, duration: 2 }, "stack-2")
        .to("#card-3", { y: -60, x: 40, opacity: 1, duration: 2 }, "stack-3")
        .to("#card-2", { opacity: 0.2, duration: 2 }, "stack-3");

      // PHASE 2: FLATTEN AND BLOOM
      tl.to(".tech-card", { 
          rotate: 0, skewX: 0, x: 0, y: 0, 
          opacity: (i) => i === 2 ? 1 : 0, 
          duration: 3, ease: "expo.inOut" 
        }, "flatten")
        .to("#card-3 .card-content-inner", { opacity: 0, duration: 1 }, "flatten")
        .to("#card-3 .card-container", { backgroundColor: "#ffffff", borderColor: "transparent", duration: 1.5 }, "flatten")
        .to(".app-skeleton", { autoAlpha: 1, duration: 1 }, "flatten+=1");

      // PHASE 3: EXPAND & RETURN TO BLACK
      tl.to("#card-3", {
        width: "100vw", height: "100vh", maxWidth: "100vw", borderRadius: 0,
        duration: 3, ease: "power4.inOut"
      }, "expand")
      .to("#card-3 .card-container", {
        backgroundColor: "#020202", // TRANSFORM BACK TO BLACK
        duration: 1.5,
        ease: "power2.inOut"
      }, "expand+=1")
      .to(".app-skeleton", { opacity: 0, duration: 1 }, "expand+=1"); // Fade out skeleton

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen  overflow-hidden flex items-center justify-center">
<div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_2px,transparent_4px)] bg-size-[30px_30px]" />

<div className="absolute top-20 w-full text-center px-6 z-50 pointer-events-none">
        <h1 className="text-white text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
          {"THIS IS HOW I BUILD POWERFUL ROBUST SYSTEMS".split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-3 overflow-hidden">
              <span className="char inline-block">{word}</span>
            </span>
          ))}
        </h1>
      </div>




      <div className="relative w-full h-full flex items-center justify-center">
        <TechCard id="card-1" index={0} label="Frontend" skills={FRONTEND} />
        <TechCard id="card-2" index={1} label="Backend" skills={BACKEND} />
        <TechCard id="card-3" index={2} label="DevOps" skills={TOOLS} isLast />
      </div>
    </section>
  );
}

