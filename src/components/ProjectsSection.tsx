import React from 'react';
import CardSwap from './CardSwap';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="relative z-20 isolate w-full py-16 sm:py-24"
      style={{ zIndex: 20 }}
    >
      <div className="relative z-20 w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mb-8 flex flex-col items-start">
        <h2
          id="projects-heading"
          className="font-display font-normal uppercase tracking-[0.02em] text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.05] text-white"
        >
          Proyectos
        </h2>
        <div className="h-1 w-16 bg-white rounded-full mt-2" aria-hidden="true" />
      </div>

      <div
        className="relative z-20 isolate w-full h-[600px] mb-10 sm:mb-14"
        style={{ zIndex: 20 }}
      >
        <CardSwap delay={4000} />
      </div>
    </section>
  );
};
