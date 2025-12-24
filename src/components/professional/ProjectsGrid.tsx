"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

// Animation variants for staggered children
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

const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

export default function ProjectsGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const handleProjectClick = (projectId: string) => {
        // TODO: Open project modal or navigate to project detail page
        console.log("View project:", projectId);
    };

    return (
        <section
            id="projects"
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
                <motion.div className="mb-3xl" variants={headerVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-md">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-foreground-secondary max-w-2xl">
                        A selection of projects that showcase my expertise in building
                        scalable systems, AI-powered tools, and real-world applications.
                    </p>
                    <div className="w-16 h-1 bg-accent-primary rounded-full mt-md" />
                </motion.div>

                {/* Projects Grid */}
                <div
                    className={cn(
                        "grid gap-lg md:gap-xl",
                        "grid-cols-1 lg:grid-cols-2"
                    )}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={() => handleProjectClick(project.id)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
