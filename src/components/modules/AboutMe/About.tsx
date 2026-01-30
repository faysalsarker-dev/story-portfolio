"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutMasterpiece = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const supernovaRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize Typography
      const title1 = new SplitType(".title-1", { types: "chars,words" });
      const text2 = new SplitType(".text-2", { types: "lines" });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Long scroll for deep immersion
          pin: true,
          scrub: 1.5,
        },
      });

      // --- ACT 1: THE SUPERNOVA ---
      mainTl.set(supernovaRef.current, { scale: 0, opacity: 1 });
      mainTl.to(supernovaRef.current, {
        scale: 150,
        duration: 3,
        ease: "expo.inOut",
      })
      .to(supernovaRef.current, {
        opacity: 0,
        duration: 1.5,
      }, "-=0.5");

      // --- ACT 2: THE PORTRAIT EMERGENCE ---
      mainTl.fromTo(section1Ref.current, 
        { z: 1000, opacity: 0, filter: "blur(20px)" },
        { z: 0, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.out" },
        "-=2"
      );

      mainTl.from(title1.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.5,
        ease: "expo.out"
      }, "-=1.5");

      // Floating parallax for the main image
      mainTl.to(heroImageRef.current, {
        y: -50,
        duration: 2,
        ease: "none"
      }, "imageScroll");

      // --- ACT 3: THE DIMENSIONAL FLIP ---
      // Scene 1 pushes AWAY into the distance
      mainTl.to(section1Ref.current, {
        z: -2000,
        opacity: 0,
        scale: 0.5,
        duration: 3,
        ease: "expo.inOut"
      }, "+=1");

      // Scene 2 comes forward from the "back" of the screen
      mainTl.fromTo(section2Ref.current,
        { z: 2000, opacity: 0, scale: 2, filter: "blur(30px)" },
        { z: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 3, ease: "expo.out" },
        "-=2.5"
      );

      mainTl.from(text2.lines, {
        opacity: 0,
        x: -100,
        stagger: 0.2,
        duration: 2,
        ease: "power4.out"
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden perspective-2000 select-none"
    >
      {/* The supernova circle expansion */}
      <div 
        ref={supernovaRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-[100] pointer-events-none shadow-[0_0_100px_rgba(255,255,255,0.8)]"
      />

      {/* ACT 1: PORTRAIT SCENE (Image Left, Text Right) */}
      <div 
        ref={section1Ref}
        className="absolute inset-0 flex items-center justify-center p-10 md:p-24 will-change-transform transform-style-3d"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full max-w-7xl items-center">
          <div ref={heroImageRef} className="col-span-12 md:col-span-6 relative aspect-[4/5] overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image 
              src="/me.jpg" 
              alt="Faysal Sarker" 
              fill 
              className="object-cover grayscale scale-110 hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <h1 className="title-1 text-8xl md:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter text-white">
              Faysal <br /> <span className="text-outline">Sarker</span>
            </h1>
            <p className="mt-8 text-white/40 tracking-[0.5em] uppercase text-sm font-light">
              Full Stack Developer — BD
            </p>
          </div>
        </div>
      </div>

      {/* ACT 2: VISION SCENE (Text Left, Image Right) */}
      <div 
        ref={section2Ref}
        className="absolute inset-0 flex items-center justify-center p-10 md:p-24 opacity-0 will-change-transform transform-style-3d"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full max-w-7xl items-center">
          <div className="col-span-12 md:col-span-7 order-2 md:order-1">
            <h2 className="text-white text-5xl md:text-7xl font-light leading-tight mb-8">
              Turning <span className="italic font-serif">Logic</span> <br /> 
              into digital <span className="text-outline">Poetry</span>.
            </h2>
            <div className="text-2 text-white/60 text-xl md:text-2xl font-extralight max-w-xl leading-relaxed">
              <p>Specializing in Next.js architectures and cinematic GSAP motions.</p>
              <p className="mt-4">I build web experiences that don't just work—they breathe.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 order-1 md:order-2">
            <div className="relative aspect-square border border-white/20 p-4 rotate-3">
               <Image 
                               src="/me.jpg" 

                alt="Architecture" 
                fill 
                className="object-cover grayscale brightness-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ghost Background Elements */}
      <div className="absolute top-10 left-10 text-white/5 text-sm uppercase tracking-widest vertical-text hidden md:block">
        Portfolio v2.0 // 2024
      </div>
      
      <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </main>
  );
};

export default AboutMasterpiece;