import React, { useState } from 'react';
import { SiGithub, SiWhatsapp, SiGmail } from 'react-icons/si';
import { ArrowUpRight, Send, CheckCircle2, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, Magnetic, Reveal, SectionHeading, Stagger, StaggerItem } from './motion';
import { Footer } from './Footer';

const EMAIL = 'juanfelipezambrano2006@gmail.com';
const WHATSAPP_NUMBER = '573014597549';
const WHATSAPP_DISPLAY = '+57 301 4597549';
const GITHUB_URL = 'https://github.com/Juan33-Felipe';

interface ContactLink {
  label: string;
  value?: string;
  href: string;
  download?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  hover: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Descargar CV',
    value: 'Currículum Vitae (PDF)',
    href: '/CV_Juan_Felipe_Zambrano.pdf',
    download: 'CV_Juan_Felipe_Zambrano.pdf',
    Icon: Download,
    color: '#60A5FA',
    hover: 'hover:border-blue-400/50 hover:shadow-[0_0_18px_rgba(96,165,250,0.25)]',
  },
  {
    label: 'GitHub',
    href: GITHUB_URL,
    Icon: SiGithub,
    color: '#FFFFFF',
    hover: 'hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]',
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Juan Felipe! Vi tu portafolio y me gustaría hablar contigo.')}`,
    Icon: SiWhatsapp,
    color: '#25D366',
    hover: 'hover:border-[#25D366]/50 hover:shadow-[0_0_18px_rgba(37,211,102,0.25)]',
  },
  {
    label: 'Correo',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: SiGmail,
    color: '#EA4335',
    hover: 'hover:border-[#EA4335]/50 hover:shadow-[0_0_18px_rgba(234,67,53,0.25)]',
  },
];

const inputClass =
  'w-full rounded-xl bg-zinc-800/60 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-white/40 focus:bg-zinc-800/90';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Contacto desde el portafolio — ${form.name}`;
    const body = `Nombre: ${form.name}\nCorreo: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="relative w-full py-14 sm:py-24 px-4 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20"
    >
      <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col">
        <SectionHeading id="contact-heading" barClassName="mb-10">
          Contáctame
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Botones de contacto */}
          <Stagger className="lg:col-span-5 flex flex-col gap-4" stagger={0.1}>
            <StaggerItem as="div">
              <p className="font-sans text-sm sm:text-base leading-[1.75] text-zinc-300 mb-2">
                ¿Tienes un proyecto, una propuesta o simplemente quieres saludar? Escríbeme por cualquiera de estos
                medios y te responderé lo antes posible.
              </p>
            </StaggerItem>
            {CONTACT_LINKS.map(({ label, value, href, download, Icon, color, hover }) => (
              <StaggerItem
                as="a"
                key={label}
                href={href}
                download={download}
                target={download ? '_blank' : href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`spotlight group flex items-center gap-4 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 p-4 sm:p-5 transition-[background-color,border-color,box-shadow] duration-300 hover:bg-zinc-900/80 ${hover}`}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 shrink-0">
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span className="font-sans text-sm sm:text-[15px] font-medium text-white truncate">
                    {label}
                  </span>
                  {value && (
                    <span className="font-sans text-xs text-zinc-400 truncate">
                      {value}
                    </span>
                  )}
                </span>
                {download ? (
                  <Download className="w-5 h-5 text-zinc-500 shrink-0 transition-all duration-300 group-hover:text-white group-hover:translate-y-0.5" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 shrink-0 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </StaggerItem>
            ))}
          </Stagger>

          {/* Formulario */}
          <Reveal
            as="form"
            direction="left"
            distance={40}
            delay={0.15}
            onSubmit={handleSubmit}
            className="spotlight lg:col-span-7 flex flex-col gap-4 bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]"
          >
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Déjame un mensaje
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-xs font-medium text-zinc-300">Nombre</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-xs font-medium text-zinc-300">Correo</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tucorreo@ejemplo.com"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-medium text-zinc-300">Mensaje</span>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntame en qué puedo ayudarte..."
                className={`${inputClass} resize-none`}
              />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="inline-flex items-center gap-2 font-sans text-xs text-emerald-400"
                  >
                    <motion.span
                      className="inline-flex"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.span>{' '}
                    Se abrió tu aplicación de correo para enviar el mensaje.
                  </motion.span>
                ) : (
                  <span key="idle" />
                )}
              </AnimatePresence>
              <Magnetic strength={0.28} className="w-full sm:w-auto">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#070709] px-6 py-2.5 font-sans text-sm font-semibold shadow-[0_2px_16px_rgba(255,255,255,0.25)] transition-[background-color,box-shadow] duration-200 hover:bg-zinc-200 hover:shadow-[0_2px_22px_rgba(255,255,255,0.4)]"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12" /> Enviar mensaje
                </motion.button>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Footer integrado y alineado con el ancho completo de la sección */}
        <Footer />
      </div>
    </section>
  );
};
