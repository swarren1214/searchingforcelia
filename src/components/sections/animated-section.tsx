"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export function AnimatedSection({ className, children, id }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={cn("w-full", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("w-full", className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.section>
  );
}
