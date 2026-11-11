import React from 'react';
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Magnetic } from './motion';

const EMAIL = 'juanfelipezambrano2006@gmail.com';
const GITHUB_URL = 'https://github.com/Juan33-Felipe';
const LINKEDIN_URL = 'https://www.linkedin.com/';
const INSTAGRAM_URL = 'https://www.instagram.com/';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Proyectos', href: '#proyectos', id: 'proyectos' },
  { label: 'Contacto', href: '#contacto', id: 'contacto' },
];

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-10 w-full mt-10 sm:mt-14"
    >
      <div className="spotlight relative rounded-3xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
        {/* Parte superior con 3 columnas según la estructura de la imagen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-between">
          {/* Columna Izquierda: Nombre sin ícono JF ni líneas rojas */}
          <div className="flex flex-col items-start justify-center">
            <h3 className="font-display uppercase tracking-[0.04em] text-xl sm:text-2xl lg:text-3xl text-white">
              Juan Felipe Zambrano
            </h3>
          </div>

          {/* Columna Central: Enlaces de navegación rápida */}
          <div className="flex flex-col sm:items-center lg:items-center">
            <div className="flex flex-col items-start">
              <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-3">
                Enlaces
              </span>
              <nav aria-label="Enlaces del pie de página" className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="font-sans text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Columna Derecha: Sígueme con 4 botones circulares adaptados al estilo de la página */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1 lg:items-end">
            <div className="flex flex-col items-start lg:items-start">
              <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-3">
                Sígueme
              </span>
              <div className="flex items-center gap-3">
                {/* 1. GitHub */}
                <Magnetic strength={0.28}>
                  <motion.a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 shadow-sm"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                </Magnetic>

                {/* 2. LinkedIn */}
                <Magnetic strength={0.28}>
                  <motion.a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#0A66C2] hover:bg-white/[0.1] hover:border-[#0A66C2]/40 transition-all duration-300 shadow-sm"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </motion.a>
                </Magnetic>

                {/* 3. Instagram */}
                <Magnetic strength={0.28}>
                  <motion.a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:bg-white/[0.1] hover:border-pink-500/40 transition-all duration-300 shadow-sm"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </motion.a>
                </Magnetic>

                {/* 4. Correo electrónico */}
                <Magnetic strength={0.28}>
                  <motion.a
                    href={`mailto:${EMAIL}`}
                    aria-label="Correo electrónico"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:bg-white/[0.1] hover:border-emerald-400/40 transition-all duration-300 shadow-sm"
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Separador discontinuo / dashed line siguiendo el estilo */}
        <div className="w-full border-t border-dashed border-white/10 my-6 sm:my-8" />

        {/* Texto inferior de copyright */}
        <p className="text-center font-sans text-xs sm:text-sm text-zinc-400 font-medium tracking-tight">
          © 2026 Juan Felipe Zambrano
        </p>
      </div>
    </footer>
  );
};

export default Footer;
