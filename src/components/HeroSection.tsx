import React, { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import ReflectiveCard from './ReflectiveCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_OUT, INTRO_DURATION, RotatingWords } from './motion';

const NAME_LINES = ['JUAN', 'FELIPE', 'ZAMBRANO'] as const;
const ROLES = [
  'Arquitecto de Soluciones',
  'Ingeniería de Software',
  'Interfaces & Sistemas',
  'Clean Architecture',
] as const;

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -24 : -70]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 16 : 50]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] w-full flex items-center justify-center px-4 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-20"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-14 lg:gap-16 xl:gap-20">
        {/* LEFT COLUMN: Main Heading & Profile */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 flex flex-col items-start justify-center text-left w-full lg:max-w-xl"
        >
          {/* Prominent Display Heading — PODIUM Sharp 4.11 */}
          <motion.h1
            aria-label="Juan Felipe Zambrano"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: INTRO_DURATION + 0.15 } },
            }}
            className="font-display font-normal uppercase tracking-[0.02em] leading-[0.94] text-[2.35rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] text-white select-none break-words drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            {NAME_LINES.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: '105%', rotate: 4, opacity: 0 },
                    show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE_OUT } },
                  }}
                  style={{ transformOrigin: '0% 100%' }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle — Inter con rotador de especialidades */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: INTRO_DURATION + 0.55, ease: EASE_OUT }}
            className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-[1.2rem] font-sans font-semibold leading-relaxed max-w-xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            <span>Desarrollador de Software</span>{' '}
            <span className="text-zinc-300 font-normal">&amp;</span>{' '}
            <RotatingWords words={ROLES} className="text-zinc-200 font-medium" />
          </motion.p>

          {/* Botones de acción: Descargar CV y Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: INTRO_DURATION + 0.75, ease: EASE_OUT }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/CV_Juan_Felipe_Zambrano.pdf"
              download="CV_Juan_Felipe_Zambrano.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-zinc-950 font-sans text-xs sm:text-sm font-semibold tracking-wide hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] active:scale-95"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Descargar CV</span>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/25 font-sans text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
            >
              <span>Contáctame</span>
            </a>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.a
            href="#sobre-mi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: INTRO_DURATION + 1.0 }}
            className="group mt-8 hidden sm:inline-flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors"
          >
            <span className="relative block w-[1px] h-10 bg-white/15 overflow-hidden" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 w-full h-1/2 bg-white"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            Desliza para explorar
          </motion.a>
        </motion.div>

        {/* RIGHT COLUMN: Reflective Card */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: INTRO_DURATION + 0.3, ease: EASE_OUT }}
          className="flex items-center justify-center shrink-0 w-full lg:w-auto"
        >
          <ReflectiveCard
            name="Juan Felipe Zambrano"
            role="Ingeniero de Software"
            imageSrc="/profile-card.png"
            idLabel=""
            idValue="Estudiante de Ingeniería de Software enfocado en el diseño y construcción de aplicaciones modernas, interfaces fluidas y arquitecturas escalables mediante el uso de frameworks de alto rendimiento y patrones de diseño sólidos."
            videoSrc="/videos/reflection.mp4"
            webcam={false}
            tint="#ffffff"
            metalness={0.85}
            roughness={0.18}
            blurStrength={18}
            shine={1.2}
            glare={0.55}
            width={isMobile ? '100%' : 380}
            height={isMobile ? 590 : 680}
            className="max-w-[380px]"
          />
        </motion.div>
      </div>
    </section>
  );
};
