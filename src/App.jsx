import React, { useRef, useState, useEffect } from 'react';
import InteriorScene from './components/canvas/InteriorScene';
import Navbar from './components/ui/Navbar';
import HeroOverlay from './components/ui/HeroOverlay';
import ScrollNarrative from './components/ui/ScrollNarrative';
import StorytellingSection from './components/ui/StorytellingSection';
import PortfolioSection from './components/ui/PortfolioSection';
import StudioPhilosophy from './components/ui/StudioPhilosophy';
import MaterialDrawer from './components/ui/MaterialDrawer';
import ConsultationModal from './components/ui/ConsultationModal';
import Footer from './components/ui/Footer';

export default function App() {
  const scrollTrackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightingMood, setLightingMood] = useState('golden'); // 'morning' | 'golden' | 'twilight'
  const [activeMaterialId, setActiveMaterialId] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Smooth scroll handler for nav items
  const handleNavigateSection = (target) => {
    if (typeof target === 'number') {
      // Numerical target within the 3D scroll track (0.0 to 1.0)
      if (scrollTrackRef.current) {
        const trackHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
        const targetScrollY = scrollTrackRef.current.offsetTop + trackHeight * target;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    } else if (typeof target === 'string') {
      // Section ID like 'portfolio' or 'atelier'
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartExplore = () => {
    handleNavigateSection(0.18);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0D0C0B] text-[#E8E2D6] selection:bg-[#C79D67] selection:text-black">
      {/* ─── REAL-TIME 3D INTERIOR SCENE (FIXED CANVAS) ─── */}
      <InteriorScene
        scrollContainerRef={scrollTrackRef}
        onProgressUpdate={setScrollProgress}
        mood={lightingMood}
        onSelectMaterial={setActiveMaterialId}
      />

      {/* ─── FIXED TOP NAVIGATION ─── */}
      <Navbar
        mood={lightingMood}
        setMood={setLightingMood}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* ─── SCENE 1: CINEMATIC HERO OVERLAY ─── */}
      <HeroOverlay
        scrollProgress={scrollProgress}
        onStartExplore={handleStartExplore}
      />

      {/* ─── SCENE 2 & 3: SCROLL-SYNCHRONIZED NARRATIVE HUD ─── */}
      <ScrollNarrative
        scrollProgress={scrollProgress}
        onSelectMaterial={setActiveMaterialId}
      />

      {/* ─── 3D SCROLL TRACK (400vh TO DRIVE CAMERA CHOREOGRAPHY) ─── */}
      {/* This element creates the physical scroll distance for GSAP ScrollTrigger to scrub the 3D camera */}
      <div
        ref={scrollTrackRef}
        className="relative w-full h-[450vh] pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── SCENE 3 CONTINUATION: DEEP DIVE STORYTELLING ─── */}
      <StorytellingSection
        onSelectMaterial={setActiveMaterialId}
      />

      {/* ─── SCENE 4: EDITORIAL PORTFOLIO GALLERY ─── */}
      <PortfolioSection />

      {/* ─── STUDIO ATELIER PHILOSOPHY & PROCESS ─── */}
      <StudioPhilosophy
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* ─── FOOTER & LOCATIONS ─── */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* ─── INTERACTIVE MODALS & DRAWERS ─── */}
      <MaterialDrawer
        materialId={activeMaterialId}
        onClose={() => setActiveMaterialId(null)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
