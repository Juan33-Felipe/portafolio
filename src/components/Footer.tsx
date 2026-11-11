import React from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Magnetic } from './motion';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

const EMAIL = 'juanfelipezambrano2006@gmail.com';
const GITHUB_URL = 'https://github.com/Juan33-Felipe';
const LINKEDIN_URL = 'https://www.linkedin.com/';

export const Footer: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang];
  const isLight = theme === 'light';

  const navLinks = [
    { label: t.nav.inicio, href: '#inicio', id: 'inicio' },
    { label: t.nav.proyectos, href: '#proyectos', id: 'proyectos' },
    { label: t.nav.contacto, href: '#contacto', id: 'contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialBtnClass = `w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer ${
    isLight
      ? 'bg-black/[0.04] border-black/10 text-zinc-700 hover:text-black hover:bg-black/10 hover:border-black/25'
      : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.1] hover:border-white/30'
  }`;

  return (
    <footer
      role="contentinfo"
      className="relative z-10 w-full mt-10 sm:mt-14"
    >
      <div className={`spotlight relative rounded-3xl backdrop-blur-md border p-6 sm:p-10 lg:p-12 transition-colors duration-300 ${
        isLight
          ? 'bg-white/85 border-black/10 shadow-[0_22px_48px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]'
          : 'bg-zinc-900/60 border-white/10 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]'
      }`}>
        {/* Parte superior con 3 columnas según la estructura */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-between">
          {/* Columna Izquierda: Nombre */}
          <div className="flex flex-col items-start justify-center">
            <h3 className={`font-display uppercase tracking-[0.04em] text-xl sm:text-2xl lg:text-3xl ${
              isLight ? 'text-zinc-950' : 'text-white'
            }`}>
              Juan Felipe Zambrano
            </h3>
          </div>

          {/* Columna Central: Enlaces de navegación rápida */}
          <div className="flex flex-col sm:items-center lg:items-center">
            <div className="flex flex-col items-start">
              <span className={`block font-sans text-xs font-semibold uppercase tracking-[0.16em] mb-3 ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}>
                {t.footer.quickLinks}
              </span>
              <nav aria-label={lang === 'es' ? 'Enlaces del pie de página' : 'Footer links'} className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`font-sans text-sm transition-colors duration-200 cursor-pointer ${
                      isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Columna Derecha: Sígueme */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1 lg:items-end">
            <div className="flex flex-col items-start lg:items-start">
              <span className={`block font-sans text-xs font-semibold uppercase tracking-[0.16em] mb-3 ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}>
                {t.footer.followMe}
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
                    className={socialBtnClass}
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
                    className={socialBtnClass}
                  >
                    <FaLinkedinIn className="w-4 h-4 text-[#0A66C2]" />
                  </motion.a>
                </Magnetic>

                {/* 3. Correo electrónico */}
                <Magnetic strength={0.28}>
                  <motion.a
                    href={`mailto:${EMAIL}`}
                    aria-label={lang === 'es' ? 'Correo electrónico' : 'Email'}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={socialBtnClass}
                  >
                    <FaEnvelope className="w-4 h-4 text-emerald-500" />
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Separador discontinuo */}
        <div className={`w-full border-t border-dashed my-6 sm:my-8 ${isLight ? 'border-black/10' : 'border-white/10'}`} />

        {/* Texto inferior de copyright */}
        <p className={`text-center font-sans text-xs sm:text-sm font-medium tracking-tight ${
          isLight ? 'text-zinc-500' : 'text-zinc-400'
        }`}>
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
