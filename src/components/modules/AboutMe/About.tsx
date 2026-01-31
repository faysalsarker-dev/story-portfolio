

// "use client";

// import  { useRef } from "react";
// import Image from "next/image";
// import SplitType from "split-type";
// import gsap ,{ useGSAP }  from "@/lib/gsap";



// const AboutObsessionRefined = () => {
//   const container = useRef<HTMLDivElement>(null);
//   const sidePortrait = useRef<HTMLDivElement>(null);
//   const connectorLine = useRef<SVGPathElement>(null);
//   const textContent = useRef<HTMLDivElement>(null);
//   const bgText = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       const name = new SplitType(".about-name", { types: "chars" });
//       const phil = new SplitType(".phil-text", { types: "lines,words" });
      
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: container.current,
//           start: "top top",
//           end: "+=500%",
//           pin: true,
//           scrub: 1,
//         },
//       });

//       // --- 1. STARTING ANIMATIONS ---
      
//       // Identity text drops from top
//       tl.fromTo(bgText.current, 
//         { yPercent: -80, opacity: 0 }, 
//         { yPercent: 0, opacity: 0.03, duration: 2, ease: "power3.out" }
//       );

//       // Portrait slides in from far left
//       tl.from(sidePortrait.current, { 
//         xPercent: -100, 
//         opacity: 0, 
//         duration: 1.5, 
//         ease: "power2.out" 
//       }, "-=1.5");

//       // Line draws from edge
//       tl.fromTo(connectorLine.current,
//         { strokeDashoffset: 1500, strokeDasharray: 1500 },
//         { strokeDashoffset: 0, duration: 2, ease: "sine.inOut" },
//         "-=1"
//       );

//       // Name entrance
//       tl.from(name.chars, { 
//         opacity: 0, 
//         y: 40, 
//         stagger: 0.02, 
//         duration: 1, 
//         ease: "expo.out" 
//       }, "-=1.5");

//       // PHILOSOPHY STARTING ANIMATION (The fix you requested)
//       tl.from(phil.words, { 
//         opacity: 0, 
//         y: 30, 
//         rotateX: -45,
//         stagger: 0.01, 
//         duration: 1.2, 
//         ease: "power4.out" 
//       }, "-=1");

//       // --- 2. ENDING PARALLAX ---
      
//       tl.to(sidePortrait.current, { 
//         yPercent: -45, 
//         xPercent: -20, 
//         opacity: 0.3, 
//         duration: 3 
//       }, "+=1");

//       tl.to(bgText.current, { 
//         yPercent: 80, 
//         scale: 1.1, 
//         duration: 3 
//       }, "<");

//       tl.to(textContent.current, { 
//         yPercent: -30, 
//         opacity: 0, 
//         duration: 3 
//       }, "<");

//     }, container);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={container} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center">
      
//       {/* Background Text Layer */}
//       <div ref={bgText} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
//         <h2 className="text-[22vw] font-black uppercase italic tracking-tighter leading-none select-none text-white ">
//           Identity
//         </h2>
//       </div>

//       <div className="relative z-10 w-full h-full flex items-center ">
        
//         {/* PORTRAIT CONTAINER */}
//         <div ref={sidePortrait} className="relative w-1/2  h-full flex items-center ">
//           <div className="relative w-full h-full ">
//             <Image 
//               src="/text.png" 
//               alt="Faysal Profile"
//               fill
//               className="object-contain object-left grayscale brightness-75"
//               priority
//             />
            
//             {/* Vibe Gradients (The "Melt" Effect) */}
//             {/* Bottom Fade */}
//             <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#050505] to-transparent z-10" />
//             {/* Left Side Fade */}
//             <div className="absolute top-0 left-0 h-full w-32 bg-linear-to-r from-[#050505] to-transparent z-10" />
//           </div>
//         </div>

//         {/* SVG Connector */}
//         <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
//           <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
//             <path
//               ref={connectorLine}
//               d="M 180 380 L 400 380 Q 550 380, 650 480 L 850 480" 
//               stroke="white" strokeWidth="0.5" strokeOpacity="0.2"
//             />
//           </svg>
//         </div>

//         {/* CONTENT AREA */}
//         <div ref={textContent} className="w-[45%] ml-auto mr-[8%] z-30 ">
//           <p className="text-[9px] tracking-[0.8em] text-white/20 uppercase mb-6">Discover // 01</p>
          
//           <h1 className="about-name text-6xl md:text-[6.5vw] font-light tracking-tighter leading-[0.85] mb-12">
//             Faysal <br /> 
//             <span className="font-bold text-outline uppercase">Sarker</span>
//           </h1>

//           <div className="space-y-10 border-l border-white/5 pl-10">
//             <div className="meta-row">
//               <span className="block text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 italic">Philosophy</span>
//               <p className="phil-text text-xl md:text-2xl font-light text-white/80 leading-relaxed tracking-tight max-w-2xl">
//                 I’m a Full-Stack Developer with <span className="text-white font-medium">3+ years</span> of experience building products. 
//                 I’m deeply dedicated to my craft—not casually interested, <span className="italic font-serif text-white">genuinely obsessed.</span>
//               </p>
//             </div>
            
//             <div className="meta-row">
//               <p className="phil-text text-sm md:text-base font-extralight text-white/40 leading-relaxed max-w-lg uppercase tracking-wider">
//                 Building, breaking, and learning. I work at the intersection of clean architecture and <span className="text-white/70">practical problem solving.</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .text-outline {
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default AboutObsessionRefined;



"use client";

import { useRef } from "react";
import Image from "next/image";
import SplitType from "split-type";
import gsap, { useGSAP } from "@/lib/gsap";

const AboutObsessionRefined = () => {
  const container = useRef<HTMLDivElement>(null);
  const sidePortrait = useRef<HTMLDivElement>(null);
  const connectorLine = useRef<SVGPathElement>(null);
  const textContent = useRef<HTMLDivElement>(null);
  const bgText = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const name = new SplitType(".about-name", { types: "chars" });
      const phil = new SplitType(".phil-text", { types: "lines,words" });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
        },
      });

      // --- 1. STARTING ANIMATIONS (Preserved exactly) ---
      
      tl.fromTo(bgText.current, 
        { yPercent: -80, opacity: 0 }, 
        { yPercent: 0, opacity: 0.03, duration: 2, ease: "power3.out" }
      );

      tl.from(sidePortrait.current, { 
        xPercent: -100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power2.out" 
      }, "-=1.5");

      tl.fromTo(connectorLine.current,
        { strokeDashoffset: 1500, strokeDasharray: 1500 },
        { strokeDashoffset: 0, duration: 2, ease: "sine.inOut" },
        "-=1"
      );

      tl.from(name.chars, { 
        opacity: 0, 
        y: 40, 
        stagger: 0.02, 
        duration: 1, 
        ease: "expo.out" 
      }, "-=1.5");

      tl.from(phil.words, { 
        opacity: 0, 
        y: 30, 
        rotateX: -45,
        stagger: 0.01, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=1");

      // --- 2. ENDING PARALLAX (Preserved exactly) ---
      
      tl.to(sidePortrait.current, { 
        yPercent: -45, 
        xPercent: -20, 
        opacity: 0.3, 
        duration: 3 
      }, "+=1");

      tl.to(bgText.current, { 
        yPercent: 80, 
        scale: 1.1, 
        duration: 3 
      }, "<");

      tl.to(textContent.current, { 
        yPercent: -30, 
        opacity: 0, 
        duration: 3 
      }, "<");

    }, container);

    return () => ctx.revert();
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center">
      
      {/* Background Text Layer */}
      <div ref={bgText} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[22vw] font-black uppercase italic tracking-tighter leading-none select-none text-white">
          Identity
        </h2>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center">
        
        {/* PORTRAIT CONTAINER - Responsive width and offset */}
        <div 
          ref={sidePortrait} 
          className="absolute md:relative w-[130%] md:w-1/2 md:h-full h-[120%] flex items-center -translate-x-[35%] md:translate-x-0 z-10"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/text.png" 
              alt="Faysal Profile"
              fill
              className="object-contain object-left grayscale brightness-[0.5] md:brightness-75"
              priority
            />
            
            {/* Vibe Gradients (The "Melt" Effect) */}
   <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#050505] to-transparent z-10 hidden md:block" />
            <div className="absolute top-0 left-0 h-full w-32 bg-linear-to-r from-[#050505] to-transparent z-10  hidden   md:block" />





<div className="absolute bottom-40  left-0 w-full h-40 bg-linear-to-t from-[#050505] to-transparent z-20 md:hidden" />
            
            {/* Left Edge Melt - Adjusted for mobile translate */}
            <div className="absolute  top-0 left-15 h-full w-[40%] md:w-32 bg-linear-to-r from-[#050505] to-transparent z-10 md:hidden" />
            
            {/* Extra Top Melt for Mobile (to hide the hair cut-off) */}
      
          </div>
        </div>

        {/* SVG Connector (Desktop Only) */}
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
            <path
              ref={connectorLine}
              d="M 180 380 L 400 380 Q 550 380, 650 480 L 850 480" 
              stroke="white" strokeWidth="0.5" strokeOpacity="0.2"
            />
          </svg>
        </div>

        {/* CONTENT AREA - Pinned Right & Higher on Mobile */}
        <div 
          ref={textContent} 
          className="relative z-30 w-full md:w-[45%] md:ml-auto md:mr-[8%] px-8 md:px-0 flex flex-col items-end md:items-start text-right md:text-left h-full md:h-auto justify-start md:justify-center pt-[20%] md:pt-0"
        >
          <p className="text-[9px] tracking-[0.8em] text-white/20 uppercase mb-4 md:mb-6">Discover // 01</p>
          
          <h1 className="about-name text-5xl md:text-[6.5vw] font-light tracking-tighter leading-[0.85] mb-8 md:mb-12">
            Faysal <br /> 
            <span className="font-bold text-outline uppercase">Sarker</span>
          </h1>

          <div className="space-y-6 md:space-y-10 border-r md:border-r-0 md:border-l border-white/5 pr-3 md:pr-0 md:pl-10 max-w-70 md:max-w-2xl">
            <div className="meta-row">
              <span className="block text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 md:mb-4 italic">Philosophy</span>
              <p className="phil-text text-lg md:text-2xl font-light text-white/80 leading-relaxed tracking-tight">
                I’m a Full-Stack Developer with <span className="text-white font-medium">3+ years</span> of experience. 
                I’m <span className="italic font-serif text-white">genuinely obsessed.</span>
              </p>
            </div>
            
            <div className="meta-row  md:block">
              <p className="phil-text text-sm md:text-base font-extralight text-white/40 leading-relaxed uppercase tracking-wider">
                Building, breaking, and learning. I work at the intersection of clean architecture and <span className="text-white/70">practical problem solving.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default AboutObsessionRefined;