import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/assets';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-wine-900/95 backdrop-blur-md shadow-lg shadow-wine-900/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#inicio')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <span className="font-serif text-wine-900 font-bold text-lg">LC</span>
          </div>
          <div className="text-left">
            <p className="font-serif text-lg font-medium text-white leading-none tracking-wide">
              La Candelaria
            </p>
            <p className="text-[10px] text-gold-300 tracking-[0.2em] uppercase mt-0.5">
              Casa de Eventos
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm text-stone-200 font-medium tracking-wide hover:text-gold-300 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="flex items-center gap-2 text-stone-200 hover:text-gold-300 transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">{CONTACT.phone}</span>
          </a>
          <button
            onClick={() => handleNav('#reservar')}
            className="btn-primary text-sm py-2.5 px-6"
          >
            Reservar
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-lux py-6 flex flex-col gap-4 bg-wine-900/98 backdrop-blur-md mt-3 rounded-2xl border border-gold-500/20">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left text-stone-200 font-medium py-2 hover:text-gold-300 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#reservar')}
            className="btn-primary text-sm mt-2"
          >
            Reservar Ahora
          </button>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="flex items-center gap-2 text-stone-200 py-2"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">{CONTACT.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
