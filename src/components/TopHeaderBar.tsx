import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, Magnetic, ScrambleText } from './motion';
import { NAV_ITEMS, useActiveSection } from './BottomFloatingDock';

export const TopHeaderBar: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { activeHref, setActiveHref } = useActiveSection();

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('es-CO', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeString(formatter.format(now));
      } catch {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        setTimeString(`${hh}:${mm}`);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveHref(href);
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Backdrop para cerrar el menú móvil al tocar fuera */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-5 pointer-events-none animate-fade-in anim-delay-0"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs tracking-[0.14em] uppercase font-sans font-medium text-zinc-200">
          {/* Top-Left: Logo */}
          <Magnetic strength={0.35} className="pointer-events-auto shrink-0">
            <a
              href="#inicio"
              onClick={(e) => handleMobileNavClick(e, '#inicio', 'inicio')}
              className="font-display text-base sm:text-lg tracking-[0.12em] leading-none text-white hover:text-zinc-300 menu-transition flex items-center gap-1.5"
            >
              <ScrambleText text="JFZP®" />
            </a>
          </Magnetic>

          {/* Top-Center: GitHub & CV */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 min-w-0">
            <Magnetic strength={0.28}>
              <a
                href="https://github.com/Juan33-Felipe"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white menu-transition text-[10px] sm:text-[11px] font-medium tracking-[0.12em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shrink-0"
              >
                <ScrambleText text="GITHUB" />
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white menu-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.28}>
              <a
                href="/CV_Juan_Felipe_Zambrano.pdf"
                download="CV_Juan_Felipe_Zambrano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Descargar Curriculum Vitae en PDF"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/40 text-white menu-transition text-[10px] sm:text-[11px] font-medium tracking-[0.12em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] shrink-0"
              >
                <ScrambleText text="CV" />
                <Download className="w-3.5 h-3.5 text-zinc-300 group-hover:text-white menu-transition group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </div>

          {/* Top-Right (Desktop): Location & Clock */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 font-sans font-medium text-[11px] sm:text-xs tracking-[0.12em] text-zinc-300 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shrink-0">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>PASTO, CO · {timeString || '08:25'}</span>
          </div>

          {/* Top-Right (Mobile): Botón de 3 barritas (Hamburger Menu) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="pointer-events-auto md:hidden relative flex flex-col items-center justify-center w-10 h-10 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)] active:scale-95 transition-transform"
          >
            <span className="sr-only">Menú</span>
            <div className="flex flex-col items-center justify-center gap-[5px] w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6.8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="block h-[1.8px] w-[18px] rounded-full bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="block h-[1.8px] w-[18px] rounded-full bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6.8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="block h-[1.8px] w-[18px] rounded-full bg-white origin-center"
              />
            </div>
          </button>
        </div>

        {/* Menú desplegable móvil */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav-menu"
              aria-label="Navegación principal móvil"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="pointer-events-auto md:hidden mt-3 mx-auto max-w-md rounded-3xl bg-[#0b0b10]/95 backdrop-blur-2xl border border-white/15 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] overflow-hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeHref === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: 0.03 * idx, ease: EASE_OUT }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleMobileNavClick(e, item.href, item.id)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative flex items-center justify-between px-4 py-3 rounded-2xl font-sans text-sm tracking-tight transition-colors ${
                          isActive
                            ? 'bg-white text-[#070709] font-semibold shadow-[0_2px_16px_rgba(255,255,255,0.28)]'
                            : 'text-zinc-200 font-medium hover:bg-white/[0.08] hover:text-white active:bg-white/[0.12]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`h-2 w-2 rounded-full transition-transform ${
                            isActive ? 'bg-[#070709] scale-100' : 'bg-white/20 scale-75'
                          }`}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Botón de Descargar CV en menú móvil */}
              <div className="mt-2 pt-2 px-1 border-t border-white/10">
                <a
                  href="/CV_Juan_Felipe_Zambrano.pdf"
                  download="CV_Juan_Felipe_Zambrano.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-white text-[#070709] font-sans text-xs font-semibold tracking-wider uppercase shadow-[0_2px_16px_rgba(255,255,255,0.25)] hover:bg-zinc-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CV (PDF)</span>
                </a>
              </div>

              {/* Pie del menú desplegable con ubicación y hora en tiempo real */}
              <div className="mt-2 pt-2.5 px-3.5 pb-1 border-t border-white/10 flex items-center justify-between text-[10px] tracking-[0.14em] uppercase font-sans font-medium text-zinc-400">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>PASTO, CO</span>
                </span>
                <span className="font-mono text-zinc-300">{timeString || '08:25'}</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
