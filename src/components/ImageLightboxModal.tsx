import React, { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
  ExternalLink,
  RotateCw,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  FileText,
  Activity,
  AppWindow,
} from 'lucide-react';

export interface LightboxMetric {
  label: string;
  value: string;
}

export interface LightboxItem {
  title?: string;
  image?: string;
  alt?: string;
  icon?: React.ReactNode;
  appUrl?: string;
  downloadUrl?: string;
  downloadName?: string;
  description?: string;
  category?: string;
  role?: string;
  status?: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  architecture?: string;
  metrics?: LightboxMetric[];
  githubUrl?: string;
  githubFrontendUrl?: string;
  githubBackendUrl?: string;
  liveUrl?: string;
}

export interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onNavigate?: (newIndex: number) => void;
}

// Ultra-smooth editorial Expo-Out easing curve
const EXPANSION_EASE = [0.16, 1, 0.3, 1] as const;

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const count = items.length;
  const currentItem = items[currentIndex];

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isApp = Boolean(currentItem?.appUrl);

  // Tab activo: 'media' (imagen o app) o 'details' (ficha técnica)
  const [activeTab, setActiveTab] = useState<'media' | 'details'>('media');

  // Reset tab to media when project changes
  useEffect(() => {
    setActiveTab('media');
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (count <= 1) return;
    const prev = (currentIndex - 1 + count) % count;
    onNavigate?.(prev);
  }, [currentIndex, count, onNavigate]);

  const handleNext = useCallback(() => {
    if (count <= 1) return;
    const next = (currentIndex + 1) % count;
    onNavigate?.(next);
  }, [currentIndex, count, onNavigate]);

  const handleReloadIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  // Keyboard navigation & Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && activeTab === 'media' && !isApp) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' && activeTab === 'media' && !isApp) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, isApp, activeTab]);

  // Lock body scroll smoothly when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title ? `Proyecto ${currentItem.title}` : 'Vista previa del proyecto'}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-3 md:p-4 select-none"
        >
          {/* 1. Backdrop with deep blur and smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EXPANSION_EASE }}
            style={{ willChange: 'opacity' }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 2. Soft expanding radial aura behind the card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.2, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: EXPANSION_EASE }}
            className="absolute z-0 w-[550px] h-[550px] rounded-full bg-white/10 blur-3xl pointer-events-none"
          />

          {/* 3. Modal Dialog Card expanding forward */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.76,
              y: 20,
              filter: 'blur(6px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 12,
              filter: 'blur(4px)',
            }}
            transition={{
              duration: 0.58,
              ease: EXPANSION_EASE,
            }}
            style={{ willChange: 'transform, opacity, filter' }}
            className="relative z-10 w-[96vw] max-w-[1540px] h-[92vh] max-h-[94vh] flex flex-col bg-[#0d0d12]/95 border border-white/20 rounded-3xl p-2.5 sm:p-4 shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_40px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Glass Highlight Rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Header: Title, Category, Tabs, Actions & Close Button */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.45, ease: EXPANSION_EASE }}
              className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-white/10 px-1 sm:px-2 shrink-0"
            >
              {/* Title & Category Badge */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="p-1.5 rounded-lg bg-white/10 text-white/90 shrink-0 shadow-sm border border-white/10">
                  <ZoomIn className="w-4 h-4 text-zinc-300" />
                </span>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    {currentItem.title && (
                      <h3 className="font-sans font-semibold text-sm sm:text-base text-white/95 truncate tracking-tight">
                        {currentItem.title}
                      </h3>
                    )}
                    {count > 1 && (
                      <span className="shrink-0 text-xs text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-mono">
                        {currentIndex + 1} / {count}
                      </span>
                    )}
                  </div>
                  {currentItem.category && (
                    <span className="text-[11px] text-zinc-400 truncate">
                      {currentItem.category}
                      {currentItem.status ? ` • ${currentItem.status}` : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Central View Toggles */}
              <div className="flex items-center bg-white/[0.06] p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'media'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <AppWindow className="w-3.5 h-3.5" />
                  <span>{isApp ? 'App en vivo' : 'Vista previa'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'details'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ficha técnica</span>
                </button>
              </div>

              {/* Action Buttons: Download EXE, Open External, Close */}
              <div className="flex items-center gap-2">
                {/* Download EXE button */}
                {currentItem.downloadUrl && (
                  <motion.a
                    href={currentItem.downloadUrl}
                    download={currentItem.downloadName || 'EquiWage Analytics 1.0.0.exe'}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    title="Descargar aplicación ejecutable para Windows (.exe)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="hidden sm:inline">Descargar .exe</span>
                  </motion.a>
                )}

                {/* Open in new tab button */}
                {(currentItem.liveUrl || currentItem.appUrl) && (
                  <motion.a
                    href={currentItem.liveUrl || currentItem.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    title="Visitar sitio web / Abrir aplicación en nueva pestaña"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.a>
                )}

                {/* Close Button */}
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Cerrar modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Central Display: Media or Technical Details View */}
            <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden my-1 rounded-2xl bg-black/60 border border-white/10">
              {activeTab === 'details' ? (
                /* Full Technical Sheet View inside Modal */
                <div className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
                  {/* Top Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/15 text-zinc-300">
                          {currentItem.category || 'Proyecto de Software'}
                        </span>
                        {currentItem.status && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-300 bg-white/5 border border-white/10">
                            {currentItem.status}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                        {currentItem.title}
                      </h4>
                      {currentItem.role && (
                        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                          Rol: {currentItem.role}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {currentItem.liveUrl && (
                        <a
                          href={currentItem.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 text-zinc-950 hover:bg-amber-300 text-xs font-semibold shadow-md transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Visitar Web</span>
                        </a>
                      )}
                      {currentItem.githubUrl && (
                        <a
                          href={currentItem.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold shadow-md transition-all"
                        >
                          <span>Ver Código en GitHub</span>
                        </a>
                      )}
                      {currentItem.githubFrontendUrl && (
                        <a
                          href={currentItem.githubFrontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold shadow-md transition-all"
                        >
                          <span>Frontend Repo</span>
                        </a>
                      )}
                      {currentItem.githubBackendUrl && (
                        <a
                          href={currentItem.githubBackendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all"
                        >
                          <span>Backend Repo</span>
                        </a>
                      )}
                      {currentItem.appUrl && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('media')}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interactuar con la aplicación</span>
                        </button>
                      )}
                      {currentItem.downloadUrl && (
                        <a
                          href={currentItem.downloadUrl}
                          download={currentItem.downloadName}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Descargar .exe</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Descripción extendida */}
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Descripción Técnica y Alcance</span>
                    </h5>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-200 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      {currentItem.longDescription || currentItem.description}
                    </p>
                  </div>

                  {/* Características clave */}
                  {currentItem.features && currentItem.features.length > 0 && (
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Funcionalidades y Capacidades Principales</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentItem.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-xs sm:text-sm text-zinc-300 leading-snug">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Arquitectura */}
                  {currentItem.architecture && (
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Arquitectura del Sistema & Decisiones de Diseño</span>
                      </h5>
                      <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {currentItem.architecture}
                      </div>
                    </div>
                  )}

                  {/* Stack Tecnológico */}
                  {currentItem.technologies && currentItem.technologies.length > 0 && (
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Tecnologías y Frameworks</span>
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {currentItem.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-xs font-medium text-zinc-200 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : currentItem.appUrl ? (
                /* Interactive App Window with simulated Desktop Frame */
                <div className="flex-1 flex flex-col w-full h-full min-h-0 overflow-hidden bg-[#0f172a]">
                  {/* Embedded App Chrome Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-white/10 select-none shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 pl-2 hidden sm:inline">
                        {currentItem.title || 'Aplicación Interactiva'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReloadIframe}
                        title="Reiniciar aplicación"
                        className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* The Live Interactive Application Iframe */}
                  <div className="relative flex-1 w-full min-h-0">
                    <iframe
                      ref={iframeRef}
                      src={currentItem.appUrl}
                      title={currentItem.title || 'EquiWage Analytics'}
                      className="absolute inset-0 w-full h-full border-0 bg-[#0f172a]"
                      allow="fullscreen"
                    />
                  </div>
                </div>
              ) : (
                /* Standard Image Presentation */
                <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <motion.img
                    key={currentItem.image}
                    src={currentItem.image}
                    alt={currentItem.alt || currentItem.title || 'Vista previa del proyecto'}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.55, ease: EXPANSION_EASE }}
                    style={{ willChange: 'transform, opacity' }}
                    className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-xl select-none shadow-2xl"
                  />

                  {/* Luminous light sweep reflection upon expansion */}
                  <motion.div
                    initial={{ x: '-120%', opacity: 0.6 }}
                    animate={{ x: '220%', opacity: 0 }}
                    transition={{ delay: 0.25, duration: 0.9, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-22deg]"
                  />

                  {/* Navigation Controls (If multiple items) */}
                  {count > 1 && (
                    <>
                      <motion.button
                        type="button"
                        onClick={handlePrev}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.22, duration: 0.4, ease: EXPANSION_EASE }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Proyecto anterior"
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 flex items-center justify-center text-white/90 hover:text-white backdrop-blur-md transition-colors duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={handleNext}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.22, duration: 0.4, ease: EXPANSION_EASE }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Siguiente proyecto"
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 flex items-center justify-center text-white/90 hover:text-white backdrop-blur-md transition-colors duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer Hint / Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-2 px-2 flex flex-wrap items-center justify-between gap-2 text-zinc-400 text-[11px] sm:text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">
                  {currentItem.description || 'Haz clic fuera o presiona Esc para cerrar'}
                </span>
                {activeTab === 'media' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="underline text-zinc-300 hover:text-white font-medium ml-1 shrink-0"
                  >
                    Ver ficha técnica completa →
                  </button>
                )}
              </div>
              {isApp ? (
                <span className="text-zinc-400 flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-300" /> Aplicación funcional en vivo
                </span>
              ) : (
                count > 1 && (
                  <span className="hidden sm:inline shrink-0">
                    Usa las teclas ← y → para navegar
                  </span>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ImageLightboxModal;
