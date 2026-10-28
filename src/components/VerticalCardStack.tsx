import React from 'react';

const ALBUM_COVERS = [
  { id: 1, src: '/albums/album1.png', alt: 'Corta Venas - Eslabon Armado' },
  { id: 2, src: '/albums/album2.png', alt: 'Sonidos de Karmática Resonancia - Zoé' },
  { id: 3, src: '/albums/album3.png', alt: 'Los del Limit' },
  { id: 4, src: '/albums/album4.png', alt: 'Lil Uzi Vert vs. The World 2' },
];

export const VerticalCardStack: React.FC = () => {
  // Duplicating the list to provide a seamless infinite downward scroll effect
  const cardsLoop = [...ALBUM_COVERS, ...ALBUM_COVERS, ...ALBUM_COVERS];

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[520px] sm:h-[600px] lg:h-[640px] overflow-hidden flex flex-col items-center justify-center mask-vertical-fade animate-scale-in anim-delay-400">
      {/* Infinite Slow Downward Scrolling Track */}
      <div
        className="w-full flex flex-col items-center gap-6 py-6 animate-scroll-down hover:[animation-play-state:paused]"
        style={{
          willChange: 'transform',
        }}
      >
        {cardsLoop.map((album, idx) => (
          <div
            key={`${album.id}-${idx}`}
            className="group relative w-full aspect-square max-w-[260px] sm:max-w-[290px] lg:max-w-[310px] rounded-[24px] overflow-hidden p-0 cursor-pointer select-none border border-white/20 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)]"
          >
            {/* Solo la imagen del álbum llenando la card */}
            <img
              src={album.src}
              alt={album.alt}
              className="w-full h-full object-cover rounded-[23px] transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Sutil brillo de refracción de cristal superior */}
            <div className="absolute inset-0 rounded-[23px] pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
