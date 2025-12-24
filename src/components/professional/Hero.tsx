"use client";

import { useEffect, useState } from "react";
import { ArrowDown, FileText, FolderKanban } from "lucide-react";
import { motion } from "framer-motion";
import { cn, scrollToSection } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

// Animation variants for staggered fade-in
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
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

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScrollToProjects = () => {
        scrollToSection("projects");
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <section className="relative flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center justify-center px-lg md:px-2xl overflow-hidden">
                <div className="relative z-10 text-center max-w-4xl mx-auto" />
            </section>
        );
    }

    return (
        <section
            id="hero"
            className="relative flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center justify-center px-lg md:px-2xl overflow-hidden"
        >
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 -z-10">
                {/* Radial gradient from center */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,170,0.08)_0%,transparent_70%)]" />
                {/* Gradient orbs for premium feel */}
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Small intro text */}
                <motion.p
                    className="text-sm md:text-base text-accent-primary font-medium tracking-widest uppercase mb-md"
                    variants={itemVariants}
                >
                    Welcome to my portfolio
                </motion.p>

                {/* Name - Large and Bold */}
                <motion.h1
                    className={cn(
                        "font-bold tracking-tight mb-lg",
                        // Fluid typography with clamp()
                        "text-[clamp(2.5rem,8vw,5rem)]",
                        "leading-[1.1]"
                    )}
                    variants={itemVariants}
                >
                    <span className="block text-foreground-primary">
                        {SITE_CONFIG.title}
                    </span>
                </motion.h1>

                {/* Tagline with accent color */}
                <motion.p
                    className={cn(
                        "font-semibold mb-md",
                        "text-[clamp(1.25rem,3vw,1.75rem)]",
                        "text-accent-primary"
                    )}
                    variants={itemVariants}
                >
                    {SITE_CONFIG.tagline}
                </motion.p>

                {/* Subtitle with arrow flow */}
                <motion.p
                    className={cn(
                        "font-medium mb-lg",
                        "text-[clamp(1rem,2.5vw,1.5rem)]",
                        "text-foreground-secondary"
                    )}
                    variants={itemVariants}
                >
                    <span className="inline-flex items-center gap-2 md:gap-3 flex-wrap justify-center">
                        <span>Idea</span>
                        <span className="text-accent-primary">→</span>
                        <span>Execution</span>
                        <span className="text-accent-primary">→</span>
                        <span>Scalable Systems</span>
                    </span>
                </motion.p>

                {/* Description */}
                <motion.p
                    className={cn(
                        "max-w-2xl mx-auto mb-2xl",
                        "text-[clamp(1rem,2vw,1.25rem)]",
                        "text-foreground-secondary leading-relaxed"
                    )}
                    variants={itemVariants}
                >
                    {SITE_CONFIG.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-md"
                    variants={buttonVariants}
                >
                    {/* Primary CTA - View Projects */}
                    <button
                        onClick={handleScrollToProjects}
                        className={cn(
                            "group relative inline-flex items-center gap-sm",
                            "px-xl py-md rounded-button",
                            "bg-accent-primary text-background-primary",
                            "font-semibold text-base",
                            "transition-all duration-hover ease-smooth",
                            "hover:scale-[1.02] hover:shadow-neon",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                        )}
                    >
                        <FolderKanban size={20} aria-hidden="true" />
                        <span>View Projects</span>
                    </button>

                    {/* Secondary CTA - Download Resume */}
                    <a
                        href="/assets/resume/kishan_goli_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group relative inline-flex items-center gap-sm",
                            "px-xl py-md rounded-button",
                            "border border-accent-primary/50 text-accent-primary",
                            "bg-transparent",
                            "font-semibold text-base",
                            "transition-all duration-hover ease-smooth",
                            "hover:bg-accent-primary/10 hover:border-accent-primary",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                        )}
                    >
                        <FileText size={20} aria-hidden="true" />
                        <span>Download Resume</span>
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <button
                    onClick={() => scrollToSection("about")}
                    className={cn(
                        "flex flex-col items-center gap-sm text-foreground-secondary",
                        "transition-colors duration-hover",
                        "hover:text-accent-primary"
                    )}
                    aria-label="Scroll to About section"
                >
                    <span className="text-sm font-medium">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ArrowDown size={20} aria-hidden="true" />
                    </motion.div>
                </button>
            </motion.div>
        </section>
    );
}
