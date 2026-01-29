

// "use client";

// import { useRef, useEffect, useState } from "react";

// export default function HeroText() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  
//   useEffect(() => {
//     if (hasAnimated) return;

//     const initialDelay = setTimeout(() => {
//       const container = containerRef.current;
//       if (!container) return;

//       const line1Letters = container.querySelectorAll('.line-1 .letter');
//       const line2Letters = container.querySelectorAll('.line-2 .letter');

//       if (line1Letters.length === 0 || line2Letters.length === 0) return;

//       setHasAnimated(true);

//       // --- Your Animation Logic Starts Here ---
//       // Line 1: Slide up
//       line1Letters.forEach((letter, index) => {
//         setTimeout(() => {
//           (letter as HTMLElement).style.transform = 'translateY(0)';
//         }, index * 50);
//       });

//       // Line 1: Fill color
//       setTimeout(() => {
//         line1Letters.forEach((letter, index) => {
//           setTimeout(() => {
//             const beforeElement = letter.querySelector('.letter-fill') as HTMLElement;
//             if (!beforeElement) return;
//             let progress = 100;
//             const animateFill = () => {
//               progress -= 3;
//               if (progress <= 0) {
//                 beforeElement.style.clipPath = 'inset(0% 0 0 0)';
//                 return;
//               }
//               beforeElement.style.clipPath = `inset(${progress}% 0 0 0)`;
//               requestAnimationFrame(animateFill);
//             };
//             requestAnimationFrame(animateFill);
//           }, index * 50);
//         });
//       }, 600);

//       // Line 2: Slide up
//       setTimeout(() => {
//         line2Letters.forEach((letter, index) => {
//           setTimeout(() => {
//             (letter as HTMLElement).style.transform = 'translateY(0)';
//           }, index * 60);
//         });
//       }, 900);

//       // Line 2: Fill color
//       setTimeout(() => {
//         line2Letters.forEach((letter, index) => {
//           setTimeout(() => {
//             const beforeElement = letter.querySelector('.letter-fill') as HTMLElement;
//             if (!beforeElement) return;
//             let progress = 100;
//             const animateFill = () => {
//               progress -= 3;
//               if (progress <= 0) {
//                 beforeElement.style.clipPath = 'inset(0% 0 0 0)';
//                 return;
//               }
//               beforeElement.style.clipPath = `inset(${progress}% 0 0 0)`;
//               requestAnimationFrame(animateFill);
//             };
//             requestAnimationFrame(animateFill);
//           }, index * 60);
//         });
//       }, 1500);

//     }, 1000);

//     return () => clearTimeout(initialDelay);
//   }, [hasAnimated]);

//   // Helper for text splitting
//   const splitText = (text: string) => {
//     return text.split('').map((char, index) => (
//       <span
//         key={index}
//         className="letter"
//         style={{
//           display: 'inline-block',
//           position: 'relative',
//           color: 'transparent',
//           WebkitTextStroke: '2px oklch(0.92 0.01 0)',
//           transform: 'translateY(150%)',
//           transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
//           willChange: 'transform',
//         }}
//       >
//         <span
//           className="letter-fill"
//           style={{
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             width: '100%',
//             height: '100%',
//             color: 'oklch(0.92 0.01 0)',
//             WebkitTextStroke: '0px transparent',
//             clipPath: 'inset(100% 0 0 0)',
//             willChange: 'clip-path',
//           }}
//         >
//           {char === ' ' ? '\u00A0' : char}
//         </span>
//         {char === ' ' ? '\u00A0' : char}
//       </span>
//     ));
//   };

//   return (
//     <div ref={containerRef} className="w-full px-4">
//       <div className="flex flex-col items-center justify-center text-center">
//         <div className="select-none line-1 mb-6 text-2xl font-semibold uppercase tracking-[0.5em] md:text-4xl lg:text-5xl overflow-hidden flex flex-wrap justify-center">
//           {splitText('Full-Stack')}
//         </div>
//         <div className="line-2 select-none text-6xl font-black uppercase italic leading-[0.8] sm:text-8xl md:text-[10rem] lg:text-[12rem] overflow-hidden">
//           {splitText('Developer')}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface HeroTextProps {
  onComplete?: () => void;
  isStrokeOnly?: boolean; // New prop for the top layer
}

export default function HeroText({ onComplete, isStrokeOnly = false }: HeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only want the base layer to run the entrance animation
    if (isStrokeOnly) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete && onComplete()
      });

      tl.to(".letter", {
        y: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(".letter-fill", {
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.02,
        duration: 0.8,
        ease: "none"
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, isStrokeOnly]);

const splitText = (text: string) => {
  return text.split('').map((char, index) => (
    <span 
      key={index} 
      className={`letter relative inline-block ${isStrokeOnly ? 'translate-y-0' : 'translate-y-[150%]'} text-transparent`} 
      style={{ 
        // Background layer gets subtle stroke, top layer gets bright stroke
        WebkitTextStroke: isStrokeOnly ? '1.5px white' : '1px rgba(255, 255, 255, 0.3)' 
      }}
    >
      <span 
        className="letter-fill absolute inset-0" 
        style={{ 
          // If it's the spotlight layer, we want NO fill color, just the stroke above
          color: isStrokeOnly ? 'transparent' : 'oklch(0.92 0.01 0)',
          WebkitTextStroke: '0px transparent',
          clipPath: isStrokeOnly ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' 
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

  return (



// Inside HeroText.tsx return:
<div ref={containerRef} className="w-full px-2 select-none">
  <div className="flex flex-col items-center justify-center text-center">
    {/* Optimized tracking and size for mobile */}
    <div className="line-1 mb-4 text-[4vw] font-semibold uppercase tracking-[0.3em] md:text-4xl lg:text-5xl md:tracking-[0.5em] overflow-hidden">
      {splitText('Full-Stack')}
    </div>
    {/* Responsive 'Developer' text using vw */}
    <div className="line-2 text-[15vw] font-black uppercase italic leading-[0.8] md:text-[10rem] lg:text-[12rem] overflow-hidden">
      {splitText('Developer')}
    </div>
  </div>
</div>


  );
}



