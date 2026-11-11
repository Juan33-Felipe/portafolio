import React, { useRef } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import { EASE_OUT, Reveal, SectionHeading } from './motion';

interface WorkItem {
  title: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
}

interface AcademicItem {
  title: string;
  institution: string;
  period: string;
  description?: string;
  type: 'carrera' | 'seminario';
}

const WORK_EXPERIENCE: WorkItem[] = [
  {
    title: 'EquiWage Analytics',
    role: 'Desarrollador de Software & Arquitectura Frontend',
    period: 'Proyecto destacado',
    description:
      'Plataforma de escritorio y web para auditoría salarial y detección de brechas de compensación con modelos estadísticos en memoria, informes de cumplimiento normativo y proyección presupuestal.',
    stack: ['Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
  },
  {
    title: 'EchoStock',
    role: 'Desarrollador de Software & Backend',
    period: 'Proyecto destacado',
    description:
      'Ecosistema vestible para SmartWatch (Wear OS) y backend reactivo orientado a centros logísticos, facilitando la consulta de inventario y registro de stock manos libres mediante comandos de voz.',
    stack: ['Wear OS', 'Kotlin', 'Node.js', 'Express', 'WebSockets'],
  },
  {
    title: 'sudo-kill-9',
    role: 'Desarrollador de Videojuegos / Gameplay & VFX',
    period: 'Proyecto destacado',
    description:
      'Videojuego de combate cinemático en Unity con balística de proyectiles autoguiados en tiempo real, efectos visuales procedurales con Shader Graph y máquina de estados jerárquica para jefes.',
    stack: ['Unity 3D', 'C#', 'URP', 'Shader Graph', 'Cinemachine'],
  },
  {
    title: 'SpecAtlas',
    role: 'Arquitecto de Soluciones',
    period: 'Proyecto destacado',
    description:
      'Sistema de verificación formal y análisis de calidad de requisitos de software modelados como grafos dirigidos de conocimiento en Neo4j con simulación inmediata de impacto de cambios.',
    stack: ['Neo4j', 'Cypher', 'Spring Boot', 'Java', 'React', 'D3.js'],
  },
  {
    title: 'LurifyCase Mobile',
    role: 'Desarrollador Móvil',
    period: 'Proyecto destacado',
    description:
      'Ecosistema móvil multiplataforma para personalización interactiva y comercio de fundas en tiempo real, con motor de composición multitáctil 2.5D y persistencia offline-first.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Reanimated 3', 'Zustand'],
  },
];

// Reemplaza los títulos y fechas de los seminarios por los nombres reales.
const ACADEMIC_EXPERIENCE: AcademicItem[] = [
  {
    title: 'Ingeniería de Software',
    institution: 'Universidad Cooperativa de Colombia · Campus Pasto',
    period: '2022 — Actualidad',
    description: 'Inicio de la carrera profesional en Ingeniería de Software. Actualmente en 5° semestre.',
    type: 'carrera',
  },
  {
    title: 'Seminario de Ingeniería de Software I',
    institution: 'Facultad de Ingeniería de Software · UCC',
    period: '2022',
    type: 'seminario',
  },
  {
    title: 'Seminario de Ingeniería de Software II',
    institution: 'Facultad de Ingeniería de Software · UCC',
    period: '2023',
    type: 'seminario',
  },
  {
    title: 'Seminario de Ingeniería de Software III',
    institution: 'Facultad de Ingeniería de Software · UCC',
    period: '2024',
    type: 'seminario',
  },
  {
    title: 'Seminario de Ingeniería de Software IV',
    institution: 'Facultad de Ingeniería de Software · UCC',
    period: '2025',
    type: 'seminario',
  },
];

const cardClass =
  'spotlight relative flex flex-col bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]';

/** Línea de tiempo cuyo trazo vertical se "dibuja" a medida que el usuario hace scroll. */
const Timeline: React.FC<{ children: React.ReactNode; gapClass: string }> = ({ children, gapClass }) => {
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
      <span className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white via-white/70 to-white/20 origin-top"
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

const ColumnHeader: React.FC<{ Icon: React.ComponentType<{ className?: string }>; label: string }> = ({
  Icon,
  label,
}) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10">
      <Icon className="w-5 h-5 text-white" />
    </span>
    <h3 className="font-display uppercase tracking-[0.04em] text-xl sm:text-2xl text-white">{label}</h3>
  </div>
);

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="relative w-full py-14 sm:py-24 px-4 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20"
    >
      <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col">
        <SectionHeading id="experience-heading" barClassName="mb-10">
          Experiencia
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experiencia laboral */}
          <Reveal className={cardClass} direction="right" distance={40}>
            <ColumnHeader Icon={Briefcase} label="Experiencia laboral" />
            <Timeline gapClass="gap-7">
              {WORK_EXPERIENCE.map((item) => (
                <motion.li key={item.title} className="relative pl-6" variants={timelineItem}>
                  <motion.span
                    variants={timelineDot}
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="font-sans text-base font-semibold text-white">{item.title}</h4>
                    <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                      {item.period}
                    </span>
                  </div>
                  <p className="font-sans text-xs font-medium text-zinc-400 mt-0.5">{item.role}</p>
                  <p className="font-sans text-sm leading-[1.7] text-zinc-300 mt-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-zinc-800/80 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-300"
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
            <ColumnHeader Icon={GraduationCap} label="Experiencia académica" />
            <Timeline gapClass="gap-6">
              {ACADEMIC_EXPERIENCE.map((item) => {
                const isDegree = item.type === 'carrera';
                return (
                  <motion.li key={item.title} className="relative pl-6" variants={timelineItem}>
                    <motion.span
                      variants={timelineDot}
                      className={`absolute top-1.5 rounded-full ${
                        isDegree
                          ? '-left-[6px] w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                          : '-left-[4.5px] w-2 h-2 bg-zinc-400'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h4
                        className={`font-sans font-semibold text-white flex items-center gap-2 ${
                          isDegree ? 'text-base' : 'text-sm'
                        }`}
                      >
                        {!isDegree && <Award className="w-3.5 h-3.5 text-zinc-400 shrink-0" aria-hidden="true" />}
                        {item.title}
                      </h4>
                      <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                        {item.period}
                      </span>
                    </div>
                    <p className="font-sans text-xs font-medium text-zinc-400 mt-0.5">{item.institution}</p>
                    {item.description && (
                      <p className="font-sans text-sm leading-[1.7] text-zinc-300 mt-2">{item.description}</p>
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
