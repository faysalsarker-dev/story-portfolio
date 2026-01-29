"use client";
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function AwardAboutSection() {
  const mainRef = useRef(null);
  const portalRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);
  const bioTextRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Setup for Line Drawing 
    const path = lineRef.current;
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // 2. Setup SplitType for Typography
    const splitBio = new SplitType(bioTextRef.current, { types: 'lines,words' });
    gsap.set(splitBio.words, { opacity: 0, y: 20 });

    // 3. Master Scrollytelling Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "+=600%", // Long scroll for deep dive feel
        pin: true,
        scrub: 1.5, // High smoothing for premium feel [1]
      }
    });

    // ACT I: The Expansion (Expanding Portal)
    tl.to(portalRef.current, {
      scale: 50, // Scales until the "thing" covers the whole screen
      duration: 2,
      ease: "power2.inOut"
    })
   .to(".overlay-intro", { opacity: 0, duration: 0.5 }, "-=0.5")

    // ACT II: Identity Reveal (Partial Face & Initial Intro) 
   .fromTo(imageRef.current, 
      { x: "-60%", opacity: 0, filter: "grayscale(100%) blur(10px)" },
      { x: "-35%", opacity: 1, filter: "grayscale(100%) blur(0px)", duration: 1.5 },
      ">"
    )
   .to(bgTextRef.current, { opacity: 0.05, textContent: "FAYSAL SARKER", duration: 1 })

    // ACT III: The Connective Thread (Line Drawing) 
   .to(path, { strokeDashoffset: 0, duration: 2, ease: "none" }, ">")
   .from(".intro-name", { opacity: 0, x: 50, stagger: 0.2 }, "-=1")

    // ACT IV: The Smooth Shift (Move Image Left to Right) [2]
   .to(imageRef.current, { 
      x: "40%", 
      filter: "grayscale(0%)", // Changes from B&W to Color [3]
      duration: 3, 
      ease: "power1.inOut" 
    })
   .to(bgTextRef.current, { textContent: "FULLSTACK DEV", y: -50, duration: 1.5 }, "-=3")

    // ACT V: Deep Narrative (SplitType Paragraph Reveal)
   .to(splitBio.words, {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

  }, { scope: mainRef });

  return (
    <section ref={mainRef} className="relative w-full h-screen bg-black text-white overflow-hidden font-sans">
      {/* Background Kinetic Typography  */}
      <div 
        ref={bgTextRef} 
        className="absolute inset-0 flex items-center justify-center text-[15vw] font-black opacity-0 select-none transition-all duration-1000"
      >
        ABOUT
      </div>

      {/* Act I: The Portal "Thing" */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div ref={portalRef} className="w-12 h-12 border border-white rounded-full bg-transparent flex items-center justify-center">
            <span className="overlay-intro text-[8px] uppercase tracking-widest">Scroll</span>
        </div>
      </div>

      {/* Act II & IV: The Image Reveal [4, 5] */}
      <div 
        ref={imageRef} 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[60vh] h-[80vh] z-20 border-r border-white/20"
      >
        <Image 
          src="/me.jpg" 
          alt="Faysal Sarker" 
          fill 
          className="object-cover object-right" // Ensures only right side/eye is visible initially 
        />
      </div>

      {/* Act III: The Connective Line [6, 7] */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1920 1080">
        <path
          ref={lineRef}
          d="M600,540 Q960,540 1300,540" // Path from image to right side text
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Narrative Content [8, 4] */}
      <div className="relative z-30 flex flex-col justify-center h-full pl-[55%] pr-20">
        <div className="intro-name mb-10">
          <h1 className="text-8xl font-bold uppercase leading-none tracking-tighter">
            Hi, I&apos;m <br /> <span className="text-outline-white">Faysal Sarker</span>
          </h1>
          <p className="text-xl text-gray-400 mt-4 tracking-widest uppercase">Fullstack Developer & Creative Tech</p>
        </div>

        <div ref={bioTextRef} className="max-w-xl text-2xl font-light leading-relaxed text-gray-300">
          I build high-performance digital experiences that bridge the gap between human emotion and technical logic. 
          Through clean code and immersive design, I transform ideas into award-winning narratives.
        </div>
      </div>
    </section>
  );
}