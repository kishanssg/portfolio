"use client";

import { Linkedin, Github, Mail, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

// Footer links
const socialLinks = [
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: SITE_CONFIG.social.linkedin,
    },
    {
        icon: Github,
        label: "GitHub",
        href: SITE_CONFIG.social.github,
    },
    {
        icon: Mail,
        label: "Email",
        href: `mailto:${SITE_CONFIG.email}`,
    },
    {
        icon: FileText,
        label: "Resume",
        href: "/assets/resume/kishan_goli_resume.pdf",
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "py-xl px-lg md:px-2xl",
                "bg-[rgba(10,10,10,0.95)]",
                "border-t border-[rgba(255,255,255,0.1)]"
            )}
        >
            <div className="max-w-content mx-auto text-center space-y-lg">
                {/* Copyright */}
                <p className="text-foreground-secondary text-sm">
                    © {currentYear} {SITE_CONFIG.name}. Built with Next.js & ❤️
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-md flex-wrap">
                    {socialLinks.map((link, index) => (
                        <span key={link.label} className="flex items-center">
                            <a
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                className={cn(
                                    "inline-flex items-center gap-xs",
                                    "text-sm text-accent-primary",
                                    "transition-all duration-hover",
                                    "hover:text-accent-primary/80 hover:underline"
                                )}
                                aria-label={link.label}
                            >
                                <link.icon size={16} aria-hidden="true" />
                                {link.label}
                            </a>
                            {index < socialLinks.length - 1 && (
                                <span className="ml-md text-foreground-secondary/30">|</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Attribution */}
                <p className="text-foreground-secondary/60 text-xs flex items-center justify-center gap-xs">
                    Deployed on{" "}
                    <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary hover:text-accent-primary transition-colors inline-flex items-center gap-xs"
                    >
                        Vercel
                        <ExternalLink size={12} aria-hidden="true" />
                    </a>
                    <span className="mx-sm">•</span>
                    <a
                        href={SITE_CONFIG.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary hover:text-accent-primary transition-colors inline-flex items-center gap-xs"
                    >
                        Open Source on GitHub
                        <ExternalLink size={12} aria-hidden="true" />
                    </a>
                </p>
            </div>
        </footer>
    );
}
