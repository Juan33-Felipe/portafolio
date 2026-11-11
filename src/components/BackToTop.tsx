import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

/** Botón flotante para volver arriba con anillo de progreso de scroll. */
export const BackToTop: React.FC = () => {
  const { theme, lang } = useApp();
  const label = translations[lang].backToTop;
  const isLight = theme === 'light';

  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.12));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label={label}
          title={label}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`group fixed right-4 sm:right-6 bottom-5 md:bottom-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-colors cursor-pointer ${
            isLight
              ? 'bg-white/90 border-black/15 shadow-[0_12px_30px_rgba(0,0,0,0.15)] text-zinc-900'
              : 'bg-white/[0.06] border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.6)] text-white'
          }`}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke={isLight ? '#09090b' : 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
