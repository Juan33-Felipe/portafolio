import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Sun, Moon, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, Magnetic, ScrambleText } from './motion';
import { NAV_ITEMS_DEF, useActiveSection } from './BottomFloatingDock';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

export const TopHeaderBar: React.FC = () => {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const t = translations[lang].nav;
  const isLight = theme === 'light';

  const [timeString, setTimeString] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { activeHref, setActiveHref } = useActiveSection();

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
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
  }, [lang]);

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

  const pillClass = isLight
    ? 'bg-white/80 hover:bg-white text-zinc-800 hover:text-black border-black/10 hover:border-black/25 shadow-sm'
    : 'bg-white/[0.05] hover:bg-white/10 text-zinc-200 hover:text-white border-white/10 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]';

  const cvPillClass = isLight
    ? 'bg-black text-white hover:bg-zinc-800 border-black/20 shadow-md'
    : 'bg-white/[0.08] hover:bg-white/15 text-white border-white/15 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]';

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
        className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 lg:px-12 py-3 sm:py-5 pointer-events-none animate-fade-in anim-delay-0"
      >
        <div
          className={`max-w-[1600px] mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs tracking-[0.14em] uppercase font-sans font-medium transition-colors ${
            isLight ? 'text-zinc-800' : 'text-zinc-200'
          }`}
        >
          {/* Top-Left: Logo */}
          <Magnetic strength={0.35} className="pointer-events-auto shrink-0">
            <a
              href="#inicio"
              onClick={(e) => handleMobileNavClick(e, '#inicio', 'inicio')}
              className={`font-display text-base sm:text-lg tracking-[0.12em] leading-none menu-transition flex items-center gap-1.5 ${
                isLight ? 'text-black hover:text-zinc-700' : 'text-white hover:text-zinc-300'
              }`}
            >
              <ScrambleText text="JFZP®" />
            </a>
          </Magnetic>

          {/* Top-Center: GitHub, CV & Toggles */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            {/* GitHub */}
            <Magnetic strength={0.28}>
              <a
                href="https://github.com/Juan33-Felipe"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md border menu-transition text-[10px] sm:text-[11px] font-medium tracking-[0.12em] shrink-0 ${pillClass}`}
              >
                <ScrambleText text="GITHUB" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 menu-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            {/* CV Download */}
            <Magnetic strength={0.28}>
              <a
                href="/CV_Juan_Felipe_Zambrano.pdf"
                download="CV_Juan_Felipe_Zambrano.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title={lang === 'es' ? 'Descargar Curriculum Vitae en PDF' : 'Download Curriculum Vitae in PDF'}
                className={`group inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md border menu-transition text-[10px] sm:text-[11px] font-medium tracking-[0.12em] shrink-0 ${cvPillClass}`}
              >
                <ScrambleText text={t.cv} />
                <Download className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 menu-transition group-hover:translate-y-0.5" />
              </a>
            </Magnetic>

            {/* Language Selector Toggle Button */}
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={toggleLang}
                aria-label={t.langToggleAria}
                title={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                className={`group inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md border menu-transition text-[10px] sm:text-[11px] font-bold tracking-[0.14em] shrink-0 cursor-pointer ${pillClass}`}
              >
                <Globe className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 transition-opacity" />
                <span>{lang === 'es' ? 'ES' : 'EN'}</span>
              </button>
            </Magnetic>

            {/* Light / Dark Mode Toggle Button */}
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={t.themeToggleAria}
                title={isLight ? (lang === 'es' ? 'Activar modo oscuro' : 'Switch to dark mode') : (lang === 'es' ? 'Activar modo claro' : 'Switch to light mode')}
                className={`group inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border menu-transition shrink-0 cursor-pointer ${pillClass}`}
              >
                {isLight ? (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-800 group-hover:text-black transition-colors" />
                ) : (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:text-amber-200 transition-colors" />
                )}
              </button>
            </Magnetic>
          </div>

          {/* Top-Right (Desktop): Location & Clock */}
          <div
            className={`pointer-events-auto hidden md:flex items-center gap-2 font-sans font-medium text-[11px] sm:text-xs tracking-[0.12em] px-3.5 py-1.5 rounded-full backdrop-blur-md border shrink-0 ${
              isLight
                ? 'text-zinc-700 bg-white/80 border-black/10'
                : 'text-zinc-300 bg-white/[0.04] border-white/10'
            }`}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>{t.location} · {timeString || '08:25'}</span>
          </div>

          {/* Top-Right (Mobile): Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? t.menuAriaClose : t.menuAriaOpen}
            className={`pointer-events-auto md:hidden relative flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-xl border active:scale-95 transition-transform ${
              isLight
                ? 'bg-white/90 border-black/15 text-zinc-900 shadow-md'
                : 'bg-white/[0.07] border-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)]'
            }`}
          >
            <span className="sr-only">Menú</span>
            <div className="flex flex-col items-center justify-center gap-[5px] w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6.8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className={`block h-[1.8px] w-[18px] rounded-full origin-center ${
                  isLight ? 'bg-zinc-900' : 'bg-white'
                }`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className={`block h-[1.8px] w-[18px] rounded-full origin-center ${
                  isLight ? 'bg-zinc-900' : 'bg-white'
                }`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6.8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className={`block h-[1.8px] w-[18px] rounded-full origin-center ${
                  isLight ? 'bg-zinc-900' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Menú desplegable móvil */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav-menu"
              aria-label={lang === 'es' ? 'Navegación principal móvil' : 'Mobile main navigation'}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className={`pointer-events-auto md:hidden mt-3 mx-auto max-w-md rounded-3xl backdrop-blur-2xl border p-2.5 overflow-hidden ${
                isLight
                  ? 'bg-white/95 border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)]'
                  : 'bg-[#0b0b10]/95 border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)]'
              }`}
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS_DEF.map((item, idx) => {
                  const isActive = activeHref === item.href;
                  const label = (t[item.key] as string) || item.id;
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
                            ? isLight
                              ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                              : 'bg-white text-[#070709] font-semibold shadow-[0_2px_16px_rgba(255,255,255,0.28)]'
                            : isLight
                              ? 'text-zinc-700 font-medium hover:bg-black/[0.05] hover:text-black active:bg-black/[0.08]'
                              : 'text-zinc-200 font-medium hover:bg-white/[0.08] hover:text-white active:bg-white/[0.12]'
                        }`}
                      >
                        <span>{label}</span>
                        <span
                          className={`h-2 w-2 rounded-full transition-transform ${
                            isActive
                              ? isLight
                                ? 'bg-white scale-100'
                                : 'bg-[#070709] scale-100'
                              : isLight
                                ? 'bg-black/20 scale-75'
                                : 'bg-white/20 scale-75'
                          }`}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Botón de Descargar CV en menú móvil */}
              <div className={`mt-2 pt-2 px-1 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <a
                  href="/CV_Juan_Felipe_Zambrano.pdf"
                  download="CV_Juan_Felipe_Zambrano.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl font-sans text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isLight
                      ? 'bg-black text-white hover:bg-zinc-800 shadow-md'
                      : 'bg-white text-[#070709] hover:bg-zinc-200 shadow-[0_2px_16px_rgba(255,255,255,0.25)]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadCv}</span>
                </a>
              </div>

              {/* Pie del menú desplegable con ubicación y hora en tiempo real */}
              <div
                className={`mt-2 pt-2.5 px-3.5 pb-1 border-t flex items-center justify-between text-[10px] tracking-[0.14em] uppercase font-sans font-medium ${
                  isLight ? 'border-black/10 text-zinc-500' : 'border-white/10 text-zinc-400'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>{t.location}</span>
                </span>
                <span className={`font-mono ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  {timeString || '08:25'}
                </span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
