"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { CHIP_POS } from "./Motherboard";

/* ----------------------------------
 Types
-----------------------------------*/

export type BeamSide = "left" | "right" | "top" | "bottom";

export interface TechNode {
  x: number;
  y: number;
  color: string;
}

export interface StableBeamProps {
  tech: TechNode;
  index: number;
  side: BeamSide;
  totalInSide: number;
}

/* ----------------------------------
 Component
-----------------------------------*/

const StableBeam: React.FC<StableBeamProps> = ({
  tech,
  index,
  side,
  totalInSide,
}) => {
  const id = useId();

  const startX = CHIP_POS.x;
  const startY = CHIP_POS.y;

  const pinSpacing = 12 / (totalInSide + 1);
  const pinStartY = startY - 6 + (index + 1) * pinSpacing;
  const pinStartX = side === "left" ? startX - 5.5 : startX + 5.5;

  const laneOffset = (index + 1) * 2;
  const midX =
    side === "left" ? pinStartX - laneOffset : pinStartX + laneOffset;

  const path =
    side === "top"
      ? `M ${startX} ${startY - 7.5} V ${tech.y}`
      : side === "bottom"
      ? `M ${startX} ${startY + 7.5} V ${tech.y}`
      : `M ${pinStartX} ${pinStartY} H ${midX} V ${tech.y} H ${tech.x}`;

  return (
    <svg
      key={id}
      className="absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="0.12"
        className="opacity-20"
      />

      <motion.path
        d={path}
        fill="none"
        stroke={tech.color}
        strokeWidth="0.3"
        strokeLinecap="round"
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1, 0],
          pathOffset: [0, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

export default StableBeam;
