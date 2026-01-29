

"use client";
import { forwardRef } from "react";
import Image from "next/image";

const HeroImage = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="absolute 2xl:bottom-40 lg:-bottom-20 md:-bottom-20 left-1/2 w-[80%] max-w-[320px] -translate-x-1/2 md:max-w-125 z-10 opacity-0 bottom-40">
      <Image 
        src="/faysal-sarker.jpeg" 
        alt="Faysal Sarker" 
        width={600} 
        height={800} 
        priority
        className="grayscale object-contain"
      />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent" />
    </div>
  );
});

HeroImage.displayName = "HeroImage";
export default HeroImage;