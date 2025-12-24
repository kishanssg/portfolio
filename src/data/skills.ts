/**
 * Skills data for portfolio
 * Categorized technical skills
 */

export interface SkillCategory {
    category: string;
    skills: string[];
}

export const skillsData: SkillCategory[] = [
    {
        category: "Languages",
        skills: [
            "JavaScript (Node.js)",
            "TypeScript",
            "Python",
            "Java",
            "Go",
            "C++",
            "SQL",
            "Shell Scripting",
        ],
    },
    {
        category: "Databases",
        skills: [
            "PostgreSQL",
            "MySQL",
            "DynamoDB",
            "MongoDB",
            "Redis",
            "Elasticsearch",
        ],
    },
    {
        category: "Frameworks",
        skills: [
            "React",
            "React Native",
            "Next.js",
            "Spring Boot",
            "Django",
            "Express.js",
            "FastAPI",
            ".NET Core",
        ],
    },
    {
        category: "Cloud & Tools",
        skills: [
            "AWS (EC2, RDS, Lambda)",
            "Azure",
            "GCP",
            "Docker",
            "Kubernetes",
            "Jenkins",
            "GitHub Actions",
            "Kafka",
            "RabbitMQ",
        ],
    },
    {
        category: "Other",
        skills: [
            "REST & GraphQL APIs",
            "Microservices",
            "System Design",
            "WebSockets",
            "CI/CD",
            "GenAI Integration",
        ],
    },
];
