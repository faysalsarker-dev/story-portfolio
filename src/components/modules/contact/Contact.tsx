"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function UltimateContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%", // The length of the "journey"
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. THE SCALE-THROUGH ANIMATION
      tl.to(".hero-text", {
        scale: 50,      // Scale it massive
        opacity: 0,
        filter: "blur(20px)",
        duration: 3,
        ease: "power2.inIn",
      })
      
      // 2. REVEAL THE CONTENT (Coming from "Inside" the text)
      .from(".contact-content", {
        scale: 0.5,
        opacity: 0,
        filter: "blur(10px)",
        duration: 2,
      }, "-=1.5")

      // 3. STAGGERED INFO NODES (Socials/Phone)
      .from(".info-item", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      }, "-=0.5")

      // 4. FORM LINE DRAWING
      .from(".form-line", {
        width: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "expo.inOut"
      }, "-=1");

      // MAGNETIC BUTTON EFFECT
      const btn = document.querySelector(".magnetic-btn");
      btn?.addEventListener("mousemove", (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5 });
      });
      btn?.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative bg-[#080808] text-white overflow-hidden">
      
      {/* SECTION 1: THE MASSIVE TEXT DOORWAY */}
      <div className="hero-text absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <h2 className="text-[20vw] font-black italic tracking-tighter leading-none text-center">
          REACH<br/>OUT
        </h2>
      </div>

      {/* SECTION 2: THE REVEALED UNIVERSE */}
      <div className="contact-content min-h-screen w-full flex flex-col justify-center px-6 md:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Personal Matrix */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-4">
              <h3 className="info-item text-6xl font-bold tracking-tight">Let's talk.</h3>
              <p className="info-item text-zinc-500 text-lg max-w-sm font-light">
                Currently available for selected freelance opportunities and creative collaborations.
              </p>
            </div>

            <div className="space-y-10">
              <div className="info-item group">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Direct Transmission</p>
                <a href="tel:+88017000000" className="text-3xl font-light hover:text-orange-500 transition-colors duration-300">
                  +880 17XX XXXXXX
                </a>
              </div>

              <div className="info-item group">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Electronic Mail</p>
                <a href="mailto:hello@faysal.dev" className="text-3xl font-light hover:text-orange-500 transition-colors duration-300 italic">
                  hello@faysal.dev
                </a>
              </div>

              <div className="info-item flex gap-8 pt-6">
                {['LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                  <a key={social} href="#" className="text-xs font-mono uppercase tracking-widest hover:text-orange-500 transition-all underline underline-offset-8">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: The Terminal Form */}
          <div className="lg:col-span-7 relative">
            <form className="space-y-12">
              <div className="group relative">
                <label className="block text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4">01. Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent text-3xl font-light outline-none py-2 placeholder:text-zinc-800"
                  placeholder="John Doe"
                />
                <div className="form-line h-[1px] bg-zinc-800 w-full mt-2" />
              </div>

              <div className="group relative">
                <label className="block text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4">02. Your Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent text-3xl font-light outline-none py-2 placeholder:text-zinc-800"
                  placeholder="john@example.com"
                />
                <div className="form-line h-[1px] bg-zinc-800 w-full mt-2" />
              </div>

              <div className="group relative">
                <label className="block text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4">03. Project Details</label>
                <textarea 
                  rows={2}
                  className="w-full bg-transparent text-3xl font-light outline-none py-2 placeholder:text-zinc-800 resize-none"
                  placeholder="Describe your vision..."
                />
                <div className="form-line h-[1px] bg-zinc-800 w-full mt-2" />
              </div>

              <div className="pt-8">
                <button className="magnetic-btn group relative px-16 py-6 rounded-full border border-white/20 hover:border-white transition-colors overflow-hidden">
                  <span className="relative z-10 text-sm font-mono tracking-widest uppercase group-hover:text-black transition-colors duration-300">
                    Send Signal
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <style jsx>{`
        .magnetic-btn {
          display: inline-block;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}