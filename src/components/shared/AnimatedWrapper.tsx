"use client";
import { motion, type Variants } from "framer-motion";

type AnimatedWrapperProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedWrapper({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  once = true,
  amount = 0.2,
}: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: amount }}
      transition={{ duration: 0.5, delay: delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
