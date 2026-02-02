"use client";

import {  useRef, ReactNode } from "react";
import { ReactLenis, LenisRef } from "lenis/react";
import gsap ,{useGSAP}  from "@/lib/gsap";


interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ 
  children 
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(() => {
    

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
    //   options={{
    //     lerp: 0.08,
    //     duration: 1.2,
    //     smoothWheel: true,
    //   }}

options={{
    // Lower lerp = smoother/slower follow (0.05 to 0.08 is the sweet spot)
    lerp: 0.05, 
    // Wheel Multiplier: slightly less than 1 makes the "jumps" smaller
    wheelMultiplier: 0.9, 
    // Smooth Touch: ensures mobile users get the same high-end feel
    touchMultiplier: 1.5,
    infinite: false,
  }}


    >
      {children}
    </ReactLenis>
  );
}