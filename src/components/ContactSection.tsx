import React, { useState } from 'react';
import { SiGithub, SiWhatsapp, SiGmail } from 'react-icons/si';
import { ArrowUpRight, Send, CheckCircle2, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, Magnetic, Reveal, SectionHeading, Stagger, StaggerItem } from './motion';
import { Footer } from './Footer';
import { useApp } from '../context/AppContext';
import { translations } from '../context/translations';

const EMAIL = 'juanfelipezambrano2006@gmail.com';
const WHATSAPP_NUMBER = '573014597549';
const GITHUB_URL = 'https://github.com/Juan33-Felipe';

interface ContactLink {
  key: string;
  label: string;
  value?: string;
  href: string;
  download?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  hover: string;
}

export const ContactSection: React.FC = () => {
  const { theme, lang } = useApp();
  const t = translations[lang].contact;
  const isLight = theme === 'light';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const contactLinks: ContactLink[] = [
    {
      key: 'cv',
      label: t.downloadCv,
      value: t.cvSubtitle,
      href: '/CV_Juan_Felipe_Zambrano.pdf',
      download: 'CV_Juan_Felipe_Zambrano.pdf',
      Icon: Download,
      color: '#3b82f6',
      hover: 'hover:border-blue-400/50 hover:shadow-[0_0_18px_rgba(59,130,246,0.25)]',
    },
    {
      key: 'github',
      label: 'GitHub',
      href: GITHUB_URL,
      Icon: SiGithub,
      color: isLight ? '#09090b' : '#FFFFFF',
      hover: isLight
        ? 'hover:border-black/40 hover:shadow-[0_0_18px_rgba(0,0,0,0.12)]'
        : 'hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        lang === 'es'
          ? '¡Hola Juan Felipe! Vi tu portafolio y me gustaría hablar contigo.'
          : 'Hi Juan Felipe! I saw your portfolio and would like to connect.'
      )}`,
      Icon: SiWhatsapp,
      color: '#25D366',
      hover: 'hover:border-[#25D366]/50 hover:shadow-[0_0_18px_rgba(37,211,102,0.25)]',
    },
    {
      key: 'email',
      label: lang === 'es' ? 'Correo' : 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      Icon: SiGmail,
      color: '#EA4335',
      hover: 'hover:border-[#EA4335]/50 hover:shadow-[0_0_18px_rgba(234,67,53,0.25)]',
    },
  ];

  const inputClass = `w-full rounded-xl border px-4 py-3 font-sans text-sm outline-none transition-colors ${
    isLight
      ? 'bg-white/80 border-black/10 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white shadow-sm'
      : 'bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-800/90'
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${t.emailSubject}${form.name}`;
    const body = `${t.nameLabel}: ${form.name}\n${t.emailLabel}: ${form.email}\n\n${form.message}`;
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
          {t.title}
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Botones de contacto */}
          <Stagger className="lg:col-span-5 flex flex-col gap-4" stagger={0.1}>
            <StaggerItem as="div">
              <p className={`font-sans text-sm sm:text-base leading-[1.75] mb-2 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                {t.prompt}
              </p>
            </StaggerItem>
            {contactLinks.map(({ key, label, value, href, download, Icon, color, hover }) => (
              <StaggerItem
                as="a"
                key={key}
                href={href}
                download={download}
                target={download ? '_blank' : href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`spotlight group flex items-center gap-4 rounded-2xl backdrop-blur-md border p-4 sm:p-5 transition-[background-color,border-color,box-shadow] duration-300 cursor-pointer ${hover} ${
                  isLight
                    ? 'bg-white/80 border-black/10 hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                    : 'bg-zinc-900/60 border-white/10 hover:bg-zinc-900/80 shadow-md'
                }`}
              >
                <span className={`flex items-center justify-center w-12 h-12 rounded-xl border shrink-0 ${
                  isLight ? 'bg-black/[0.04] border-black/10' : 'bg-white/[0.05] border-white/10'
                }`}>
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span className={`font-sans text-sm sm:text-[15px] font-medium truncate ${
                    isLight ? 'text-zinc-950' : 'text-white'
                  }`}>
                    {label}
                  </span>
                  {value && (
                    <span className={`font-sans text-xs truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {value}
                    </span>
                  )}
                </span>
                {download ? (
                  <Download className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:translate-y-0.5 ${
                    isLight ? 'text-zinc-400 group-hover:text-black' : 'text-zinc-500 group-hover:text-white'
                  }`} />
                ) : (
                  <ArrowUpRight className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isLight ? 'text-zinc-400 group-hover:text-black' : 'text-zinc-500 group-hover:text-white'
                  }`} />
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
            className={`spotlight lg:col-span-7 flex flex-col gap-4 backdrop-blur-md border rounded-3xl p-5 sm:p-8 transition-colors duration-300 ${
              isLight
                ? 'bg-white/85 border-black/10 shadow-[0_22px_48px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]'
                : 'bg-zinc-900/60 border-white/10 shadow-[0_22px_48px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]'
            }`}
          >
            <span className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
              isLight ? 'text-zinc-500' : 'text-zinc-400'
            }`}>
              {t.formTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className={`font-sans text-xs font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  {t.nameLabel}
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={`font-sans text-xs font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  {t.emailLabel}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className={`font-sans text-xs font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                {t.messageLabel}
              </span>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
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
                    className="inline-flex items-center gap-2 font-sans text-xs text-emerald-500"
                  >
                    <motion.span
                      className="inline-flex"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.span>{' '}
                    {t.successMessage}
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
                  className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-sans text-sm font-semibold transition-[background-color,box-shadow] duration-200 cursor-pointer ${
                    isLight
                      ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_2px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_22px_rgba(0,0,0,0.35)]'
                      : 'bg-white text-[#070709] hover:bg-zinc-200 shadow-[0_2px_16px_rgba(255,255,255,0.25)] hover:shadow-[0_2px_22px_rgba(255,255,255,0.4)]'
                  }`}
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12" />{' '}
                  {t.sendMessage}
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
