"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center px-6 pt-11"
        >
            <div className="max-w-[980px] mx-auto text-center">
                {/* NAME - Primary identifier */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-white"
                    style={{
                        letterSpacing: "-0.03em",
                        lineHeight: "1.05",
                    }}
                >
                    Kishan Goli
                </motion.h1>

                {/* ROLE - Clear positioning */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl md:text-2xl font-medium mb-6 text-white/70"
                >
                    Full Stack Engineer building real-time systems at scale
                </motion.p>

                {/* CREDENTIALS - Proof of credibility */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl font-medium mb-4 text-white/50"
                    style={{ letterSpacing: "-0.01em" }}
                >
                    MS Computer Science @ UCF · AWS Certified Developer
                </motion.p>

                {/* KEY METRICS - Impact at a glance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex gap-6 md:gap-10 justify-center flex-wrap mb-12 text-[#6E6E73]"
                >
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
                        <div className="text-xs md:text-sm">Daily API Requests</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
                        <div className="text-xs md:text-sm">Concurrent Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">3.97</div>
                        <div className="text-xs md:text-sm">GPA</div>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex gap-4 justify-center flex-wrap"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-full bg-white text-black text-[14px] font-medium hover:bg-white/90 transition-all"
                    >
                        View Projects
                    </a>
                    <a
                        href="/resume/kishan_goli_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-white/20 text-white text-[14px] font-medium hover:bg-white/5 transition-all"
                    >
                        Download Resume
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col items-center gap-2 text-white/30"
                    >
                        <span className="text-xs">Scroll</span>
                        <ArrowDown size={16} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
