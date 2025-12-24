// Mode types for Professional/Portal toggle
export type Mode = "professional" | "portal";

// Navigation link type
export interface NavLink {
    id: string;
    label: string;
    href: string;
}

// Project type
export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    metrics: {
        label: string;
        value: string;
    }[];
    techStack: string[];
    links: {
        github?: string;
        demo?: string;
        caseStudy?: string;
    };
    thumbnail: string;
    featured: boolean;
    category: "web" | "mobile" | "ai" | "tool";
}

// Experience type
export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | "Present";
    highlights: string[];
    techStack: string[];
}

// Skill category type
export interface SkillCategory {
    name: string;
    skills: string[];
}

// Contact form data
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}
