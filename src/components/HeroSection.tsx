import React from 'react';
import ReflectiveCard from './ReflectiveCard';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
    >
      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 xl:gap-28">
        {/* LEFT COLUMN: Main Heading & Profile */}
        <div className="flex-1 flex flex-col items-start justify-center text-left w-full lg:w-auto">
          {/* Prominent Display Heading — PODIUM Sharp 4.11 */}
          <h1 className="animate-fade-up anim-delay-200 font-display font-normal uppercase tracking-[0.02em] leading-[0.94] text-[2.85rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] text-white select-none break-words drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            <span className="block">JUAN</span>
            <span className="block">FELIPE</span>
            <span className="block text-white">ZAMBRANO</span>
          </h1>

          {/* Subtitle — Inter */}
          <p className="animate-fade-up anim-delay-400 mt-5 sm:mt-6 text-base sm:text-lg lg:text-[1.2rem] font-sans font-semibold leading-relaxed max-w-md text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span>Desarrollador de Software</span>{' '}
            <span className="text-zinc-300 font-normal">&amp;</span>{' '}
            <span className="text-zinc-200 font-medium">Arquitecto de Soluciones</span>
          </p>
        </div>

        {/* RIGHT COLUMN: Reflective Card */}
        <div className="flex items-center justify-center lg:justify-end animate-fade-up anim-delay-300 w-full lg:w-auto">
          <ReflectiveCard
            name="Juan Felipe Zambrano"
            role="Ingeniero de Software"
            imageSrc="/profile-card.png"
            idLabel=""
            idValue="Estudiante de Ingeniería de Software enfocado en el diseño y construcción de aplicaciones modernas, interfaces fluidas y arquitecturas escalables mediante el uso de frameworks de alto rendimiento y patrones de diseño sólidos."
            videoSrc="/videos/reflection.mp4"
            webcam={false}
            tint="#ffffff"
            metalness={0.85}
            roughness={0.18}
            blurStrength={18}
            shine={1.2}
            glare={0.55}
            width={380}
            height={680}
          />
        </div>
      </div>
    </section>
  );
};
