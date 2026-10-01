import { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollReveal } from './components/ScrollReveal';
import { FloatingShareButton } from './components/FloatingShareButton';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { LogoMarquee } from './components/LogoMarquee';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SelectedWork } from './components/SelectedWork';
import { PhotographySection } from './components/PhotographySection';
import { VerifiedLinksArchive } from './components/VerifiedLinksArchive';
import { MediaShowcase } from './components/MediaShowcase';
import { JournalismSection } from './components/JournalismSection';
import { EducationCertifications } from './components/EducationCertifications';
import { ReferencesSection } from './components/ReferencesSection';
import { BeyondTheDesk } from './components/BeyondTheDesk';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal, VideoModal, ServiceModal, ContactModal } from './components/Modals';
import { PORTFOLIO_DATA, WorkProject, Service, MediaItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Handler to open video resume modal
  const handleOpenVideoResume = () => {
    const videoResume = PORTFOLIO_DATA.mediaShowcase.find((m) => m.isMainVideoResume) || PORTFOLIO_DATA.mediaShowcase[0];
    setActiveMedia(videoResume);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] selection:bg-teal-500/20 selection:text-teal-300 font-sans antialiased overflow-x-hidden">
      {/* Dynamic Color-Changing Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      {/* Main Content Layout */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenVideoResume={handleOpenVideoResume}
          onOpenContact={() => setContactModalOpen(true)}
        />

        {/* 2. Impact Stats */}
        <ScrollReveal>
          <StatsBanner />
        </ScrollReveal>

        {/* 3. Organizations & Alma Mater Logos */}
        <ScrollReveal>
          <LogoMarquee />
        </ScrollReveal>

        {/* 4. About: “More Than Content.” */}
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>

        {/* 5. What I Do: 6 Interactive Pillars */}
        <ScrollReveal>
          <ExpertiseSection onSelectService={(service) => setSelectedService(service)} />
        </ScrollReveal>

        {/* 6. Career Timeline & Earlier Experience */}
        <ScrollReveal>
          <ExperienceSection />
        </ScrollReveal>

        {/* 7. Selected Work: Centerpiece Filterable Portfolio */}
        <ScrollReveal>
          <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />
        </ScrollReveal>

        {/* 8. Photography & Visual Direction (Adikanshots) */}
        <ScrollReveal>
          <PhotographySection />
        </ScrollReveal>

        {/* 9. Extracted Verified Works & Portfolio Links (PDF Archive) */}
        <ScrollReveal>
          <VerifiedLinksArchive />
        </ScrollReveal>

        {/* 9. Media Showcase: “Stories I've Told.” */}
        <ScrollReveal>
          <MediaShowcase onPlayVideo={(media) => setActiveMedia(media)} />
        </ScrollReveal>

        {/* 9. Journalism: “From Digital Campaigns to Newsrooms.” */}
        <ScrollReveal>
          <JournalismSection />
        </ScrollReveal>

        {/* 10. Education, Certifications & Tools */}
        <ScrollReveal>
          <EducationCertifications />
        </ScrollReveal>

        {/* 11. Professional References & Recommendations */}
        <ScrollReveal>
          <ReferencesSection />
        </ScrollReveal>

        {/* 12. Beyond The Desk */}
        <ScrollReveal>
          <BeyondTheDesk />
        </ScrollReveal>

        {/* 13. Contact & Final CTA */}
        <ScrollReveal>
          <ContactSection onOpenVideoResume={handleOpenVideoResume} />
        </ScrollReveal>
      </main>

      {/* Persistent Floating Share Button */}
      <FloatingShareButton />

      {/* Interactive Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenVideo={handleOpenVideoResume}
      />

      <VideoModal
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
