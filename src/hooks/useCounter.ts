"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
}

/**
 * Custom hook for animated number counter
 * Triggers when element is in viewport
 */
export function useCounter({
    end,
    duration = 2000,
    decimals = 0,
    suffix = "",
    prefix = "",
}: UseCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        animateCount();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [hasAnimated, end, duration]);

    const animateCount = () => {
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: cubic-bezier(0.4, 0, 0.2, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (end - startValue) * easeOut;

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    };

    const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

    return { count, formattedCount, ref, hasAnimated };
}
