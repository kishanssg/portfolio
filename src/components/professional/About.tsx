"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: "10K+", label: "Daily API Requests" },
    { value: "95%", label: "Test Coverage" },
    { value: "3.97", label: "GPA @ UCF" },
    { value: "AWS", label: "Certified Developer" },
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
                            Building production<br />systems at scale.
                        </h2>
                        <p className="text-[17px] text-[#A1A1A6] leading-relaxed mb-6">
                            Software Engineer building real-time systems that serve thousands of users daily.
                            Currently at <span className="text-white">Park My Ride</span> (real-time parking coordination)
                            and <span className="text-white">GravyWork</span> (workforce scheduling platform).
                        </p>
                        <p className="text-[17px] text-[#A1A1A6] leading-relaxed mb-6">
                            <span className="text-white">MS Computer Science</span> candidate at University of Central Florida
                            with a 3.97 GPA. AWS Developer Associate certified. Previously led cybersecurity
                            initiatives educating 200+ students at VIT-AP.
                        </p>
                        <p className="text-[17px] text-[#A1A1A6] leading-relaxed">
                            My approach: understand the problem deeply, architect for scale, ship fast, iterate based on data.
                        </p>
                    </motion.div>

                    {/* Right - Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat) => (
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

