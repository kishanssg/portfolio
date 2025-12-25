import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import ModeContent from "@/components/shared/ModeContent";
import Hero from "@/components/professional/Hero";
import About from "@/components/professional/About";
import ProjectsGrid from "@/components/professional/ProjectsGrid";
import ExperienceTimeline from "@/components/professional/ExperienceTimeline";
import SkillsGrid from "@/components/professional/SkillsGrid";
import ContactForm from "@/components/professional/ContactForm";
import CloudTransition from "@/components/portal/CloudTransition";
import { ModeProvider } from "@/hooks/useMode";

// Professional Mode content
function ProfessionalContent() {
    return (
        <>
            <main id="main-content" className="min-h-screen pt-[var(--nav-height)]">
                {/* Hero Section */}
                <Hero />

                {/* About Section */}
                <About />

                {/* Experience Section */}
                <ExperienceTimeline />

                {/* Projects Section */}
                <ProjectsGrid />

                {/* Skills Section */}
                <SkillsGrid />

                {/* Contact Section */}
                <ContactForm />
            </main>

            <Footer />
        </>
    );
}

export default function Home() {
    return (
        <ModeProvider>
            {/* Cloud Transition Overlay */}
            <CloudTransition />

            {/* Navigation (always visible) */}
            <Navigation />

            {/* Mode-based content switching */}
            <ModeContent professionalContent={<ProfessionalContent />} />
        </ModeProvider>
    );
}
