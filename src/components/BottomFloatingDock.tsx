import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Sobre Mí', href: '#sobre-mi', id: 'sobre-mi' },
  { label: 'Testimonios', href: '#testimonios', id: 'testimonios' },
  { label: 'Proyectos', href: '#proyectos', id: 'proyectos' },
  { label: 'Experiencia', href: '#experiencia', id: 'experiencia' },
  { label: 'Contacto', href: '#contacto', id: 'contacto' },
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

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
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
        aria-label="Navegación principal"
        className="pointer-events-auto max-w-full overflow-x-auto no-scrollbar rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] menu-transition animate-fade-in anim-delay-200"
      >
        <ul className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeHref === item.href;
            // Staggered item delays starting at 100ms, increasing by 80ms
            const staggerDelayMs = 100 + index * 80;

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
                      ? 'text-[#070709] font-semibold'
                      : 'text-zinc-300 font-medium hover:text-white hover:bg-white/[0.09]'
                  }`}
                >
                  {/* Píldora activa que se desliza entre elementos */}
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_16px_rgba(255,255,255,0.32)]"
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
                        className="relative h-1.5 rounded-full bg-[#070709] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
