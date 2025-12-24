"use client";

import Image from "next/image";
import { ExternalLink, Github, ChevronRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const primaryMetric = project.metrics[0];

    return (
        <motion.article
            className={cn(
                "group relative flex flex-col",
                "rounded-card overflow-hidden",
                "bg-[rgba(26,26,26,0.5)]",
                "border border-[rgba(255,255,255,0.1)]",
                "backdrop-blur-sm",
                "transition-all duration-[250ms] ease-out",
                "hover:translate-y-[-4px] hover:shadow-card-hover hover:border-accent-primary/30"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Thumbnail Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-background-secondary">
                <Image
                    src={project.thumbnail}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-medium group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span
                        className={cn(
                            "px-sm py-xs text-xs font-medium rounded-full uppercase tracking-wide",
                            "bg-background-primary/80 backdrop-blur-sm",
                            "border border-[rgba(255,255,255,0.1)]"
                        )}
                    >
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-lg">
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground-primary mb-xs line-clamp-2 group-hover:text-accent-primary transition-colors duration-hover">
                    {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-foreground-secondary mb-md line-clamp-2">
                    {project.tagline}
                </p>

                {/* Key Metric */}
                {primaryMetric && (
                    <div className="flex items-center gap-sm mb-md">
                        <BarChart3
                            size={18}
                            className="text-accent-primary flex-shrink-0"
                            aria-hidden="true"
                        />
                        <div>
                            <span className="text-xl font-bold text-accent-primary">
                                {primaryMetric.value}
                            </span>
                            <span className="text-sm text-foreground-secondary ml-sm">
                                {primaryMetric.label}
                            </span>
                        </div>
                    </div>
                )}

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-xs mb-lg">
                    {project.techStack.slice(0, 4).map((tech) => (
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
                    {project.techStack.length > 4 && (
                        <span
                            className={cn(
                                "px-sm py-xs text-xs font-medium rounded-full",
                                "bg-foreground-secondary/10 text-foreground-secondary"
                            )}
                        >
                            +{project.techStack.length - 4} more
                        </span>
                    )}
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-1" />

                {/* CTA Buttons */}
                <div className="flex items-center gap-sm pt-md border-t border-[rgba(255,255,255,0.05)]">
                    {/* View Details Button */}
                    <button
                        onClick={onClick}
                        className={cn(
                            "flex items-center gap-xs px-md py-sm rounded-button",
                            "bg-accent-primary text-background-primary",
                            "text-sm font-medium",
                            "transition-all duration-hover",
                            "hover:bg-accent-primary/90 hover:shadow-neon",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                        )}
                        aria-label={`View details for ${project.title}`}
                    >
                        View Details
                        <ChevronRight size={16} aria-hidden="true" />
                    </button>

                    {/* GitHub Link */}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex items-center gap-xs px-md py-sm rounded-button",
                                "border border-[rgba(255,255,255,0.2)] text-foreground-secondary",
                                "text-sm font-medium",
                                "transition-all duration-hover",
                                "hover:border-foreground-secondary hover:text-foreground-primary",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                            )}
                            aria-label={`View ${project.title} on GitHub`}
                        >
                            <Github size={16} aria-hidden="true" />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    )}

                    {/* Demo Link */}
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex items-center gap-xs px-md py-sm rounded-button",
                                "border border-[rgba(255,255,255,0.2)] text-foreground-secondary",
                                "text-sm font-medium",
                                "transition-all duration-hover",
                                "hover:border-foreground-secondary hover:text-foreground-primary",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                            )}
                            aria-label={`View live demo of ${project.title}`}
                        >
                            <ExternalLink size={16} aria-hidden="true" />
                            <span className="hidden sm:inline">Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
