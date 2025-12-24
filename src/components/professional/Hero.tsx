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
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-[14px] font-normal tracking-wide text-[#6E6E73] mb-4"
                >
                    Software Engineer & Builder
                </motion.p>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl lg:text-[96px] font-bold mb-6 text-white"
                    style={{
                        letterSpacing: "-0.03em",
                        lineHeight: "1.05",
                    }}
                >
                    Kishan Goli
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl md:text-4xl font-medium mb-4 text-[#A1A1A6]"
                    style={{ letterSpacing: "-0.01em" }}
                >
                    Idea → Execution → Scalable Systems
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl font-normal mb-12 text-[#6E6E73] max-w-2xl mx-auto"
                >
                    Leveraging AI to build faster, smarter, better.
                </motion.p>

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
                        className="flex flex-col items-center gap-3 text-white/30"
                    >
                        <span className="text-sm">Scroll</span>
                        <ArrowDown size={20} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
