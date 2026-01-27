"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function AwwwardsPortfolio() {
  const scope = useRef(null);
  const containerRef = useRef(null);
  const imageBoxRef = useRef(null);
  const svgPathRef = useRef(null);

  useEffect(() => {
    // 1. Initialize SplitText for Phase 2
    const bioText = new SplitType(".bio-text", { types: "lines,words" });
    
    // Masking lines for smooth reveal
    bioText.lines.forEach(line => {
      const wrapper = document.createElement("div");
      wrapper.className = "overflow-hidden py-1";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.5,
        }
      });

      // --- PHASE 1: Curved Pencil Draw ---
      tl.from(".pencil-curve", { strokeDashoffset: 1000, duration: 2 })
        .from(".text-1", { opacity: 0, y: 50, duration: 1 }, "-=1")

      // --- PHASE 2: Mirror Transition (Image Left -> Right) ---
      tl.to(imageBoxRef.current, { 
        x: "120%", // Move Image to Right
        ease: "expo.inOut",
        duration: 3 
      }, "+=0.5")
      .to(".img-1", { opacity: 0, duration: 1.5 }, "<")
      .to(".img-2", { opacity: 1, duration: 1.5 }, "<")
      .to(".text-1", { opacity: 0, x: -100, duration: 1 }, "<")
      
      // Mirror Text Reveal (Appears on Left)
      .from(bioText.words, {
        y: 100,
        opacity: 0,
        rotate: 5,
        stagger: 0.02,
        duration: 2,
        ease: "power4.out"
      }, "-=1.5")

      // --- PHASE 3: Center & Social Hub ---
      tl.to(imageBoxRef.current, { 
        x: "60%", // Position Center-Right
        y: "-10%",
        scale: 1.3,
        duration: 3,
        ease: "power3.inOut" 
      })
      .to(".img-2", { opacity: 0, duration: 1 }, "<")
      .to(".img-3", { opacity: 1, duration: 1 }, "<")
      .to(".bio-text", { opacity: 0, blur: 10, duration: 1 }, "<")
      .from(".social-node", { 
        opacity: 0, 
        scale: 0, 
        stagger: 0.1, 
        duration: 1.5,
        ease: "back.out(2)" 
      }, "-=1");

    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={scope} className="bg-[#050505] text-[#e0e0e0]">
      <section ref={containerRef} className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* THE SVG PENCIL CURVE (S-Shape) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 1440 900">
          <path 
            ref={svgPathRef}
            className="pencil-curve stroke-white/20 fill-none stroke-[0.5]"
            style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
            d="M200,300 C400,300 600,600 800,600" // Adjustable S-Curve
          />
        </svg>

        <div className="container mx-auto px-10 flex relative h-full items-center">
          
          {/* THE SEAMLESS IMAGE ENGINE */}
          <div ref={imageBoxRef} className="relative w-[30vw] h-[70vh] z-20 shadow-2xl overflow-hidden">
            <Image src="/me.jpg" fill alt="1" className="img-1 object-cover grayscale" />
            <Image src="/me.jpg" fill alt="2" className="img-2 object-cover opacity-0" />
            <Image src="/me.jpg" fill alt="3" className="img-3 object-cover opacity-0" />
          </div>

          {/* LAYERED TEXT SYSTEMS */}
          <div className="absolute inset-0 w-full h-full flex items-center px-20">
            
            {/* Phase 1: Text on Right */}
            <div className="text-1 ml-auto w-1/2 flex flex-col items-start pl-20">
              <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                Faysal <br/> Sarker
              </h1>
              <span className="mt-4 font-mono text-sm tracking-widest text-white/40 italic">
                {`//`} Passion Driven Developer
              </span>
            </div>

            {/* Phase 2: Bio on Left */}
            <div className="bio-text w-[45%] text-4xl font-light leading-tight tracking-tight">
              A Full-Stack architect with <span className="text-white font-medium">3+ years</span> of 
              building digital experiences. I specialize in the intersection of 
              heavy-duty logic and <span className="italic font-serif">graceful motion</span>.
            </div>

            {/* Phase 3: Social Hub */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
               {['LN', 'GH', 'TW', 'WA'].map(item => (
                 <div key={item} className="social-node w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-white hover:text-black transition-colors cursor-pointer">
                   {item}
                 </div>
               ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}