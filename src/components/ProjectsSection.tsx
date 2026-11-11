import React, { useEffect, useMemo, useRef, useState } from 'react';
import CardSwap from './CardSwap';
import type { CardSwapItem, CardSwapRef } from './CardSwap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { SectionHeading } from './motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Analytics01Icon,
  SmartWatch01Icon,
  GameController01Icon,
  DatabaseIcon,
  SmartPhone01Icon,
} from '@hugeicons/core-free-icons';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

const PROJECT_CONFIGS = [
  {
    image: '/equiwage-preview.png',
    alt: 'EquiWage Analytics',
    appUrl: '/projects/equiwage/index.html',
    downloadUrl: '/downloads/EquiWage Analytics 1.0.0.exe',
    downloadName: 'EquiWage Analytics 1.0.0.exe',
    githubUrl: 'https://github.com/Juan33-Felipe/EquiWage-Analytics',
    technologies: ['React', 'Electron', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite', 'Lucide'],
    icon: <HugeiconsIcon icon={Analytics01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    image: '/echostock-preview.jpg',
    alt: 'EchoStock',
    githubFrontendUrl: 'https://github.com/Juan33-Felipe/EchoStock-WearApp.git',
    githubBackendUrl: 'https://github.com/Juan33-Felipe/EchoStock-backend.git',
    technologies: ['Wear OS', 'Kotlin', 'Android SDK', 'Node.js', 'Express', 'WebSockets', 'Speech-to-Text'],
    icon: <HugeiconsIcon icon={SmartWatch01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    image: '/sudo-kill-9-preview.jpg',
    alt: 'sudo-kill-9',
    githubUrl: 'https://github.com/Xander-JS/sudo-kill-9.git',
    technologies: ['Unity 3D', 'C#', 'URP', 'Shader Graph', 'VFX Graph', 'Cinemachine', 'Timeline'],
    icon: <HugeiconsIcon icon={GameController01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    image: '/spec-atlas.gif',
    alt: 'SpecAtlas',
    githubFrontendUrl: 'https://github.com/Xander-JS/frontend_specatlas',
    githubBackendUrl: 'https://github.com/KevinTimaran/specatlas-backend.git',
    liveUrl: 'https://frontend-specatlas.vercel.app/',
    technologies: ['Neo4j', 'Cypher', 'Spring Boot', 'Java', 'React', 'D3.js', 'Docker'],
    icon: <HugeiconsIcon icon={DatabaseIcon} size={14} strokeWidth={1.8} />,
  },
  {
    image: '/lurifycase-preview.jpg',
    alt: 'LurifyCase Mobile',
    githubUrl: 'https://github.com/Juan33-Felipe/lurifyCase.git',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind', 'Mobile UI'],
    icon: <HugeiconsIcon icon={SmartPhone01Icon} size={14} strokeWidth={1.8} />,
  },
];

export const ProjectsSection: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang].projects;
  const isLight = theme === 'light';

  const swapRef = useRef<CardSwapRef>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const projects: CardSwapItem[] = useMemo(() => {
    return t.items.map((item, idx) => ({
      ...item,
      ...PROJECT_CONFIGS[idx],
    }));
  }, [t.items]);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const swapDimensions = isMobile
    ? { width: 320, height: 235, cardDistance: 22, verticalDistance: 28 }
    : isTablet
      ? { width: 440, height: 320, cardDistance: 38, verticalDistance: 44 }
      : { width: 520, height: 380, cardDistance: 50, verticalDistance: 55 };

  const activeProject = projects[activeIndex] || projects[0];

  const handleSelectProject = (index: number) => {
    setActiveIndex(index);
    swapRef.current?.goToIndex?.(index);
  };

  const handleOpenActiveModal = () => {
    swapRef.current?.openModal?.(activeIndex);
  };

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="relative z-20 isolate w-full py-12 sm:py-24"
      style={{ zIndex: 20 }}
    >
      {/* Encabezado de la Sección */}
      <div className="relative z-20 w-full max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 mb-6 sm:mb-8 flex flex-col items-start">
        <SectionHeading id="projects-heading">{t.title}</SectionHeading>
        <p className={`font-sans text-sm sm:text-base max-w-2xl mt-2 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Contenedor Principal: Cards a la Izquierda y Ficha de Información a la Derecha */}
      <div className="relative z-20 w-full max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* COLUMNA IZQUIERDA: Pila interactiva 3D de Cards */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              className="relative z-20 isolate w-full h-[320px] sm:h-[460px] lg:h-[520px] flex items-center justify-center"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
            >
              <CardSwap
                ref={swapRef}
                items={projects}
                theme={isLight ? 'light' : 'dark'}
                autoplay={false}
                width={swapDimensions.width}
                height={swapDimensions.height}
                cardDistance={swapDimensions.cardDistance}
                verticalDistance={swapDimensions.verticalDistance}
                onChange={(newIndex) => setActiveIndex(newIndex)}
              />
            </motion.div>

            {/* Controles y Selector de Pestañas debajo de las cards */}
            <div className="w-full flex flex-col items-center gap-4 mt-2">
              {/* Controles para móvil */}
              <div className="sm:hidden flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => swapRef.current?.prev()}
                  aria-label="Proyecto anterior"
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border active:scale-95 transition-transform ${
                    isLight ? 'bg-white/90 border-black/10 text-zinc-800' : 'bg-white/[0.06] border-white/15 text-white'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className={`font-sans text-[11px] uppercase tracking-[0.14em] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {activeIndex + 1} {t.of} {projects.length}
                </span>
                <button
                  type="button"
                  onClick={() => swapRef.current?.next()}
                  aria-label="Siguiente proyecto"
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border active:scale-95 transition-transform ${
                    isLight ? 'bg-white/90 border-black/10 text-zinc-800' : 'bg-white/[0.06] border-white/15 text-white'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Selector de pestañas interactivas */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-none flex items-center justify-start lg:justify-center gap-2 sm:gap-2.5">
                {projects.map((proj, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={proj.title}
                      type="button"
                      onClick={() => handleSelectProject(idx)}
                      className={`group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border text-xs font-medium transition-all duration-300 shrink-0 select-none cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                            : 'bg-zinc-800 border-white/40 text-white shadow-[0_0_16px_rgba(255,255,255,0.12)]'
                          : isLight
                            ? 'bg-white/80 border-black/10 text-zinc-600 hover:text-black hover:border-black/20 hover:bg-white'
                            : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : isLight
                              ? 'bg-black/5 text-zinc-500 group-hover:text-black'
                              : 'bg-white/5 text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        {proj.icon}
                      </span>
                      <span className="tracking-tight">{proj.title}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Información y Descripción del Proyecto */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`relative isolate overflow-hidden rounded-3xl backdrop-blur-md border p-6 sm:p-7 flex flex-col gap-5 transition-colors duration-300 ${
                  isLight
                    ? 'bg-white/85 border-black/10 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]'
                    : 'bg-zinc-900/70 border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)]'
                }`}
              >
                {/* Resplandor decorativo sutil */}
                <div
                  className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
                    isLight ? 'bg-blue-500/10' : 'bg-white/[0.04]'
                  }`}
                  aria-hidden="true"
                />

                {/* Etiquetas superiores */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border ${
                      isLight
                        ? 'bg-black/[0.04] border-black/10 text-zinc-700'
                        : 'bg-white/5 border border-white/15 text-zinc-300'
                    }`}
                  >
                    {activeProject.category}
                  </span>
                  {activeProject.status && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono border flex items-center gap-1.5 ${
                        isLight
                          ? 'bg-black/[0.03] border-black/10 text-zinc-700'
                          : 'bg-white/5 border-white/10 text-zinc-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {activeProject.status}
                    </span>
                  )}
                </div>

                {/* Título y Descripción corta */}
                <div className="flex flex-col gap-2">
                  <h3 className={`font-display font-medium text-2xl sm:text-3xl tracking-wide ${isLight ? 'text-zinc-950' : 'text-white'}`}>
                    {activeProject.title}
                  </h3>
                  {activeProject.role && (
                    <span className={`text-xs font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {activeProject.role}
                    </span>
                  )}
                  <p className={`font-sans text-sm sm:text-base leading-relaxed mt-1 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {activeProject.description}
                  </p>
                </div>

                {/* Tecnologías */}
                {activeProject.technologies && activeProject.technologies.length > 0 && (
                  <div className="flex flex-col gap-2 pt-1">
                    <span className={`text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      <Layers className="w-3.5 h-3.5" />
                      <span>{t.techStack}</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                            isLight
                              ? 'bg-black/[0.04] border-black/10 text-zinc-800'
                              : 'bg-white/[0.04] border-white/10 text-zinc-200 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acciones del Proyecto */}
                <div className={`flex items-center gap-2.5 pt-2 flex-wrap border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                  {/* Botón Visitar Sitio Web (si existe liveUrl) */}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 text-zinc-950 hover:bg-amber-300 text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.visitWeb}</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a GitHub único */}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer ${
                        isLight
                          ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                          : 'bg-white text-zinc-950 hover:bg-zinc-200'
                      }`}
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>{t.viewCode}</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a Frontend Repo */}
                  {activeProject.githubFrontendUrl && (
                    <a
                      href={activeProject.githubFrontendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer ${
                        isLight
                          ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                          : 'bg-white text-zinc-950 hover:bg-zinc-200'
                      }`}
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>{t.frontendRepo}</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a Backend Repo */}
                  {activeProject.githubBackendUrl && (
                    <a
                      href={activeProject.githubBackendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                        isLight
                          ? 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-800'
                          : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                      }`}
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>{t.backendRepo}</span>
                    </a>
                  )}

                  {activeProject.appUrl && (
                    <button
                      type="button"
                      onClick={handleOpenActiveModal}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                        isLight
                          ? 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-800'
                          : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.tryApp}</span>
                    </button>
                  )}

                  {activeProject.downloadUrl && (
                    <a
                      href={activeProject.downloadUrl}
                      download={activeProject.downloadName}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                        isLight
                          ? 'bg-black/5 hover:bg-black/10 border-black/10 text-zinc-800'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-white'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.download}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleOpenActiveModal}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ml-auto ${
                      isLight
                        ? 'text-zinc-600 hover:text-black hover:bg-black/5'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                    title="Ampliar vista previa y detalles completos"
                  >
                    <span>{t.specSheet}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
