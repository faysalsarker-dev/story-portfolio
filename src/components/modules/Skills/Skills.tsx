
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillTag = ({ name }: { name: string }) => (
  <span className="border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase text-white/80">
    {name}
  </span>
);

const TechCard = ({ id, label, skills, index }: any) => (
  <div 
    id={id} 
    className="tech-card absolute w-[90vw] max-w-[550px] aspect-[4/3] opacity-0 "
    style={{ 
      // This creates the "Isometric 3D" look in a 2D space
      // transform: "rotate(-15deg) skew(20deg, 0deg)",
      transform: "rotate(-8deg) skew(12deg, 0deg)",
      zIndex: index + 10 
    }}
  >
    {/* Card Body: High Contrast Black/White Theme */}
    <div className="relative w-full h-full border-2 border-white rounded-lg bg-[#0A0A0A] p-8 shadow-[20px_20px_0px_rgba(255,255,255,0.05)]">
      
      {/* Design Elements from your "Identity" theme */}
      <div className="absolute top-4 right-6 font-mono text-[10px] text-white/20 tracking-[0.5em]">
        SYS_MOD_0{index + 1}
      </div>

      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-white text-4xl font-black italic tracking-tighter uppercase mb-6">
            {label}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string) => <SkillTag key={s} name={s} />)}
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/10 pt-6">
           <p className="text-[10px] font-mono text-white/40 max-w-[200px]">
             HIGH_PERFORMANCE_SOLUTIONS // {label.toUpperCase()}_ARCHITECTURE
           </p>
           <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white animate-pulse" />
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default function TechStory2D() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        },
      });

      // Initial Position: Hidden at the bottom
      gsap.set(".tech-card", { y: 600, opacity: 0 });

      // PHASE 1: Stacking
      // Card 1
      tl.to("#card-1", { y: 0, opacity: 1, duration: 2 })
        .to(".label-1", { opacity: 1, x: 20 }, "-=1");

      // Card 2: Slides on top with a slight offset
      tl.to("#card-2", { y: -30, x: 20, opacity: 1, duration: 2 }, "stack-2")
        .to("#card-1", { opacity: 0.3, duration: 2 }, "stack-2")
        .to(".label-2", { opacity: 1, x: 20 }, "stack-2");

      // Card 3: Final stack
      tl.to("#card-3", { y: -60, x: 40, opacity: 1, duration: 2 }, "stack-3")
        .to("#card-2", { opacity: 0.3, duration: 2 }, "stack-3")
        .to(".label-3", { opacity: 1, x: 20 }, "stack-3");

      // PHASE 2: Flatten & Expand (Transition to Website System)
      tl.to(".side-label", { opacity: 0, duration: 1 })
        .to(".tech-card", { 
          rotate: 0, 
          skewX: 0, 
          skewY: 0, 
          x: 0, 
          y: 0, 
          scale: 1,
          opacity: (i) => i === 2 ? 1 : 0, // Keep only top card
          duration: 3, 
          ease: "expo.inOut" 
        }, "flatten")
        .to("#card-3 > div", { 
          backgroundColor: "#ffffff", 
          borderColor: "transparent", 
          duration: 1.5 
        }, "flatten");

      tl.to("#card-3", {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        duration: 2,
        ease: "power4.inOut"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center">
      
      {/* Background Grid to match your theme */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative w-full h-full flex items-center justify-center">
        
        <TechCard id="card-1" index={0} label="Frontend" skills={["Next.js", "React", "Tailwind", "GSAP"]} />
        <TechCard id="card-2" index={1} label="Backend" skills={["Node.js", "Postgres", "Redis", "Docker"]} />
        <TechCard id="card-3" index={2} label="DevOps" skills={["AWS", "Vercel", "CI/CD", "Linux"]} />

        {/* Dynamic Side Labels */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 space-y-24 hidden lg:block">
           {[1,2,3].map(i => (
             <div key={i} className={`side-label label-${i} opacity-0 font-mono text-white/30 text-xs border-l border-white/20 pl-4`}>
                PHASE_0{i} // LOADED
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}