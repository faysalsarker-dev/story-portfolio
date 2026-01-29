// // "use client";

// // import { useEffect, useState } from "react";
// // import { motion } from "framer-motion";

// // const Resume = () => {
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     // Starts 2.2s later to stagger slightly after SocialLinks
// //     const timer = setTimeout(() => setIsVisible(true), 2200);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   if (!isVisible) return null;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: 20 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.8, ease: "easeOut" }}
// //       className="absolute md:bottom-10 bottom-15 md:right-0 -right-1.5 z-20 flex items-center"
// //     >
// //       <a
// //         href="/resume.pdf"
// //         target="_blank"
// //         className="group flex items-center gap-2 md:gap-4 pr-6 md:pr-8"
// //       >
// //         <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
// //           Download Resume
// //         </span>
// //         <motion.div
// //           initial={{ width: 0 }}
// //           animate={{ width: 40 }}
// //           transition={{ delay: 0.5, duration: 0.8 }}
// //           className="h-px bg-white/30 md:w-15 group-hover:bg-white group-hover:w-20 transition-all duration-500"
// //         />
// //       </a>
// //     </motion.div>
// //   );
// // };

// // export default Resume;


// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const Resume = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // 2.2s delay ensures parent (1s) and first beat of hero finish first
//     const timer = setTimeout(() => setIsVisible(true), 2200);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       // Adjusted: Use right-0 and padding to prevent thumb-clash on mobile
//       className="absolute bottom-16 md:bottom-10 right-0 z-50 flex items-center select-none"
//     >
//       <a
//         href="/resume.pdf"
//         target="_blank"
//         rel="noopener noreferrer"
//         // pr-6 on mobile provides a 'dead zone' so users don't click while scrolling
//         className="group flex items-center gap-3 md:gap-4 pr-6 md:pr-10"
//       >
//         {/* The Text - Slightly larger on mobile for accessibility */}
//         <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
//           Download Resume
//         </span>

//         {/* The Line - It 'anchors' to the right edge */}
//         <div className="relative flex items-center">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: 30 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             // md:w-16 (64px) for desktop, w-8 (32px) for mobile
//             className="h-px bg-white/20 md:w-16 group-hover:bg-white group-hover:w-20 transition-all duration-500"
//           />
//           {/* Subtle Glow effect on hover */}
//           <div className="absolute right-0 h-full w-full bg-white/0 group-hover:bg-white/5 blur-md transition-all" />
//         </div>
//       </a>
//     </motion.div>
//   );
// };

// export default Resume;


"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// --- Magnetic Wrapper for the Text ---
const MagneticText = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); 
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="flex items-center"
    >
      {children}
    </motion.div>
  );
};

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Starts 2.4s later (Socials start at 1.8s, this completes the wave)
    const timer = setTimeout(() => setIsVisible(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-30 right-0 md:bottom-20 z-20 select-none">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-6  pr-1"
      >
        <MagneticText>
          <span className="text-[8px] md:text-[11px] uppercase tracking-[0.5em] text-gray-400 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
            Download Resume
          </span>
        </MagneticText>

        {/* The Animated Line */}
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ 
              delay: 0.4, 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="h-px bg-linear-to-l from-white/60 via-white/20 to-transparent md:w-24 group-hover:w-32 group-hover:bg-white transition-all duration-700"
          />
        </div>
      </a>
    </div>
  );
};

export default Resume;