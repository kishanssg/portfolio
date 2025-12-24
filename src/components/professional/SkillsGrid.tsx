"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";

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

interface SkillPillProps {
    skill: string;
}

function SkillPill({ skill }: SkillPillProps) {
    return (
        <span
            className={cn(
                "inline-block px-md py-xs",
                "text-sm font-medium",
                "rounded-full",
                "bg-accent-primary/10 text-accent-primary",
                "border border-accent-primary/30",
                "transition-all duration-hover",
                "hover:bg-accent-primary/20 hover:border-accent-primary/50"
            )}
        >
            {skill}
        </span>
    );
}

interface SkillCategoryCardProps {
    category: string;
    skills: string[];
    index: number;
}

function SkillCategoryCard({ category, skills, index }: SkillCategoryCardProps) {
    return (
        <motion.div
            className={cn(
                "p-lg rounded-card",
                "bg-[rgba(26,26,26,0.5)]",
                "border border-[rgba(255,255,255,0.1)]",
                "backdrop-blur-sm",
                "transition-all duration-hover",
                "hover:border-accent-primary/30"
            )}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Category Header */}
            <h3 className="text-lg font-semibold text-foreground-primary mb-md flex items-center gap-sm">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
                {category}
            </h3>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-sm">
                {skills.map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillsGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-5xl px-lg md:px-2xl bg-background-secondary"
        >
            <motion.div
                className="max-w-content mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="mb-3xl" variants={itemVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-md">
                        Technical Skills
                    </h2>
                    <p className="text-lg text-foreground-secondary max-w-2xl">
                        A comprehensive toolkit built through hands-on experience across
                        full-stack development, cloud infrastructure, and AI integration.
                    </p>
                    <div className="w-16 h-1 bg-accent-primary rounded-full mt-md" />
                </motion.div>

                {/* Skills Grid */}
                <div
                    className={cn(
                        "grid gap-lg",
                        "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
                        // Make "Other" span 2 columns on larger screens
                        "[&>*:last-child]:md:col-span-2 [&>*:last-child]:xl:col-span-1"
                    )}
                >
                    {skillsData.map((skillCategory, index) => (
                        <SkillCategoryCard
                            key={skillCategory.category}
                            category={skillCategory.category}
                            skills={skillCategory.skills}
                            index={index}
                        />
                    ))}
                </div>

                {/* Certifications Badge */}
                <motion.div
                    className="mt-3xl flex flex-wrap items-center justify-center gap-md"
                    variants={itemVariants}
                >
                    <div
                        className={cn(
                            "flex items-center gap-sm px-lg py-md rounded-card",
                            "bg-accent-primary/10 border border-accent-primary/30"
                        )}
                    >
                        <span className="text-2xl">🏆</span>
                        <div>
                            <p className="text-sm font-semibold text-accent-primary">
                                AWS Certified
                            </p>
                            <p className="text-xs text-foreground-secondary">
                                Developer Associate
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
