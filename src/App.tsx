import React from 'react';
import { TopHeaderBar } from './components/TopHeaderBar';
import { HeroSection } from './components/HeroSection';
import { BottomFloatingDock } from './components/BottomFloatingDock';

const BACKGROUND_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4';

export function App() {
  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans relative selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Fullscreen Background Video - Vivid, Clear & Fully Visible */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <video
          src={BACKGROUND_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover animate-fade-in anim-delay-0 brightness-110 contrast-105"
        />
        {/* Minimalist transparent tint for contrast without darkening the video animation */}
        <div className="absolute inset-0 bg-[#070709]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/40 via-transparent to-[#070709]/50" />
      </div>

      {/* 1. Minimalist Top Header Bar (Fixed at top) */}
      <TopHeaderBar />

      {/* 2. Main Hero Section — 3-Column Grid (Above the fold) */}
      <main className="relative z-10">
        <HeroSection />
      </main>

      {/* 3. Floating Bottom Pill Navigation (Bottom Dock - Block 1) */}
      <BottomFloatingDock />
    </div>
  );
}

export default App;
