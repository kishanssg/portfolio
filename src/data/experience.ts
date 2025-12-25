/**
 * Experience data for portfolio
 * Chronological work history
 */

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

export const experiences: Experience[] = [
    {
        id: "gravywork",
        title: "Software Engineer",
        company: "GravyWork",
        location: "Orlando, FL · Remote",
        startDate: "2025-10",
        endDate: "Present",
        highlights: [
            "Owned end-to-end delivery of workforce-scheduling platform from 0→1, shipping MVP in 8 weeks",
            "Designed conflict-aware scheduling engine supporting 20+ concurrent workers with real-time sync",
            "Drove 40% reduction in manager ops burden through automated payroll and timesheet systems",
        ],
        techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
        id: "park-my-ride",
        title: "Software Engineer",
        company: "Park My Ride, LLC",
        location: "Houston, TX · Remote",
        startDate: "2025-05",
        endDate: "Present",
        highlights: [
            "Led architecture of distributed real-time system achieving sub-100ms latency at 200+ concurrent connections",
            "Drove 40% API performance improvement serving 10K+ daily requests through query optimization and caching",
            "Established testing infrastructure with 95% coverage across mobile and backend systems",
            "Reduced mobile app bundle size by 30% through code splitting and lazy loading",
        ],
        techStack: ["React Native", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS", "Docker"],
    },
    {
        id: "null-chapter",
        title: "Technical Lead",
        company: "Null (InfoSec) Chapter - VIT-AP",
        location: "Amaravati, India · On-site",
        startDate: "2021-07",
        endDate: "2022-07",
        highlights: [
            "Led 5+ cybersecurity workshops on MITM attacks and vulnerability analysis, training 200+ students",
            "Grew InfoSec club participation by 40% through campus-wide security initiatives",
            "Mentored junior members on ethical hacking practices and security fundamentals",
        ],
        techStack: ["Git", "Design", "Cybersecurity", "Event Management", "Mentorship"],
    },
];

// Helper function to format date range
export const formatDateRange = (startDate: string, endDate: string): string => {
    const formatDate = (dateStr: string): string => {
        if (dateStr === "Present") return "Present";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
