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
    color: '#FFFFFF',
    hoverBorder: 'hover:border-white/40 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]',
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
    color: '#FFFFFF',
    hoverBorder: 'hover:border-white/40 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]',
  },
  {
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#38BDF8',
    hoverBorder: 'hover:border-[#38BDF8]/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]',
  },
];

const QUICK_FACTS = [
  {
    label: 'San Juan de Pasto, Colombia',
    Icon: MapPin,
  },
  {
    label: '5° Semestre · Ing. de Software (UCC)',
    Icon: GraduationCap,
  },
  {
    label: 'Arquitectura de Software & UI/UX',
    Icon: Layers,
  },
] as const;

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number; // 1 - 5
  photo: string;
  githubUrl?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Kevin Andres Buitrago',
    role: 'Desarrollador full stack · Medellín',
    quote:
      'Juan Felipe estructura cada proyecto con una arquitectura clara y escalable. Trabajar con él en equipo garantiza código limpio, mantenible y entregas a tiempo.',
    rating: 5,
    photo: 'https://github.com/KvnAB.png',
    githubUrl: 'https://github.com/KvnAB',
  },
  {
    name: 'Juan Arismendy',
    role: 'Desarrollador full stack · Medellín',
    quote:
      'Destaca por su visión técnica, buenas prácticas y capacidad para resolver problemas complejos con arquitecturas robustas tanto en backend como en frontend.',
    rating: 5,
    photo: '/avatar-placeholder.png',
    githubUrl: 'https://github.com/Pimboto',
  },
  {
    name: 'Juan Henao',
    role: 'Desarrollador full stack · Medellín',
    quote:
      'Gran compañero de desarrollo: excelente comunicación, dominio en integración de servicios e interfaces intuitivas que elevan la calidad global del producto.',
    rating: 5,
    photo: 'https://github.com/JuanDavidsh23.png',
    githubUrl: 'https://github.com/JuanDavidsh23',
  },
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
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
            className="spotlight lg:col-span-7 flex flex-col items-start text-left bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]"
          >
            {/* 1. Header */}
            <SectionHeading id="about-heading" barClassName="mb-4">
              Sobre mí
            </SectionHeading>

            {/* 2. Descriptive Summary */}
            <Reveal delay={0.2} distance={16}>
              <p className="font-sans font-normal text-sm sm:text-[15px] lg:text-base leading-[1.75] text-zinc-200 tracking-[-0.005em]">
                Vivo en San Juan de Pasto, Nariño, y curso Ingeniería de Software en la Universidad Cooperativa de Colombia. Mi enfoque va más allá de crear funcionalidades CRUD básicas; me concentro en estructurar sistemas robustos y escalables aplicando Clean Architecture y el patrón MVC para asegurar que cada proyecto sea mantenible a largo plazo.
              </p>
            </Reveal>

            {/* 2.5 Contadores animados */}
            <Stagger className="mt-6 grid grid-cols-2 gap-3 w-full" delay={0.25}>
              {[
                { value: 5, suffix: '°', label: 'Semestre UCC' },
                { value: 7, suffix: '', label: 'Frameworks' },
              ].map((stat) => (
                <StaggerItem
                  key={stat.label}
                  className="flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3"
                >
                  <span className="font-display text-2xl sm:text-3xl text-white leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 font-sans text-[11px] text-zinc-400">{stat.label}</span>
                </StaggerItem>
              ))}
            </Stagger>

            {/* 3. Quick Facts & CV (Pill badges without emojis) */}
            <Stagger className="mt-6 flex flex-wrap items-center gap-2.5" delay={0.3}>
              {QUICK_FACTS.map(({ label, Icon }) => (
                <StaggerItem
                  as="span"
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 border border-white/10 px-3.5 py-1.5 font-sans text-xs font-medium text-zinc-200"
                >
                  <Icon className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </StaggerItem>
              ))}
              <StaggerItem
                as="a"
                href="/CV_Juan_Felipe_Zambrano.pdf"
                download="CV_Juan_Felipe_Zambrano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Descargar Curriculum Vitae en PDF"
                className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-950 font-sans text-xs font-semibold px-4 py-1.5 transition-all duration-200 hover:bg-zinc-200 shadow-[0_0_16px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-zinc-950 shrink-0" aria-hidden="true" />
                <span>Descargar CV</span>
              </StaggerItem>
            </Stagger>

            {/* 4. Skills (STRICT RULE: Frameworks Only) */}
            <div className="mt-7 w-full pt-6 border-t border-white/10">
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-3.5">
                FRAMEWORKS
              </span>
              <Stagger className="flex flex-wrap items-center gap-2 sm:gap-2.5" stagger={0.06} delay={0.4}>
                {FRAMEWORKS.map(({ name, Icon, color, hoverBorder }) => (
                  <StaggerItem
                    as="span"
                    key={name}
                    variants={popItem}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`group inline-flex items-center gap-2 bg-zinc-800/80 text-zinc-200 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium transition-[color,background-color,border-color,box-shadow] duration-200 hover:text-white hover:bg-zinc-800/95 cursor-default select-none ${hoverBorder}`}
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
              <div className="mt-4 pt-3 border-t border-white/5">
                <InfiniteMarquee items={FRAMEWORKS.map((f) => f.name)} speedSeconds={22} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. LOWER SECTION: TESTIMONIALS */}
        <div id="testimonios" className="mt-14 sm:mt-20 w-full scroll-mt-24">
          <Reveal distance={12}>
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              TESTIMONIOS
            </span>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full [perspective:1200px]" stagger={0.15}>
            {TESTIMONIALS.map(({ name, role, quote, rating, photo, githubUrl }) => (
              <TiltCard
                key={name}
                variants={cardItem}
                maxTilt={6}
                className="relative flex flex-col justify-between gap-5 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-6 min-h-[180px] transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/20 hover:bg-zinc-900/75 hover:shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
              >
                <Quote className="absolute top-5 right-5 w-6 h-6 text-white/10" aria-hidden="true" />
                <div className="flex flex-col gap-3">
                  <StarRating rating={rating} />
                  <p className="font-sans text-sm leading-[1.7] text-zinc-200">“{quote}”</p>
                </div>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={photo}
                      alt={`Foto de ${name}`}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0 bg-zinc-800"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans text-sm font-semibold text-white truncate">{name}</span>
                      <span className="font-sans text-xs text-zinc-400 truncate">{role}</span>
                    </div>
                  </div>
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`GitHub de ${name}`}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 shrink-0 cursor-pointer"
                    >
                      <SiGithub className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </TiltCard>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};
