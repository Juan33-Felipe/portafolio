import React from 'react';
import { VerticalCardStack } from './VerticalCardStack';
import { ArrowRight, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-28 md:py-24 lg:py-12"
    >
      {/* Main 3-Column Spatial Grid (CEDAR® Layout) */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-10 items-center min-h-[calc(100vh-6rem)]">
        {/* LEFT COLUMN */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col items-start justify-center text-left order-1">
          {/* Top Pill Badge with Glassmorphism */}
          <div className="animate-fade-up anim-delay-0 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md mb-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.5)] max-w-full">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] shrink-0" />
            <span className="text-[11px] sm:text-xs font-sans font-medium tracking-[0.06em] text-white truncate drop-shadow-sm">
              Ingeniería de Software · UCC Pasto
            </span>
          </div>

          {/* Prominent Display Heading — PODIUM Sharp 4.11 */}
          <h1 className="animate-fade-up anim-delay-200 font-display font-normal uppercase tracking-[0.02em] leading-[0.94] text-[2.85rem] sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.75rem] text-white select-none break-words drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            <span className="block">JUAN</span>
            <span className="block">FELIPE</span>
            <span className="block text-white">ZAMBRANO</span>
          </h1>

          {/* Subtitle — Inter */}
          <p className="animate-fade-up anim-delay-400 mt-4 sm:mt-5 text-base sm:text-lg lg:text-[1.125rem] font-sans font-semibold leading-relaxed max-w-sm text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span>Desarrollador de Software</span>{' '}
            <span className="text-zinc-300 font-normal">&amp;</span>{' '}
            <span className="text-zinc-200 font-medium">Arquitecto de Soluciones</span>
          </p>
        </div>

        {/* CENTER COLUMN (Cards Centrales en Desplazamiento Lento con Glassmorphism) */}
        <div className="md:col-span-6 lg:col-span-4 flex items-center justify-center order-2 md:order-2">
          <VerticalCardStack />
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end justify-center order-3">
          <div className="w-full max-w-xl lg:max-w-[360px] xl:max-w-[395px] flex flex-col items-start p-6 rounded-3xl bg-black/35 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Subtle Glass Accent Bar */}
            <div className="animate-fade-in anim-delay-400 w-10 h-[2px] bg-gradient-to-r from-white to-transparent mb-4" />

            {/* Editorial Paragraph — Inter */}
            <p className="animate-fade-up anim-delay-600 font-sans font-normal text-sm sm:text-[15px] lg:text-base leading-[1.72] text-zinc-100 tracking-[-0.005em] drop-shadow-sm">
              Estudiante de Ingeniería de Software enfocado en el diseño y construcción de aplicaciones modernas, interfaces fluidas y arquitecturas escalables mediante el uso de frameworks de alto rendimiento y patrones de diseño sólidos.
            </p>

            {/* Glassmorphic Action Buttons */}
            <div className="animate-fade-up anim-delay-800 mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5 w-full">
              {/* Primary Glass Button */}
              <a
                href="#proyectos"
                className="glass-btn-primary group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-white font-sans text-xs sm:text-sm font-semibold tracking-wide"
              >
                <span>Explorar Proyectos</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </a>

              {/* Secondary Glass Button */}
              <a
                href="#contacto"
                className="glass-btn-secondary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-white hover:text-white font-sans text-xs sm:text-sm font-medium tracking-wide"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
                <span>Contactar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
