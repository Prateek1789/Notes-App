"use client"

import Link, { LinkProps } from "next/link";
import { Transition, Variants } from "motion";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Links = "Anchor" | "NextLink";

const MotionNextLink = motion.create(Link);
const MotionAnchorLink = motion.create("a");

const topVariant: Variants = {
  initial: { y: 0 },
  hovered: { y: "-100%" }
};

const bottomVariant: Variants = {
  initial: { y: "100%" },
  hovered: { y: 0 }
}

const transition: Transition = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1], 
};

type FLipLinkProps = {
  linkType?: Links,
  text: string,
  href: string,
  delayStep?: number,
} & React.ComponentProps<"a"> 
  & MotionProps 
  & LinkProps;

const FlipLink = ({
  linkType = 'NextLink',
  text,
  href = "#",
  delayStep = 0.015,
  className,
  ...props
}: FLipLinkProps) => {
  const MotionLink = linkType === "NextLink" ? MotionNextLink : MotionAnchorLink;
  const split = text.split("");

  return (
    <MotionLink
      initial="initial"
      whileHover="hovered"
      href={href} 
      aria-label={text}
      className={cn("relative flex text-sm font-medium overflow-hidden whitespace-nowrap", className)}
      style={{ lineHeight: 0.98 }}
      { ...props }>

      <div aria-hidden={true}>
        {split.map((char, i) => {
          return (
            <motion.div 
              variants={topVariant}
              transition={{
                ...transition,
                delay: delayStep * i
              }}
              className="inline-block"
              key={`top-${char}-${i}`}>
              {char}
            </motion.div>
          )
        })}
      </div>

      <div 
        className="absolute inset-0"
        aria-hidden={true}>
        {split.map((char, i) => {
          return (
            <motion.div
              variants={bottomVariant}
              transition={{ 
                ...transition,
                delay: delayStep * i,
              }}
              className="inline-block" 
              key={`bottom-${char}-${i}`}>
              {char}
            </motion.div>
          )
        })}
      </div>
    </MotionLink>
  )
};

export default FlipLink