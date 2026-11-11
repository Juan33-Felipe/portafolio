import React, { useRef } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import { EASE_OUT, Reveal, SectionHeading } from './motion';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

const WORK_EXPERIENCE_STACKS: string[][] = [
  ['Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
  ['Wear OS', 'Kotlin', 'Node.js', 'Express', 'WebSockets'],
  ['Unity 3D', 'C#', 'URP', 'Shader Graph', 'Cinemachine'],
  ['Neo4j', 'Cypher', 'Spring Boot', 'Java', 'React', 'D3.js'],
  ['React Native', 'Expo', 'TypeScript', 'Reanimated 3', 'Zustand'],
];

/** Línea de tiempo cuyo trazo vertical se "dibuja" a medida que el usuario hace scroll. */
const Timeline: React.FC<{ children: React.ReactNode; gapClass: string; isLight: boolean }> = ({
  children,
  gapClass,
  isLight,
}) => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.ol
      ref={ref}
      className={`relative ml-2 flex flex-col ${gapClass}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-px ${isLight ? 'bg-black/10' : 'bg-white/10'}`} aria-hidden="true" />
      <motion.span
        className={`absolute left-0 top-0 bottom-0 w-px origin-top ${
          isLight
            ? 'bg-gradient-to-b from-black via-black/70 to-black/20'
            : 'bg-gradient-to-b from-white via-white/70 to-white/20'
        }`}
        style={{ scaleY }}
        aria-hidden="true"
      />
      {children}
    </motion.ol>
  );
};

const timelineItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const timelineDot: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 15, delay: 0.15 } },
};

const ColumnHeader: React.FC<{
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  isLight: boolean;
}> = ({ Icon, label, isLight }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className={`flex items-center justify-center w-10 h-10 rounded-xl border ${
      isLight ? 'bg-black/5 border-black/10 text-black' : 'bg-white/[0.06] border-white/10 text-white'
    }`}>
      <Icon className="w-5 h-5" />
    </span>
    <h3 className={`font-display uppercase tracking-[0.04em] text-xl sm:text-2xl ${
      isLight ? 'text-zinc-950' : 'text-white'
    }`}>
      {label}
    </h3>
  </div>
);

export const ExperienceSection: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang].experience;
  const projectItems = translations[lang].projects.items;
  const isLight = theme === 'light';

  const cardClass = `spotlight relative flex flex-col backdrop-blur-md border rounded-3xl p-5 sm:p-8 transition-colors duration-300 ${
    isLight
      ? 'bg-white/85 border-black/10 shadow-[0_22px_48px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]'
      : 'bg-zinc-900/60 border-white/10 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]'
  }`;

  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="relative w-full py-14 sm:py-24 px-4 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20"
    >
      <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col">
        <SectionHeading id="experience-heading" barClassName="mb-10">
          {t.title}
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experiencia laboral */}
          <Reveal className={cardClass} direction="right" distance={40}>
            <ColumnHeader Icon={Briefcase} label={t.workTitle} isLight={isLight} />
            <Timeline gapClass="gap-7" isLight={isLight}>
              {projectItems.map((item, idx) => (
                <motion.li key={item.title} className="relative pl-6" variants={timelineItem}>
                  <motion.span
                    variants={timelineDot}
                    className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                      isLight ? 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className={`font-sans text-base font-semibold ${isLight ? 'text-zinc-950' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <span className={`font-sans text-[11px] uppercase tracking-[0.14em] ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {t.featuredBadge}
                    </span>
                  </div>
                  <p className={`font-sans text-xs font-medium mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {item.role}
                  </p>
                  <p className={`font-sans text-sm leading-[1.7] mt-2 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(WORK_EXPERIENCE_STACKS[idx] || []).map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-lg border px-2 py-0.5 text-[11px] font-medium transition-colors ${
                          isLight
                            ? 'bg-black/[0.04] border-black/10 text-zinc-800'
                            : 'bg-zinc-800/80 border-white/10 text-zinc-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </Timeline>
          </Reveal>

          {/* Experiencia académica */}
          <Reveal className={cardClass} direction="left" distance={40} delay={0.1}>
            <ColumnHeader Icon={GraduationCap} label={t.academicTitle} isLight={isLight} />
            <Timeline gapClass="gap-6" isLight={isLight}>
              {t.academicItems.map((item, idx) => {
                const isDegree = idx === 0;
                return (
                  <motion.li key={item.title} className="relative pl-6" variants={timelineItem}>
                    <motion.span
                      variants={timelineDot}
                      className={`absolute top-1.5 rounded-full ${
                        isDegree
                          ? isLight
                            ? '-left-[6px] w-3 h-3 bg-black shadow-[0_0_12px_rgba(0,0,0,0.4)]'
                            : '-left-[6px] w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                          : isLight
                            ? '-left-[4.5px] w-2 h-2 bg-zinc-500'
                            : '-left-[4.5px] w-2 h-2 bg-zinc-400'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h4
                        className={`font-sans font-semibold flex items-center gap-2 ${
                          isDegree ? 'text-base' : 'text-sm'
                        } ${isLight ? 'text-zinc-950' : 'text-white'}`}
                      >
                        {!isDegree && (
                          <Award className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`} aria-hidden="true" />
                        )}
                        {item.title}
                      </h4>
                      <span className={`font-sans text-[11px] uppercase tracking-[0.14em] ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {item.period}
                      </span>
                    </div>
                    <p className={`font-sans text-xs font-medium mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className={`font-sans text-sm leading-[1.7] mt-2 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                        {item.description}
                      </p>
                    )}
                  </motion.li>
                );
              })}
            </Timeline>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
