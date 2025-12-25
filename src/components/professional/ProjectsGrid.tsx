"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsGrid() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section
            id="projects"
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
                        Projects
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        What I'm Building
                    </h2>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all"
                        >
                            {/* Image placeholder */}
                            <div className="aspect-video bg-[#161616] flex items-center justify-center">
                                <span className="text-6xl opacity-20">
                                    {project.title.charAt(0)}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/80 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-[14px] text-[#6E6E73] mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Metric */}
                                {project.metrics && project.metrics[0] && (
                                    <div className="text-2xl font-semibold text-white mb-6">
                                        {project.metrics[0].value}
                                        <span className="text-[14px] font-normal text-[#6E6E73] ml-2">
                                            {project.metrics[0].label}
                                        </span>
                                    </div>
                                )}

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-[#6E6E73]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[12px] text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                                        >
                                            GitHub <ArrowUpRight size={12} />
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[12px] text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                                        >
                                            Live <ArrowUpRight size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
