"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { experiences, formatDateRange } from "@/data/experience";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: {
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

interface TimelineEntryProps {
    experience: (typeof experiences)[0];
    isLast: boolean;
    index: number;
}

function TimelineEntry({ experience, isLast, index }: TimelineEntryProps) {
    const entryRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(entryRef, { once: true, amount: 0.3 });
    const isEducation = experience.company.includes("University");

    return (
        <motion.div
            ref={entryRef}
            className="relative pl-8 md:pl-12 pb-12 last:pb-0"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
        >
            {/* Timeline Line (hidden on mobile) */}
            {!isLast && (
                <motion.div
                    className="hidden md:block absolute left-[5px] top-3 bottom-0 w-0.5 bg-accent-primary/30"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ transformOrigin: "top" }}
                />
            )}

            {/* Timeline Dot */}
            <motion.div
                className={cn(
                    "absolute left-0 top-1 w-3 h-3 rounded-full",
                    "bg-accent-primary shadow-neon",
                    "ring-4 ring-background-primary"
                )}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Content Card */}
            <div
                className={cn(
                    "p-lg rounded-card",
                    "bg-[rgba(26,26,26,0.5)]",
                    "border border-[rgba(255,255,255,0.1)]",
                    "backdrop-blur-sm",
                    "transition-all duration-hover",
                    "hover:border-accent-primary/30"
                )}
            >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-sm mb-md">
                    <div>
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-semibold text-foreground-primary mb-xs">
                            {experience.title}
                        </h3>

                        {/* Company and Location */}
                        <div className="flex flex-wrap items-center gap-sm text-sm text-foreground-secondary">
                            <span className="flex items-center gap-xs">
                                {isEducation ? (
                                    <GraduationCap size={14} aria-hidden="true" />
                                ) : (
                                    <Briefcase size={14} aria-hidden="true" />
                                )}
                                <span className="font-medium text-accent-primary">
                                    {experience.company}
                                </span>
                            </span>
                            <span className="hidden sm:inline text-foreground-secondary/50">
                                •
                            </span>
                            <span className="flex items-center gap-xs">
                                <MapPin size={14} aria-hidden="true" />
                                {experience.location}
                            </span>
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-xs text-sm text-foreground-secondary">
                        <Calendar size={14} aria-hidden="true" />
                        <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
                    </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-sm mb-md">
                    {experience.highlights.map((highlight, idx) => (
                        <li
                            key={idx}
                            className="flex items-start gap-sm text-sm text-foreground-secondary"
                        >
                            <span className="text-accent-primary mt-1.5 flex-shrink-0">•</span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-xs">
                    {experience.techStack.map((tech) => (
                        <span
                            key={tech}
                            className={cn(
                                "px-sm py-xs text-xs font-medium rounded-full",
                                "bg-accent-primary/10 text-accent-primary",
                                "border border-accent-primary/20"
                            )}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ExperienceTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            id="experience"
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-md">Experience</h2>
                    <p className="text-lg text-foreground-secondary max-w-2xl">
                        My journey as a software engineer, from building scalable systems to
                        leading technical communities.
                    </p>
                    <div className="w-16 h-1 bg-accent-primary rounded-full mt-md" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {experiences.map((experience, index) => (
                        <TimelineEntry
                            key={experience.id}
                            experience={experience}
                            isLast={index === experiences.length - 1}
                            index={index}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
