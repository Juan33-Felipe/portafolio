import React from 'react';
import { TopHeaderBar } from './components/TopHeaderBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { BottomFloatingDock } from './components/BottomFloatingDock';
import Topography from './components/Topography';
import { MotionConfig } from 'framer-motion';
import { ScrollProgressBar } from './components/motion';
import { IntroLoader } from './components/IntroLoader';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#070709] text-white font-sans relative selection:bg-white/20 selection:text-white overflow-x-hidden flex flex-col justify-between">
      {/* Pantalla de apertura inicial */}
      <IntroLoader />

      {/* Cursor personalizado con física de resorte */}
      <CustomCursor />

      {/* Barra de progreso de scroll */}
      <ScrollProgressBar />

      {/* 0. Topography background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[#070709]"
        style={{ zIndex: 0 }}
      >
        <Topography
          color="#0b68ff"
          colorCycle={true}
          colorCycleSpeed={0.005}
          lineCount={21}
          lineWidth={1.2}
          elevation={0.5}
          foreground={0.2}
          tilt={32}
          speed={0.05}
          direction="right"
          glow={0.65}
          depthOfField={0.4}
          fog={0.35}
          hoverEffect="lift"
          clickEffect="pulse"
          majorLines={false}
          scale={1.8}
          detail={0.15}
          mouseStrength={0.65}
          className="w-full h-full"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* 1. Minimalist Top Header Bar (Fixed at top) */}
      <TopHeaderBar />

      {/* 2. Main Content Sections */}
      <main
        className="relative z-10 isolate flex-1 flex flex-col items-center justify-center pt-16 pb-12 sm:pt-20 md:pt-24 md:pb-28"
        style={{ zIndex: 10 }}
      >
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* 3. Floating Bottom Navigation Pill */}
      <BottomFloatingDock />

      {/* 5. Botón flotante para volver arriba */}
      <BackToTop />
    </div>
    </MotionConfig>
  );
}

export default App;
