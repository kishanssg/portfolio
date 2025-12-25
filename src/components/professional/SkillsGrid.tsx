"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData, SkillCategory } from "@/data/skills";

export default function SkillsGrid() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section
            id="skills"
            ref={ref}
            className="py-24 md:py-32 px-6"
        >
            <div className="max-w-[980px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <p className="text-[12px] font-normal tracking-widest text-[#6E6E73] uppercase mb-4">
                        Skills
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Technical Expertise
                    </h2>
                    <p className="text-[17px] text-[#6E6E73] max-w-xl">
                        Production-tested technologies I use to build scalable systems.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((category: SkillCategory, index: number) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <h3 className="text-[14px] font-medium text-white mb-4">
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="text-[12px] px-3 py-1.5 rounded-full bg-white/5 text-[#A1A1A6] hover:bg-white/10 hover:text-white transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
