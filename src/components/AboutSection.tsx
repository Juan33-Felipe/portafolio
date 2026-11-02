import React from 'react';
import { MapPin, GraduationCap, Layers } from 'lucide-react';
import Lanyard from './Lanyard';

export interface MusicPreference {
  title: string;
  genre: string;
  description: string;
  tag: string;
}

const FRAMEWORKS: readonly string[] = [
  'Next.js',
  'React',
  'React Native',
  'NestJS',
  'Spring Boot',
  'Fastify',
  'Tailwind CSS',
];

const QUICK_FACTS = [
  {
    label: 'San Juan de Pasto, Colombia',
    Icon: MapPin,
  },
  {
    label: '6° Semestre · Ing. de Software (UCC)',
    Icon: GraduationCap,
  },
  {
    label: 'Arquitectura de Software & UI/UX',
    Icon: Layers,
  },
] as const;

const MUSIC_PREFERENCES: MusicPreference[] = [
  {
    title: '',
    genre: '',
    description: '',
    tag: '',
  },
  {
    title: '',
    genre: '',
    description: '',
    tag: '',
  },
  {
    title: '',
    genre: '',
    description: '',
    tag: '',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-heading"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20"
    >
      {/* Full-screen width Lanyard overlay on top of all cards in this section */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen h-full z-30 pointer-events-auto">
        <Lanyard
          frontImage="/lanyard-avatar.jpg"
          backImage="/lanyard-avatar.jpg"
          imageFit="cover"
          cornerRadius={0.25}
          size={0.42}
          anchor="left"
          strapLength={0.25}
          gravity={0.65}
          damping={0.35}
          elasticity={0}
          breeze={0.25}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col">
        {/* 1. 2-COLUMN LAYOUT: LEFT SPACE FOR LANYARD + RIGHT STANDALONE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Spacer (5 columns on lg:) */}
          <div className="lg:col-span-5 h-[460px] sm:h-[520px]" aria-hidden="true" />

          {/* Right Column (Standalone About Me Card — 7 columns on lg:) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {/* 1. Header */}
            <h2
              id="about-heading"
              className="font-display font-normal uppercase tracking-[0.02em] text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.05] text-white"
            >
              Sobre mí
            </h2>
            <div className="h-1 w-16 bg-white rounded-full mt-2 mb-4" aria-hidden="true" />

            {/* 2. Descriptive Summary */}
            <p className="font-sans font-normal text-sm sm:text-[15px] lg:text-base leading-[1.75] text-zinc-200 tracking-[-0.005em]">
              Vivo en San Juan de Pasto, Nariño, y curso Ingeniería de Software en la Universidad Cooperativa de Colombia. Mi enfoque va más allá de crear funcionalidades CRUD básicas; me concentro en estructurar sistemas robustos y escalables aplicando Clean Architecture y el patrón MVC para asegurar que cada proyecto sea mantenible a largo plazo.
            </p>

            {/* 3. Quick Facts (Pill badges without emojis) */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {QUICK_FACTS.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 border border-white/10 px-3.5 py-1.5 font-sans text-xs font-medium text-zinc-200"
                >
                  <Icon className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </span>
              ))}
            </div>

            {/* 4. Skills (STRICT RULE: Frameworks Only) */}
            <div className="mt-7 w-full pt-6 border-t border-white/10">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-3.5">
                FRAMEWORKS
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {FRAMEWORKS.map((framework) => (
                  <span
                    key={framework}
                    className="bg-zinc-800/80 text-zinc-200 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors duration-200 hover:border-white/25 hover:text-white"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. LOWER SECTION: 3 EMPTY MUSICAL PREFERENCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 sm:mt-20 w-full">
          {MUSIC_PREFERENCES.map((_, idx) => (
            <article
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-6 min-h-[180px] transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/75"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
