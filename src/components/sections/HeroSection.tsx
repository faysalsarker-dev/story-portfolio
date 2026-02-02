

"use client";
import { useRef, useEffect, useState } from "react";


import HeroText from "../modules/Hero/HeroText";
import HeroImage from "../modules/Hero/HeroImage";
import SocialLinks from "../modules/Hero/SocialLinks";
import Resume from "../modules/Hero/Resume";
import gsap  from "@/lib/gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); 

  const handleTextComplete = () => {
    gsap.to(imageContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  useEffect(() => {
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
      <div className="relative z-0 w-full">
        <HeroText onComplete={handleTextComplete} />
      </div>

      <HeroImage ref={imageContainerRef} />

      <div 
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
          maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <HeroText isStrokeOnly={true} />
      </div>
<SocialLinks />
<Resume/>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-30 pointer-events-none" />
    </section>
  );
}