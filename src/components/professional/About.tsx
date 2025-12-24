"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Stats data
const STATS = [
    {
        value: 75,
        suffix: "%",
        label: "Faster Frontend Builds",
        sublabel: "(D2D_Handoff)",
    },
    {
        value: 90,
        suffix: "%",
        label: "Reduction in Errors",
        sublabel: "(GravyWork)",
    },
    {
        value: 3.97,
        decimals: 2,
        suffix: "/4.0",
        label: "GPA at UCF",
    },
    {
        isText: true,
        displayValue: "AWS",
        label: "Certified",
        sublabel: "Developer Associate",
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

// Animated Counter Component
function AnimatedCounter({
    value,
    suffix = "",
    decimals = 0,
    isInView,
}: {
    value: number;
    suffix?: string;
    decimals?: number;
    isInView: boolean;
}) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="text-4xl md:text-5xl font-bold text-accent-primary"
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            >
                {isInView ? (
                    <Counter end={value} decimals={decimals} suffix={suffix} />
                ) : (
                    `0${suffix}`
                )}
            </motion.span>
        </motion.span>
    );
}

// Simple Counter that animates
function Counter({
    end,
    decimals = 0,
    suffix = "",
}: {
    end: number;
    decimals?: number;
    suffix?: string;
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);

    return (
        <motion.span
            ref={nodeRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onAnimationStart={() => {
                    if (nodeRef.current) {
                        const duration = 2000;
                        const startTime = performance.now();

                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // Easing: cubic-bezier(0.4, 0, 0.2, 1)
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            const currentValue = end * easeOut;

                            if (nodeRef.current) {
                                nodeRef.current.textContent = `${currentValue.toFixed(decimals)}${suffix}`;
                            }

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else if (nodeRef.current) {
                                nodeRef.current.textContent = `${end.toFixed(decimals)}${suffix}`;
                            }
                        };

                        requestAnimationFrame(animate);
                    }
                }}
            >
                0{suffix}
            </motion.span>
        </motion.span>
    );
}

// Stat Card Component
function StatCard({
    stat,
    isInView,
}: {
    stat: (typeof STATS)[0];
    isInView: boolean;
}) {
    return (
        <motion.div
            variants={itemVariants}
            className={cn(
                "p-lg rounded-card",
                "bg-[rgba(26,26,26,0.5)]",
                "border border-[rgba(255,255,255,0.1)]",
                "backdrop-blur-sm",
                "transition-all duration-hover",
                "hover:border-accent-primary/30 hover:translate-y-[-4px] hover:shadow-card-hover"
            )}
        >
            {/* Value */}
            <div className="mb-sm">
                {stat.isText ? (
                    <span className="text-4xl md:text-5xl font-bold text-accent-primary">
                        {stat.displayValue}
                    </span>
                ) : (
                    <AnimatedCounter
                        value={stat.value!}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                        isInView={isInView}
                    />
                )}
            </div>

            {/* Label */}
            <p className="text-foreground-primary font-medium text-base mb-xs">
                {stat.label}
            </p>

            {/* Sublabel */}
            {stat.sublabel && (
                <p className="text-foreground-secondary text-sm">{stat.sublabel}</p>
            )}
        </motion.div>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-5xl px-lg md:px-2xl bg-background-primary"
        >
            <motion.div
                className="max-w-content mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="mb-3xl" variants={itemVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-md">About Me</h2>
                    <div className="w-16 h-1 bg-accent-primary rounded-full" />
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl items-start">
                    {/* Left Side - Text Content */}
                    <motion.div className="space-y-lg" variants={itemVariants}>
                        <p className="text-lg md:text-xl text-foreground-primary leading-relaxed">
                            I don't just write code—
                            <span className="text-accent-primary font-semibold">
                                I build products.
                            </span>
                        </p>

                        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                            From concept to production, I architect scalable systems that
                            solve real problems.
                        </p>

                        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                            By combining modern cloud infrastructure with cutting-edge AI
                            tools, I deliver solutions{" "}
                            <span className="text-accent-primary font-medium">
                                75% faster
                            </span>{" "}
                            without compromising quality.
                        </p>

                        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                            Whether it's reducing scheduling errors by{" "}
                            <span className="text-accent-primary font-medium">90%</span> or
                            automating UI handoffs for entire teams, I turn ambitious ideas
                            into production reality.
                        </p>

                        <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                            Currently pursuing my{" "}
                            <span className="text-foreground-primary font-medium">
                                Master's in Computer Science at UCF
                            </span>{" "}
                            (GPA: 3.97/4.0),{" "}
                            <span className="text-foreground-primary font-medium">
                                AWS Certified
                            </span>
                            , and building real-world products that matter.
                        </p>
                    </motion.div>

                    {/* Right Side - Stats Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-md"
                        variants={containerVariants}
                    >
                        {STATS.map((stat, index) => (
                            <StatCard key={index} stat={stat} isInView={isInView} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
