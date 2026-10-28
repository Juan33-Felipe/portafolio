import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const TopHeaderBar: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

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

  return (
    <header
      role="banner"
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 lg:px-12 py-4 sm:py-5 pointer-events-none animate-fade-in anim-delay-0"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs tracking-[0.14em] uppercase font-sans font-medium text-zinc-200">
        {/* Top-Left */}
        <a
          href="#inicio"
          className="pointer-events-auto font-display text-base sm:text-lg tracking-[0.12em] leading-none text-white hover:text-zinc-300 menu-transition flex items-center gap-1.5 shrink-0"
        >
          <span>JFZP®</span>
        </a>

        {/* Top-Center */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 min-w-0">
          <a
            href="https://github.com/Juan33-Felipe"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white menu-transition text-[10px] sm:text-[11px] font-medium tracking-[0.12em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shrink-0"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white menu-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Top-Right */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 font-sans font-medium text-[11px] sm:text-xs tracking-[0.12em] text-zinc-300 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shrink-0">
          <span>PASTO, CO · {timeString || '08:25'}</span>
        </div>
      </div>

      {/* Mobile / Tablet Clock Sub-row */}
      <div className="md:hidden mt-2 flex justify-end font-sans font-medium text-[10px] tracking-[0.12em] text-zinc-300">
        <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10">
          PASTO, CO · {timeString || '08:25'}
        </span>
      </div>
    </header>
  );
};
