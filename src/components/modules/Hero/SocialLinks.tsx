"use client";

import { useEffect, useState } from "react";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
 import { motion, useSpring, useMotionValue } from "framer-motion";

const SOCIAL_LINKS = [
  { id: 1, name: "LinkedIn", icon: <Linkedin size={20} />, url: "#" },
  { id: 2, name: "GitHub", icon: <Github size={20} />, url: "#" },
  { id: 3, name: "Facebook", icon: <Facebook size={20} />, url: "#" },
  { id: 4, name: "Instagram", icon: <Instagram size={20} />, url: "#" },
];


const MagneticElement = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4); // Pull strength
    y.set((clientY - centerY) * 0.4);
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
    >
      {children}
    </motion.div>
  );
};




const SocialLinks = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="absolute top-15 left-4 md:top-15 md:left-6 z-20 flex flex-col items-center gap-4 md:gap-6 "
    >
   


         <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 100, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-px bg-linear-to-b from-white/60 via-white/20 to-transparent"
      />

      <div className="flex flex-col md:gap-6 gap-4">
        {SOCIAL_LINKS.map((link, index) => (
   <MagneticElement  key={link.id}>
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-gray-400 hover:text-white transition-all duration-300"
            >
              <div className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
                {link.icon}
              </div>
            </motion.a>
   </MagneticElement>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;


// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion, useSpring, useMotionValue } from "framer-motion";
// import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

// const SOCIAL_LINKS = [
//   { id: 1, name: "LinkedIn", icon: <Linkedin size={18} />, url: "#" },
//   { id: 2, name: "GitHub", icon: <Github size={18} />, url: "#" },
//   { id: 3, name: "Facebook", icon: <Facebook size={18} />, url: "#" },
//   { id: 4, name: "Instagram", icon: <Instagram size={18} />, url: "#" },
// ];

// // --- Magnetic Wrapper for that "Pro" feel ---


// const SocialLinks = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Wait for Hero parent (1s) + slight offset
//     const timer = setTimeout(() => setIsVisible(true), 1800);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="absolute top-12 left-6 md:top-20 md:left-12 z-50 flex flex-col items-center gap-8">
//       {/* 1. Staggered Vertical Line - "Grows" first */}
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: 100, opacity: 1 }}
//         transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//         className="w-px bg-gradient-to-b from-white/60 via-white/20 to-transparent"
//       />

//       {/* 2. Icons container */}
//       <div className="flex flex-col gap-6">
//         {SOCIAL_LINKS.map((link, index) => (
//           <motion.div
//             key={link.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ 
//               delay: index * 0.1, 
//               duration: 0.8, 
//               ease: "easeOut" 
//             }}
//           >
//             <MagneticElement>
//               <a
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative group block p-3"
//               >
//                 {/* Minimalist Hover Ring */}
//                 <span className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-full scale-50 group-hover:scale-100 transition-all duration-500" />
                
//                 <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
//                   {link.icon}
//                 </div>
//               </a>
//             </MagneticElement>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SocialLinks;