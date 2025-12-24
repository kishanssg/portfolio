"use client";

import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = [
    { label: "GitHub", href: SITE_CONFIG.social.github },
    { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
    { label: "Email", href: `mailto:${SITE_CONFIG.email}` },
];

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/10">
            <div className="max-w-[980px] mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p className="text-[12px] text-[#6E6E73]">
                        © {new Date().getFullYear()} Kishan Goli. All rights reserved.
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] text-[#6E6E73] hover:text-white transition-colors inline-flex items-center gap-1"
                            >
                                {link.label}
                                <ArrowUpRight size={10} />
                            </a>
                        ))}
                    </div>

                    {/* Built with */}
                    <p className="text-[12px] text-[#6E6E73]">
                        Built with Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
