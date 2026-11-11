import React, { useEffect, useState } from 'react';
import { MapPin, GraduationCap, Layers, Star, Quote, Download } from 'lucide-react';
import {
  SiNextdotjs,
  SiReact,
  SiNestjs,
  SiSpringboot,
  SiFastify,
  SiTailwindcss,
  SiGithub,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import Lanyard from './Lanyard';
import { motion, type Variants } from 'framer-motion';
import {
  AnimatedCounter,
  EASE_OUT,
  InfiniteMarquee,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
  TiltCard,
} from './motion';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

interface FrameworkItem {
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  hoverBorder: string;
}

const FRAMEWORKS: readonly FrameworkItem[] = [
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    color: '#3b82f6',
    hoverBorder: 'hover:border-blue-400/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]',
  },
  {
    name: 'React',
    Icon: SiReact,
    color: '#61DAFB',
    hoverBorder: 'hover:border-[#61DAFB]/40 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]',
  },
  {
    name: 'React Native',
    Icon: TbBrandReactNative,
    color: '#61DAFB',
    hoverBorder: 'hover:border-[#61DAFB]/40 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]',
  },
  {
    name: 'NestJS',
    Icon: SiNestjs,
    color: '#E0234E',
    hoverBorder: 'hover:border-[#E0234E]/40 hover:shadow-[0_0_12px_rgba(224,35,78,0.2)]',
  },
  {
    name: 'Spring Boot',
    Icon: SiSpringboot,
    color: '#6DB33F',
    hoverBorder: 'hover:border-[#6DB33F]/40 hover:shadow-[0_0_12px_rgba(109,179,63,0.2)]',
  },
  {
    name: 'Fastify',
    Icon: SiFastify,
    color: '#10b981',
    hoverBorder: 'hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  },
  {
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#38BDF8',
    hoverBorder: 'hover:border-[#38BDF8]/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]',
  },
];

const TESTIMONIAL_AVATARS = [
  'https://github.com/KvnAB.png',
  '/avatar-placeholder.png',
  'https://github.com/JuanDavidsh23.png',
];

const TESTIMONIAL_GITHUBS = [
  'https://github.com/KvnAB',
  'https://github.com/Pimboto',
  'https://github.com/JuanDavidsh23',
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <motion.div
    className="flex items-center gap-0.5"
    aria-label={`${rating} de 5 estrellas`}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } }}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.span
        key={i}
        className="inline-flex"
        variants={{
          hidden: { scale: 0, rotate: -45, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 18 } },
        }}
      >
        <Star
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`}
          aria-hidden="true"
        />
      </motion.span>
    ))}
  </motion.div>
);

const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 22 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const AboutSection: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang].about;
  const isLight = theme === 'light';

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const quickFacts = [
    { label: t.factLocation, Icon: MapPin },
    { label: t.factDegree, Icon: GraduationCap },
    { label: t.factFocus, Icon: Layers },
  ];

  const cardContainerClass = isLight
    ? 'bg-white/85 border-black/10 text-zinc-900 shadow-[0_22px_48px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]'
    : 'bg-zinc-900/60 border-white/10 text-white shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]';

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-heading"
      className="relative w-full py-14 sm:py-28 px-4 sm:px-10 lg:px-16 xl:px-20"
    >
      {/* Lanyard overlay: contained in the top slot on mobile/tablet, full-section on lg+ */}
      <div className="absolute top-0 lg:inset-y-0 left-1/2 -translate-x-1/2 w-screen h-[420px] sm:h-[490px] lg:h-full z-30 pointer-events-auto">
        <Lanyard
          frontImage="/lanyard-avatar.jpg"
          backImage="/lanyard-avatar.jpg"
          imageFit="cover"
          cornerRadius={0.25}
          size={isDesktop ? 0.42 : 0.56}
          anchor={isDesktop ? 'left' : 'center'}
          strapLength={isDesktop ? 0.25 : 0.2}
          gravity={0.65}
          damping={0.35}
          elasticity={0}
          breeze={0.25}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col">
        {/* 1. 2-COLUMN LAYOUT: LEFT SPACE FOR LANYARD + RIGHT STANDALONE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column Spacer (5 columns on lg:) */}
          <div className="lg:col-span-5 h-[370px] sm:h-[450px] lg:h-[520px]" aria-hidden="true" />

          {/* Right Column (Standalone About Me Card — 7 columns on lg:) */}
          <Reveal
            direction="left"
            distance={48}
            className={`spotlight lg:col-span-7 flex flex-col items-start text-left backdrop-blur-md border rounded-3xl p-5 sm:p-8 transition-colors duration-300 ${cardContainerClass}`}
          >
            {/* 1. Header */}
            <SectionHeading id="about-heading" barClassName="mb-4">
              {t.title}
            </SectionHeading>

            {/* 2. Descriptive Summary */}
            <Reveal delay={0.2} distance={16}>
              <p
                className={`font-sans font-normal text-sm sm:text-[15px] lg:text-base leading-[1.75] tracking-[-0.005em] ${
                  isLight ? 'text-zinc-700' : 'text-zinc-200'
                }`}
              >
                {t.bio}
              </p>
            </Reveal>

            {/* 2.5 Contadores animados */}
            <Stagger className="mt-6 grid grid-cols-2 gap-3 w-full" delay={0.25}>
              {[
                { value: 5, suffix: '°', label: t.statSemestre },
                { value: 7, suffix: '', label: t.statFrameworks },
              ].map((stat) => (
                <StaggerItem
                  key={stat.label}
                  className={`flex flex-col rounded-2xl border px-4 py-3 transition-colors ${
                    isLight
                      ? 'bg-black/[0.03] border-black/10'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <span
                    className={`font-display text-2xl sm:text-3xl leading-none ${
                      isLight ? 'text-zinc-950' : 'text-white'
                    }`}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={`mt-1 font-sans text-[11px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {stat.label}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            {/* 3. Quick Facts & CV (Pill badges without emojis) */}
            <Stagger className="mt-6 flex flex-wrap items-center gap-2.5" delay={0.3}>
              {quickFacts.map(({ label, Icon }) => (
                <StaggerItem
                  as="span"
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium transition-colors ${
                    isLight
                      ? 'bg-black/[0.04] border-black/10 text-zinc-800'
                      : 'bg-zinc-800/60 border-white/10 text-zinc-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-black' : 'text-white'}`} aria-hidden="true" />
                  <span>{label}</span>
                </StaggerItem>
              ))}
              <StaggerItem
                as="a"
                href="/CV_Juan_Felipe_Zambrano.pdf"
                download="CV_Juan_Felipe_Zambrano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title={lang === 'es' ? 'Descargar Curriculum Vitae en PDF' : 'Download CV (PDF)'}
                className={`inline-flex items-center gap-2 rounded-full font-sans text-xs font-semibold px-4 py-1.5 transition-all duration-200 active:scale-95 cursor-pointer ${
                  isLight
                    ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_2px_12px_rgba(0,0,0,0.18)]'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_16px_rgba(255,255,255,0.2)]'
                }`}
              >
                <Download className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-white' : 'text-zinc-950'}`} aria-hidden="true" />
                <span>{t.downloadCv}</span>
              </StaggerItem>
            </Stagger>

            {/* 4. Skills (STRICT RULE: Frameworks Only) */}
            <div className={`mt-7 w-full pt-6 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
              <span
                className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] mb-3.5 ${
                  isLight ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                {t.frameworksTitle}
              </span>
              <Stagger className="flex flex-wrap items-center gap-2 sm:gap-2.5" stagger={0.06} delay={0.4}>
                {FRAMEWORKS.map(({ name, Icon, color, hoverBorder }) => (
                  <StaggerItem
                    as="span"
                    key={name}
                    variants={popItem}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`group inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-xs font-medium transition-[color,background-color,border-color,box-shadow] duration-200 cursor-default select-none ${hoverBorder} ${
                      isLight
                        ? 'bg-white border-black/10 text-zinc-800 hover:text-black hover:bg-zinc-100 shadow-sm'
                        : 'bg-zinc-800/80 border-white/10 text-zinc-200 hover:text-white hover:bg-zinc-800/95'
                    }`}
                  >
                    <Icon
                      className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[360deg]"
                      style={{ color }}
                      aria-hidden="true"
                    />
                    <span>{name}</span>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className={`mt-4 pt-3 border-t ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                <InfiniteMarquee items={FRAMEWORKS.map((f) => f.name)} speedSeconds={22} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. LOWER SECTION: TESTIMONIALS */}
        <div id="testimonios" className="mt-14 sm:mt-20 w-full scroll-mt-24">
          <Reveal distance={12}>
            <span
              className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] mb-4 ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {t.testimonialsTitle}
            </span>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full [perspective:1200px]" stagger={0.15}>
            {t.testimonials.map(({ name, role, quote }, idx) => {
              const photo = TESTIMONIAL_AVATARS[idx];
              const githubUrl = TESTIMONIAL_GITHUBS[idx];
              return (
                <TiltCard
                  key={name}
                  variants={cardItem}
                  maxTilt={6}
                  className={`relative flex flex-col justify-between gap-5 rounded-2xl backdrop-blur-md border p-6 min-h-[180px] transition-[border-color,background-color,box-shadow] duration-300 ${
                    isLight
                      ? 'bg-white/80 border-black/10 hover:border-black/20 hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                      : 'bg-zinc-900/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/75 hover:shadow-[0_18px_40px_rgba(0,0,0,0.55)]'
                  }`}
                >
                  <Quote
                    className={`absolute top-5 right-5 w-6 h-6 ${isLight ? 'text-black/10' : 'text-white/10'}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-3">
                    <StarRating rating={5} />
                    <p className={`font-sans text-sm leading-[1.7] ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
                      “{quote}”
                    </p>
                  </div>
                  <div className={`flex items-center justify-between gap-3 pt-4 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={photo}
                        alt={`Foto de ${name}`}
                        loading="lazy"
                        className={`w-12 h-12 rounded-full object-cover border shrink-0 ${
                          isLight ? 'border-black/15 bg-zinc-200' : 'border-white/20 bg-zinc-800'
                        }`}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className={`font-sans text-sm font-semibold truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          {name}
                        </span>
                        <span className={`font-sans text-xs truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {role}
                        </span>
                      </div>
                    </div>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`GitHub de ${name}`}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
                          isLight
                            ? 'bg-black/5 hover:bg-black/10 border-black/10 text-zinc-600 hover:text-black'
                            : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/25 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <SiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </TiltCard>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
};
