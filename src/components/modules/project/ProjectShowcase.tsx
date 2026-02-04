"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, Cpu, Layout, zap } from "lucide-react"; // Install lucide-react

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  liveLink: string;
  repoLink: string;
  img: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "NEXUS ALPHA",
    category: "Full-Stack Development",
    description: "A high-performance dashboard designed for real-time data visualization and neural network monitoring.",
    features: ["Next.js 14", "Socket.io", "Three.js"],
    liveLink: "https://example.com",
    repoLink: "https://github.com",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564",
  },
  {
    id: "02",
    title: "VIRTUAL HORIZON",
    category: "Creative Engineering",
    description: "An immersive 3D portfolio experience pushing the boundaries of WebGL and motion design.",
    features: ["GSAP", "React Three Fiber", "GLSL"],
    liveLink: "https://example.com",
    repoLink: "https://github.com",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564",
  },
];

const ProjectShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          snap: {
            snapTo: 1 / (projects.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0,
            ease: "power2.inOut"
          },
          start: "top top",
          end: () => `+=${triggerRef.current?.offsetWidth}`,
        },
      });

      tl.to(sectionRef.current, {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
      });

      // Individual project animations
      projects.forEach((_, i) => {
        // Feature tags stagger reveal
        gsap.from(`.feature-tag-${i}`, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: `.slide-${i}`,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-[#0a0a0a]">
      <div ref={sectionRef} className="flex h-screen w-[200vw] relative">
        {projects.map((project, index) => (
          <section
            key={project.id}
            className={`slide-${index} relative w-screen h-screen flex items-center justify-center flex-shrink-0 px-[7vw]`}
          >
            {/* Massive Background ID */}
            <span className="absolute top-10 left-10 text-[15vw] font-black text-white/[0.02] leading-none pointer-events-none">
              {project.id}
            </span>

            <div className="relative z-10 grid grid-cols-12 gap-12 w-full max-w-screen-2xl">
              {/* Left Content: Storytelling */}
              <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
                <div className="overflow-hidden mb-4">
                   <p className="text-emerald-500 font-mono tracking-[0.2em] uppercase text-sm">{project.category}</p>
                </div>
                
                <h3 className="text-7xl font-bold text-white tracking-tighter mb-6 leading-none">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-md">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.features.map((feature) => (
                    <span 
                      key={feature} 
                      className={`feature-tag-${index} px-4 py-1.5 border border-white/10 rounded-full text-xs font-mono text-zinc-300 bg-white/5 flex items-center gap-2`}
                    >
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-8">
                  <a href={project.liveLink} target="_blank" className="flex items-center gap-2 text-white group cursor-pointer">
                    <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-white/20 group-hover:border-white transition-all">Live Demo</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <a href={project.repoLink} target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <span className="text-sm font-bold tracking-widest uppercase">Source Code</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Right Content: Visuals */}
              <div className="col-span-12 lg:col-span-7 relative group">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
                
                {/* Floating Tech Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl hidden xl:block shadow-2xl">
                   <p className="text-black text-[10px] font-black uppercase tracking-widest mb-1">Status</p>
                   <p className="text-black font-bold">PRODUCTION READY</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;