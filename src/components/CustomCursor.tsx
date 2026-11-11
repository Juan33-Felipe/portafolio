import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

/**
 * Cursor personalizado (solo en dispositivos con puntero fino):
 * un punto que sigue al ratón y un anillo con inercia que crece sobre elementos interactivos.
 * También actualiza las variables CSS --mx / --my de las tarjetas `.spotlight` bajo el cursor.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);

    let lastSpot: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));

      // Spotlight: brillo radial que sigue al cursor dentro de las tarjetas
      const spot = target?.closest?.('.spotlight') as HTMLElement | null;
      if (lastSpot && lastSpot !== spot) lastSpot.style.setProperty('--spot-o', '0');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
        spot.style.setProperty('--spot-o', '1');
      }
      lastSpot = spot;
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setHidden(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hidden ? 0 : 1,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: hidden || hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
