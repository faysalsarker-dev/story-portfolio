"use client";

import { useRef } from "react";
import PrecisionBeam from "./PrecisionBeam";
import TechNode from "./IconNode";
import { RefObject } from "react";

type BeamSide = "left" | "right" | "top" | "bottom";

interface TechItem {
  name: string;
  color: string;
  delay?: number;
  pos: React.CSSProperties;
}


interface TechGroupProps {
  tech: TechItem;
  jsRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  index: number;
  total: number;
  side: BeamSide;
}


const TechGroup = ({
  tech,
  jsRef,
  containerRef,
  index,
  total,
  side,
}: TechGroupProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PrecisionBeam
        containerRef={containerRef}
        fromRef={jsRef}
        toRef={nodeRef}
        color={tech.color}
        delay={tech.delay}
        index={index}
        side={side}
        totalInSide={total}
      />

      <TechNode
        ref={nodeRef}
        style={tech.pos}
        color={tech.color}
        delay={tech.delay}
      >
        {tech.name}
      </TechNode>


    </>
  );
};

export default TechGroup;
