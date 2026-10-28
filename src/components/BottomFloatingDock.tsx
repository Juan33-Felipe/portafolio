import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Frameworks', href: '#frameworks' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
];

export const BottomFloatingDock: React.FC = () => {
  const [activeHref, setActiveHref] = useState<string>('#inicio');

  return (
    <div className="fixed bottom-5 sm:bottom-6 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
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
                  onClick={() => setActiveHref(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`menu-transition relative inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-[13px] tracking-tight ${
                    isActive
                      ? 'bg-white text-[#070709] font-semibold shadow-[0_2px_16px_rgba(255,255,255,0.32)]'
                      : 'text-zinc-300 font-medium hover:text-white hover:bg-white/[0.09]'
                  }`}
                >
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#070709] mr-1.5 opacity-80 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
