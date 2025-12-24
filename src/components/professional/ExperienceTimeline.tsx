"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, formatDateRange } from "@/data/experience";

export default function ExperienceTimeline() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section
            id="experience"
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
                        Experience
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Where I've Worked
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-0">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative border-t border-white/10 py-8 md:py-12"
                        >
                            <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                                {/* Date - formatted nicely */}
                                <div className="text-[14px] text-[#6E6E73]">
                                    {formatDateRange(exp.startDate, exp.endDate)}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">
                                        {exp.title}
                                    </h3>
                                    <p className="text-[14px] text-[#A1A1A6] mb-4">
                                        {exp.company} • {exp.location}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-2">
                                        {exp.highlights.slice(0, 3).map((highlight, i) => (
                                            <li
                                                key={i}
                                                className="text-[14px] text-[#6E6E73] flex items-start gap-2"
                                            >
                                                <span className="text-white/30 mt-1.5">•</span>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
