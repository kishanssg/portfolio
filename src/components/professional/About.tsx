"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: "75%", label: "Faster Frontend Builds" },
    { value: "90%", label: "Reduction in Errors" },
    { value: "3.97", label: "GPA at UCF" },
    { value: "AWS", label: "Developer Associate" },
];

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            id="about"
            ref={ref}
            className="py-24 md:py-32 px-6"
        >
            <div className="max-w-[980px] mx-auto">
                {/* Two column layout */}
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[12px] font-normal tracking-widest text-[#6E6E73] uppercase mb-4">
                            About
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                            Building products<br />that scale.
                        </h2>
                        <p className="text-[17px] text-[#A1A1A6] leading-relaxed mb-6">
                            I'm a Full Stack Developer at Park My Ride, where I build real-time
                            systems that handle 500+ concurrent users. Previously, I reduced
                            scheduling errors by 90% at GravyWork through intelligent automation.
                        </p>
                        <p className="text-[17px] text-[#A1A1A6] leading-relaxed">
                            My approach: understand the problem deeply, then build the simplest
                            solution that works. I leverage AI to accelerate development without
                            sacrificing code quality.
                        </p>
                    </motion.div>

                    {/* Right - Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-[12px] text-[#6E6E73]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
