
// "use client";
// import { useRef, useEffect, useState } from "react";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import HeroText from "../modules/Hero/HeroText";
// import HeroImage from "../modules/Hero/HeroImage";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const imageContainerRef = useRef<HTMLDivElement>(null);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   // Handle the image appearing after text animation
//   const handleTextComplete = () => {
//     gsap.to(imageContainerRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 1.2,
//       ease: "power2.out"
//     });
//   };

//   useEffect(() => {
//     // Parallax for the image
//     const parallax = gsap.to(imageContainerRef.current, {
//       yPercent: -15,
//       ease: "none",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//       }
//     });
//     return () => parallax.kill();
//   }, []);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!sectionRef.current) return;
//     const rect = sectionRef.current.getBoundingClientRect();
//     setMousePos({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   return (
//     <section 
//       ref={sectionRef}
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center"
//     >
//       {/* LAYER 1: Solid Background Text */}
//       <div className="relative z-0 w-full">
//         <HeroText onComplete={handleTextComplete} />
//       </div>

//       {/* LAYER 2: Your Image */}
//       <HeroImage ref={imageContainerRef} />

//       {/* LAYER 3: Spotlight Stroke (Visible only around mouse) */}
//       <div 
//         className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300"
//         style={{
//           // Only reveal the stroke in a 150px circle around the cursor
//           WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
//           maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
//         }}
//       >
//         <HeroText isStrokeOnly={true} />
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
//     </section>
//   );
// }


"use client";
import { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroText from "../modules/Hero/HeroText";
import HeroImage from "../modules/Hero/HeroImage";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // Start off-screen

  const handleTextComplete = () => {
    gsap.to(imageContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    // BOOSTED PARALLAX: Increased yPercent to -40 for high strength
    const parallax = gsap.to(imageContainerRef.current, {
      yPercent: -40, 
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, 
      }
    });
    return () => {
      parallax.kill();
    };
  }, []);

  // Combined Mouse and Touch tracking
  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={(e) => updateCoordinates(e.clientX, e.clientY)}
      onTouchMove={(e) => updateCoordinates(e.touches[0].clientX, e.touches[0].clientY)}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center touch-none"
    >
      {/* LAYER 1: Background Text */}
      <div className="relative z-0 w-full">
        <HeroText onComplete={handleTextComplete} />
      </div>

      {/* LAYER 2: Your Image */}
      <HeroImage ref={imageContainerRef} />

      {/* LAYER 3: Spotlight Stroke */}
      <div 
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          // Smaller circle for mobile (80px) vs Desktop (120px)
          WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
          maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <HeroText isStrokeOnly={true} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-30 pointer-events-none" />
    </section>
  );
}