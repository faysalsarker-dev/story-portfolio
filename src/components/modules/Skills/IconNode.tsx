"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ----------------------------------
 Types
-----------------------------------*/

export type IconSide = "left" | "right" | "top" | "bottom";

export interface IconTechNode {
  x: number;
  y: number;
  color: string;
  svg: React.ReactNode;
  name: string;
}

export interface IconNodeProps {
  tech: IconTechNode;
  side: IconSide;
}

/* ----------------------------------
 Component
-----------------------------------*/

const IconNode: React.FC<IconNodeProps> = ({ tech, side }) => {
  return (
    <div
      style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group select-none"
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all"
      >
        {/* Icon */}
        <div className="h-12 w-12 p-2" style={{ color: tech.color }}>
          
            {tech.svg}
         {/* {tech.name} */}
        </div>

        {/* Target Solder Dot */}
        <div
          className={cn(
            "absolute h-2 w-2 rounded-full border border-zinc-600 shadow-[0_0_8px_white]",
            side === "left" && "-right-1 top-1/2 -translate-y-1/2",
            side === "right" && "-left-1 top-1/2 -translate-y-1/2",
            side === "top" && "-bottom-1.25 left-1/2 -translate-x-1/2",
            side === "bottom" && "-top-1.25 left-1/2 -translate-x-1/2"
          )}
          style={{ backgroundColor: tech.color }}
        />
      </motion.div>
    </div>
  );
};

export default IconNode;
