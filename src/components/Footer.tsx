import { Phone, MapPin, Heart } from 'lucide-react';
import { CONTACT } from '@/lib/assets';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Reservar', href: '#reservar' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-wine-900 text-stone-300 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="container-lux">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-serif text-wine-900 font-bold text-lg">LC</span>
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-white leading-none">
                  La Candelaria
                </p>
                <p className="text-[10px] text-gold-300 tracking-[0.2em] uppercase mt-0.5">
                  Casa de Eventos
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Salón de eventos boutique en Montería. Bodas, quince años y eventos
              corporativos con más de 8 años de trayectoria.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-5">
              Navegación
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-stone-400 hover:text-gold-300 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-5">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="flex items-center gap-3 text-sm text-stone-400 hover:text-gold-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-500" />
                {CONTACT.phone}
              </a>
              <div className="flex items-center gap-3 text-sm text-stone-400">
                <MapPin className="w-4 h-4 text-gold-500" />
                {CONTACT.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} La Candelaria Casa de Eventos. Todos los derechos reservados.
          </p>
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            Hecho con <Heart className="w-3 h-3 text-wine-400 fill-wine-400" /> en Montería, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
