import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

export interface NavItem {
  key: keyof typeof translations.es.nav;
  href: string;
  id: string;
}

export const NAV_ITEMS_DEF: NavItem[] = [
  { key: 'inicio', href: '#inicio', id: 'inicio' },
  { key: 'sobreMi', href: '#sobre-mi', id: 'sobre-mi' },
  { key: 'testimonios', href: '#testimonios', id: 'testimonios' },
  { key: 'proyectos', href: '#proyectos', id: 'proyectos' },
  { key: 'experiencia', href: '#experiencia', id: 'experiencia' },
  { key: 'contacto', href: '#contacto', id: 'contacto' },
];

export function useActiveSection() {
  const [activeHref, setActiveHref] = useState<string>('#inicio');

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveHref('#contacto');
        return;
      }

      // Línea de referencia en el viewport (por ejemplo, al 35% de la pantalla desde arriba)
      const triggerPoint = window.innerHeight * 0.35;

      for (let i = NAV_ITEMS_DEF.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS_DEF[i];
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la parte superior de la sección ya cruzó el triggerPoint hacia arriba
          if (rect.top <= triggerPoint) {
            setActiveHref(item.href);
            return;
          }
        }
      }

      setActiveHref('#inicio');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeHref, setActiveHref };
}

export const BottomFloatingDock: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang].nav;
  const isLight = theme === 'light';
  const { activeHref, setActiveHref } = useActiveSection();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveHref(href);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:flex fixed bottom-5 sm:bottom-6 inset-x-0 z-50 justify-center px-3 pointer-events-none">
      <nav
        aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
        className={`pointer-events-auto max-w-full overflow-x-auto no-scrollbar rounded-full p-1.5 backdrop-blur-xl border menu-transition animate-fade-in anim-delay-200 ${
          isLight
            ? 'bg-white/85 border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]'
            : 'bg-white/[0.06] border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)]'
        }`}
      >
        <ul className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
          {NAV_ITEMS_DEF.map((item, index) => {
            const isActive = activeHref === item.href;
            const staggerDelayMs = 100 + index * 80;
            const label = (t[item.key] as string) || item.id;

            return (
              <li
                key={item.href}
                className="animate-fade-up"
                style={{ animationDelay: `${staggerDelayMs}ms` }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`menu-transition relative inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-[13px] tracking-tight ${
                    isActive
                      ? isLight
                        ? 'text-white font-semibold'
                        : 'text-[#070709] font-semibold'
                      : isLight
                        ? 'text-zinc-600 font-medium hover:text-black hover:bg-black/[0.05]'
                        : 'text-zinc-300 font-medium hover:text-white hover:bg-white/[0.09]'
                  }`}
                >
                  {/* Píldora activa que se desliza entre elementos */}
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-pill"
                      className={`absolute inset-0 rounded-full ${
                        isLight
                          ? 'bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.3)]'
                          : 'bg-white shadow-[0_2px_16px_rgba(255,255,255,0.32)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        key="dot"
                        initial={{ width: 0, marginRight: 0, opacity: 0, scale: 0 }}
                        animate={{ width: 6, marginRight: 6, opacity: 0.8, scale: 1 }}
                        exit={{ width: 0, marginRight: 0, opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative h-1.5 rounded-full shrink-0 ${
                          isLight ? 'bg-white' : 'bg-[#070709]'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
