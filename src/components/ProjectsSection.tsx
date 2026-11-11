import React, { useEffect, useRef, useState } from 'react';
import CardSwap from './CardSwap';
import type { CardSwapItem, CardSwapRef } from './CardSwap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Sparkles,
  Layers,
  Maximize2,
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

const PROJECTS: CardSwapItem[] = [
  {
    title: 'EquiWage Analytics',
    image: '/equiwage-preview.png',
    alt: 'EquiWage Analytics - Plataforma de análisis de equidad salarial',
    appUrl: '/projects/equiwage/index.html',
    downloadUrl: '/downloads/EquiWage Analytics 1.0.0.exe',
    downloadName: 'EquiWage Analytics 1.0.0.exe',
    githubUrl: 'https://github.com/Juan33-Felipe/EquiWage-Analytics',
    category: 'Analítica Salarial & Desktop',
    role: 'Desarrollador de Software & Arquitectura Frontend',
    status: 'v1.0.0 Estable',
    description:
      'Plataforma de escritorio y web para auditoría salarial, detección de brechas de compensación y visualización analítica avanzada con cumplimiento normativo.',
    longDescription:
      'Plataforma integral de analítica de compensación diseñada para departamentos de talento humano, auditoría y compensaciones. Permite ingerir nóminas complejas, normalizar variables categóricas y calcular discrepancias salariales tanto brutas como ajustadas mediante modelos estadísticos en memoria, facilitando la identificación proactiva de brechas de género o cargo y la generación de planes de nivelación con proyección presupuestaria.',
    features: [
      'Motor estadístico en tiempo real con cálculo de medianas, percentiles y dispersión salarial.',
      'Generador de informes de cumplimiento legal con sugerencias de ajuste presupuestal gradual.',
      'Simulador interactivo de costos organizacionales para cierre de brechas en múltiples fases.',
      'Arquitectura de procesamiento en cliente para estricta confidencialidad de datos salariales.',
    ],
    architecture:
      'Arquitectura desacoplada basada en Electron + React con TypeScript, aislamiento de procesos mediante IPC seguro y motor de cálculo estadístico optimizado para procesar nóminas de miles de registros sin latencia perceptible ni envío de datos sensibles a servidores remotos.',
    technologies: ['React', 'Electron', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite', 'Lucide'],
    icon: <HugeiconsIcon icon={Analytics01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    title: 'EchoStock',
    image: '/echostock-preview.jpg',
    alt: 'EchoStock - Aplicación para SmartWatch y gestión de almacén por voz',
    githubFrontendUrl: 'https://github.com/Juan33-Felipe/EchoStock-WearApp.git',
    githubBackendUrl: 'https://github.com/Juan33-Felipe/EchoStock-backend.git',
    category: 'Wearable IoT & Logística por Voz',
    role: 'Desarrollador de Software & Backend',
    status: 'Prototipo Funcional',
    description:
      'Ecosistema vestible para SmartWatch (Wear OS) y backend reactivo que permite a operarios de almacén consultar inventario y registrar stock mediante comandos de voz.',
    longDescription:
      'Solución operativa diseñada para acelerar tareas de picking e inventario en centros logísticos. A través de un reloj inteligente con Wear OS y síntesis de voz, los operarios pueden interrogar existencias, ubicar estanterías y reportar ingresos o mermas con las manos completamente libres, reduciendo drásticamente los desplazamientos innecesarios y los errores de transcripción manual.',
    features: [
      'Motor de reconocimiento por voz tolerante a ruido ambiental y especializado en códigos SKU.',
      'Feedback háptico configurable en la muñeca para confirmar operaciones y alertar stock crítico.',
      'Canal de comunicación bidireccional en tiempo real con el servidor mediante WebSockets.',
      'Búfer local para almacenamiento temporal de operaciones en zonas de almacén sin cobertura Wi-Fi.',
    ],
    architecture:
      'Arquitectura orientada a eventos (Event-Driven) con WebSockets persistentes de baja sobrecarga entre los dispositivos Wear OS y la API en Node.js, implementando un control de concurrencia optimista para evitar conflictos en inventarios compartidos.',
    technologies: ['Wear OS', 'Kotlin', 'Android SDK', 'Node.js', 'Express', 'WebSockets', 'Speech-to-Text'],
    icon: <HugeiconsIcon icon={SmartWatch01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    title: 'sudo-kill-9',
    image: '/sudo-kill-9-preview.jpg',
    alt: 'sudo-kill-9 - Videojuego con temática Linux y combate en Unity',
    githubUrl: 'https://github.com/Xander-JS/sudo-kill-9.git',
    category: 'Videojuego 3D & Simulación Cinemática',
    role: 'Desarrollador de Videojuegos / Gameplay & VFX',
    status: 'Proyecto Destacado',
    description:
      'Videojuego de acción espacial con estética cibernética, desarrollado en Unity con C#, físicas balísticas dinámicas, efectos procedurales y batallas contra jefes.',
    longDescription:
      'Experiencia interactiva 3D con ritmo vertiginoso ambientada en un entorno cibernético hostil. Destaca por su sistema balístico avanzado con proyectiles guiados predictivos, un pipeline visual enriquecido mediante shaders personalizados en Universal Render Pipeline (URP) y una dirección de cámara inmersiva construida con Cinemachine para transiciones cinematográficas fluidas.',
    features: [
      'Proyectiles autoguiados (homing missiles) calculados mediante curvas de interpolación vectorial.',
      'Efectos visuales de partículas procedurales con Shader Graph optimizados para alto rendimiento.',
      'Inteligencia artificial de jefes basada en máquinas de estados jerárquicas con patrones multifase.',
      'Transiciones dinámicas entre cinemáticas de cámara y secuencias jugables sin cortes de carga.',
    ],
    architecture:
      'Arquitectura de componentes modulares con Scriptable Objects para desacoplar datos de armas de la lógica de ejecución, reduciendo la dependencia entre módulos y facilitando el balance paramétrico en tiempo real dentro del ciclo de juego.',
    technologies: ['Unity 3D', 'C#', 'URP', 'Shader Graph', 'VFX Graph', 'Cinemachine', 'Timeline'],
    icon: <HugeiconsIcon icon={GameController01Icon} size={14} strokeWidth={1.8} />,
  },
  {
    title: 'SpecAtlas',
    image: '/spec-atlas.gif',
    alt: 'SpecAtlas - Arquitectura y Calidad de Requisitos',
    githubFrontendUrl: 'https://github.com/Xander-JS/frontend_specatlas',
    githubBackendUrl: 'https://github.com/KevinTimaran/specatlas-backend.git',
    liveUrl: 'https://frontend-specatlas.vercel.app/',
    category: 'Ingeniería de Software & Grafos',
    role: 'Arquitecto de Soluciones',
    status: 'Fase de Investigación',
    description:
      'Sistema de análisis de calidad y consistencia de requisitos de software modelados como grafos de dependencias en Neo4j con evaluación semántica.',
    longDescription:
      'Herramienta de ingeniería formal orientada a mitigar la deuda técnica en etapas tempranas del ciclo de vida del software. Estructura especificaciones y requisitos funcionales/no funcionales como un grafo dirigido de interdependencias, permitiendo evaluar el impacto en cascada de modificaciones de alcance y detectar de manera algorítmica inconsistencias, solapamientos y ambigüedades.',
    features: [
      'Modelado topológico de dependencias funcionales, precondiciones y restricciones técnicas en Neo4j.',
      'Detección automática de dependencias circulares, requisitos huérfanos y solapamientos de alcance.',
      'Simulación de impacto para evaluar los módulos y casos de prueba afectados ante cambios en requisitos.',
      'Métricas semánticas de ambigüedad léxica y completitud basadas en directrices internacionales.',
    ],
    architecture:
      'Backend de microservicios con Spring Boot y motor de base de datos orientado a grafos nativo (Neo4j), permitiendo consultas complejas de impacto mediante Cypher en tiempo constante, complementado con visualización interactiva de grafos en frontend.',
    technologies: ['Neo4j', 'Cypher', 'Spring Boot', 'Java', 'React', 'D3.js', 'Docker'],
    icon: <HugeiconsIcon icon={DatabaseIcon} size={14} strokeWidth={1.8} />,
  },
  {
    title: 'LurifyCase Mobile',
    image: '/lurifycase-preview.jpg',
    alt: 'LurifyCase Mobile - Gestión de expedientes y auditoría legal',
    githubUrl: 'https://github.com/Juan33-Felipe/lurifyCase.git',
    category: 'Comercio Móvil & Personalización',
    role: 'Desarrollador Móvil',
    status: 'Prototipo Multiplataforma',
    description:
      'Ecosistema móvil para la gestión centralizada de expedientes jurídicos, seguimiento de casos activos y auditoría asistida.',
    longDescription:
      'Solución móvil de alta productividad orientada al ámbito legal y gestión de procesos. Permite a abogados y usuarios revisar expedientes activos, registrar acciones probatorias, recibir alertas de auditoría y organizar casos jurídicos en tiempo real con una interfaz moderna y fluida.',
    features: [
      'Visualización y seguimiento centralizado de expedientes activos y archivados.',
      'Registro probatorio y auditoría con notificaciones en tiempo real.',
      'Flujo de acciones pendientes y radicación de documentos simplificada.',
      'Diseño móvil intuitivo con navegación optimizada para iOS y Android.',
    ],
    architecture:
      'Clean Architecture implementada en React Native / Expo con TypeScript, persistencia local optimizada y comunicación con servicios API REST para sincronización de expedientes y estados.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind', 'Mobile UI'],
    icon: <HugeiconsIcon icon={SmartPhone01Icon} size={14} strokeWidth={1.8} />,
  },
];

export const ProjectsSection: React.FC = () => {
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

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const swapDimensions = isMobile
    ? { width: 320, height: 235, cardDistance: 22, verticalDistance: 28 }
    : isTablet
      ? { width: 440, height: 320, cardDistance: 38, verticalDistance: 44 }
      : { width: 520, height: 380, cardDistance: 50, verticalDistance: 55 };

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

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
        <SectionHeading id="projects-heading">Proyectos</SectionHeading>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 leading-relaxed">
          Explora la arquitectura, tecnologías y características técnicas de cada solución desarrollada.
          Haz clic en cualquier tarjeta o explora la ficha técnica a continuación.
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
                items={PROJECTS}
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
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 text-white active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                  {activeIndex + 1} de {PROJECTS.length}
                </span>
                <button
                  type="button"
                  onClick={() => swapRef.current?.next()}
                  aria-label="Siguiente proyecto"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 text-white active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Selector de pestañas interactivas */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-none flex items-center justify-start lg:justify-center gap-2 sm:gap-2.5">
                {PROJECTS.map((proj, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={proj.title}
                      type="button"
                      onClick={() => handleSelectProject(idx)}
                      className={`group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border text-xs font-medium transition-all duration-300 shrink-0 select-none ${
                        isSelected
                          ? 'bg-zinc-800 border-white/40 text-white shadow-[0_0_16px_rgba(255,255,255,0.12)]'
                          : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white'
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
                className="relative isolate overflow-hidden rounded-3xl bg-zinc-900/70 backdrop-blur-md border border-white/10 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-5"
              >
                {/* Resplandor decorativo sutil monocromático */}
                <div
                  className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Etiquetas superiores */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/15 text-zinc-300">
                    {activeProject.category}
                  </span>
                  {activeProject.status && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-white/5 border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {activeProject.status}
                    </span>
                  )}
                </div>

                {/* Título y Descripción corta */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-wide">
                    {activeProject.title}
                  </h3>
                  {activeProject.role && (
                    <span className="text-xs font-mono text-zinc-400">
                      {activeProject.role}
                    </span>
                  )}
                  <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mt-1">
                    {activeProject.description}
                  </p>
                </div>

                {/* Tecnologías */}
                {activeProject.technologies && activeProject.technologies.length > 0 && (
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Stack Tecnológico</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-200 bg-white/[0.04] border border-white/10 hover:border-white/25 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acciones del Proyecto */}
                <div className="flex items-center gap-2.5 pt-2 flex-wrap border-t border-white/10">
                  {/* Botón Visitar Sitio Web (si existe liveUrl) */}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 text-zinc-950 hover:bg-amber-300 text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Visitar Web</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a GitHub único */}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>Ver Código</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a Frontend Repo */}
                  {activeProject.githubFrontendUrl && (
                    <a
                      href={activeProject.githubFrontendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>Frontend Repo</span>
                    </a>
                  )}

                  {/* Botón Redireccionar a Backend Repo */}
                  {activeProject.githubBackendUrl && (
                    <a
                      href={activeProject.githubBackendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium active:scale-95 transition-all cursor-pointer"
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span>Backend Repo</span>
                    </a>
                  )}

                  {activeProject.appUrl && (
                    <button
                      type="button"
                      onClick={handleOpenActiveModal}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Probar App</span>
                    </button>
                  )}

                  {activeProject.downloadUrl && (
                    <a
                      href={activeProject.downloadUrl}
                      download={activeProject.downloadName}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-medium active:scale-95 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Descargar</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleOpenActiveModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-medium transition-all cursor-pointer ml-auto hover:bg-white/5"
                    title="Ampliar vista previa y detalles completos"
                  >
                    <span>Ficha técnica</span>
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
