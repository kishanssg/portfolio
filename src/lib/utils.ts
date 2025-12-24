import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conflicting classes properly
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

/**
 * Smooth scroll to an element by ID
 */
export function scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        const navHeight = 64; // Match --nav-height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - navHeight,
            behavior: "smooth",
        });
    }
}
