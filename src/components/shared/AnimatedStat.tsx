"use client";

import { useEffect, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedStat({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    damping: 100,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [springValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}
