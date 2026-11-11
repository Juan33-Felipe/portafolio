import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

/** Curva "expo-out" usada en todo el sitio para un movimiento editorial y suave. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Duración (segundos) de la pantalla de carga inicial. */
export const INTRO_DURATION = 1.65;

const VIEWPORT = { once: true, amount: 0.2 } as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  as?: 'div' | 'article' | 'li' | 'span' | 'form';
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

/** Aparición al entrar en el viewport (fade + desplazamiento + desenfoque opcional). */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  distance = 32,
  blur = false,
  as = 'div',
  onSubmit,
}) => {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      onSubmit={onSubmit as unknown as React.FormEventHandler<HTMLDivElement>}
      initial={{ opacity: 0, ...offsetFor(direction, distance), ...(blur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
};

const staggerContainer = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ol' | 'ul';
}

/** Contenedor que escalona la entrada de sus hijos `StaggerItem`. */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}) => {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
};

interface StaggerItemProps extends React.ComponentProps<typeof motion.div> {
  as?: 'div' | 'li' | 'span' | 'article' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ as = 'div', variants, ...rest }) => {
  const Component = motion[as] as typeof motion.div;
  return <Component variants={variants ?? staggerItem} {...rest} />;
};

interface SectionHeadingProps {
  id: string;
  children: string;
  className?: string;
  barClassName?: string;
}

/** Título de sección: las letras suben desde una máscara y la barra se dibuja de izquierda a derecha. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ id, children, className = '', barClassName = '' }) => (
  <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
    <h2
      id={id}
      aria-label={children}
      className={`font-display font-normal uppercase tracking-[0.02em] text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.05] text-white ${className}`}
    >
      <span className="inline-flex overflow-hidden pb-[0.08em]" aria-hidden="true">
        {Array.from(children).map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.8, delay: i * 0.035, ease: EASE_OUT } },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </h2>
    <motion.div
      aria-hidden="true"
      className={`h-1 w-16 bg-white rounded-full mt-2 origin-left ${barClassName}`}
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.9, delay: 0.25, ease: EASE_OUT } },
      }}
    />
  </motion.div>
);

/** Barra fina de progreso de lectura fijada en la parte superior. */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-white/40 via-white to-white/40 shadow-[0_0_12px_rgba(255,255,255,0.6)] pointer-events-none"
      style={{ scaleX }}
    />
  );
};

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Envuelve un elemento para que sea atraído magnéticamente hacia el cursor al acercarse. */
export const Magnetic: React.FC<MagneticProps> = ({ children, className, strength = 0.32 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
};

interface TiltCardProps extends React.ComponentProps<typeof motion.article> {
  children: React.ReactNode;
  maxTilt?: number;
}

/** Tarjeta con inclinación 3D reactiva al puntero y reflejo de luz ("spotlight"). */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', maxTilt = 7, ...rest }) => {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 260, damping: 22 });

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`spotlight ${className}`}
      {...rest}
    >
      {children}
    </motion.article>
  );
};

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*';

/** Texto que se descifra con caracteres aleatorios al pasar el cursor. */
export const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);

  const trigger = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    let iteration = 0;
    const step = () => {
      setDisplay(
        text
          .split('')
          .map((ch, idx) => {
            if (ch === ' ' || ch === '®') return ch;
            if (idx < iteration) return text[idx];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      iteration += 0.45;
      if (iteration <= text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };
    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <span onPointerEnter={trigger} className={className}>
      {display}
    </span>
  );
};

/** Rotador de frases con transición vertical tipo "slot" editorial. */
export const RotatingWords: React.FC<{ words: readonly string[]; intervalMs?: number; className?: string }> = ({
  words,
  intervalMs = 2800,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** Contador numérico animado desde 0 hasta `value` cuando entra en pantalla. */
export const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = '',
  duration = 1.6,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/** Marquesina infinita horizontal que invierte o ralentiza al pasar el cursor. */
export const InfiniteMarquee: React.FC<{ items: readonly string[]; speedSeconds?: number }> = ({
  items,
  speedSeconds = 26,
}) => (
  <div className="relative w-full overflow-hidden py-3 mask-horizontal-fade select-none">
    <div
      className="flex w-max items-center gap-8 animate-marquee hover:[animation-play-state:paused]"
      style={{ animationDuration: `${speedSeconds}s` }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-3 font-display uppercase tracking-[0.14em] text-xs sm:text-sm text-zinc-400/80 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

