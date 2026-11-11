import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, INTRO_DURATION } from './motion';

const LOGO = 'JFZP®';

/** Pantalla de entrada: el logo se revela letra a letra, una barra se llena y la cortina sube. */
export const IntroLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(false), INTRO_DURATION * 1000);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070709]"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="flex overflow-hidden font-display text-5xl sm:text-7xl tracking-[0.12em] text-white"
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {Array.from(LOGO).map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: EASE_OUT }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <div className="mt-6 h-px w-40 sm:w-56 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full w-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTRO_DURATION - 0.3, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <motion.span
            className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Portafolio · Pasto, CO
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
