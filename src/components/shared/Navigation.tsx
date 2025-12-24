"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ArrowLeft } from "lucide-react";
import { useMode } from "@/hooks/useMode";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn, scrollToSection } from "@/lib/utils";

export default function Navigation() {
    const { mode, toggleMode, isPortal } = useMode();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    // Handle scroll for sticky nav background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle active section detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );

        NAV_LINKS.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Handle nav link click
    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const id = href.replace("#", "");
            scrollToSection(id);
            setIsMobileMenuOpen(false);
        },
        []
    );

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMobileMenuOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-nav h-[var(--nav-height)] md:h-16",
                "transition-all duration-medium ease-smooth",
                isScrolled
                    ? "bg-background-primary/90 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <nav
                className="mx-auto flex h-full max-w-content items-center justify-between px-lg md:px-2xl"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className={cn(
                        "text-lg font-semibold tracking-tight",
                        "transition-colors duration-hover",
                        "hover:text-accent-primary focus-visible:text-accent-primary"
                    )}
                >
                    {SITE_CONFIG.name}
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex items-center gap-xl">
                    {NAV_LINKS.map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "relative text-sm font-medium py-2",
                                    "transition-colors duration-hover",
                                    activeSection === link.id
                                        ? "text-accent-primary"
                                        : "text-foreground-secondary hover:text-foreground-primary"
                                )}
                            >
                                {link.label}
                                {/* Active indicator */}
                                <span
                                    className={cn(
                                        "absolute -bottom-1 left-0 h-0.5 bg-accent-primary",
                                        "transition-all duration-hover",
                                        activeSection === link.id ? "w-full" : "w-0"
                                    )}
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right side: Portal Toggle + Mobile Menu Button */}
                <div className="flex items-center gap-md">
                    {/* Portal Toggle Button */}
                    <button
                        onClick={toggleMode}
                        className={cn(
                            "hidden md:flex items-center gap-sm px-lg py-sm",
                            "rounded-button text-sm font-medium",
                            "transition-all duration-hover",
                            isPortal
                                ? "bg-portal-neonGreen/10 text-portal-neonGreen border border-portal-neonGreen/30 hover:bg-portal-neonGreen/20"
                                : "bg-accent-primary/10 text-accent-primary border border-accent-primary/30 hover:bg-accent-primary/20"
                        )}
                        aria-label={isPortal ? "Exit Portal Mode" : "Enter Portal Mode"}
                    >
                        {isPortal ? (
                            <>
                                <ArrowLeft size={16} aria-hidden="true" />
                                <span>Exit Portal</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={16} aria-hidden="true" />
                                <span>🌀 Bored? Enter the Portal →</span>
                            </>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "md:hidden p-sm rounded-button",
                            "transition-colors duration-hover",
                            "hover:bg-background-secondary"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} aria-hidden="true" />
                        ) : (
                            <Menu size={24} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 top-[var(--nav-height-mobile)] bg-background-primary/95 backdrop-blur-lg",
                    "md:hidden transition-all duration-medium ease-smooth",
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                aria-hidden={!isMobileMenuOpen}
            >
                <div className="flex flex-col items-center justify-center h-full gap-3xl">
                    {/* Mobile Nav Links */}
                    <ul className="flex flex-col items-center gap-xl">
                        {NAV_LINKS.map((link, index) => (
                            <li
                                key={link.id}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                                    transition: `opacity 300ms ease ${index * 50}ms, transform 300ms ease ${index * 50}ms`
                                }}
                            >
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        "text-2xl font-semibold",
                                        "transition-colors duration-hover",
                                        activeSection === link.id
                                            ? "text-accent-primary"
                                            : "text-foreground-primary hover:text-accent-primary"
                                    )}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Portal Toggle */}
                    <button
                        onClick={() => {
                            toggleMode();
                            setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                            "flex items-center gap-sm px-xl py-md",
                            "rounded-button text-base font-medium",
                            "transition-all duration-hover",
                            isPortal
                                ? "bg-portal-neonGreen text-background-primary"
                                : "bg-accent-primary text-background-primary"
                        )}
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                            transition: `opacity 300ms ease 250ms, transform 300ms ease 250ms`
                        }}
                    >
                        {isPortal ? (
                            <>
                                <ArrowLeft size={20} aria-hidden="true" />
                                <span>Exit Portal</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} aria-hidden="true" />
                                <span>Enter the Portal</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
