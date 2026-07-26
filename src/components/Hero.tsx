import { Star, MapPin, Calendar, ArrowDown } from 'lucide-react';
import { IMAGES, CONTACT } from '@/lib/assets';

export default function Hero() {
  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservar = () => {
    document.querySelector('#reservar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="La Candelaria Casa de Eventos"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-900/70 via-wine-900/50 to-wine-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-900/60 to-transparent" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10" />

      {/* Content */}
      <div className="container-lux relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-dark border border-gold-500/30 mb-8 animate-fade-in">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm text-gold-200 font-medium">
              {CONTACT.rating} en Google · +{CONTACT.reviews} celebraciones
            </span>
          </div>

          {/* Eyebrow */}
          <p className="text-gold-300 font-sans text-sm font-semibold uppercase tracking-[0.3em] mb-5 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Montería, Córdoba · Colombia
          </p>

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 animate-fade-up text-balance"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Donde los momentos
            <br />
            <span className="shimmer-text font-medium italic">inolvidables</span> cobran vida
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg text-stone-200 leading-relaxed max-w-2xl mb-10 animate-fade-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Salón de eventos boutique con jardines integrados y salón climatizado.
            Bodas, quince años y eventos corporativos con más de 8 años de trayectoria
            creando celebraciones extraordinarias.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <button onClick={scrollToReservar} className="btn-primary">
              <Calendar className="w-5 h-5" />
              Reservar Fecha
            </button>
            <button onClick={scrollToServices} className="btn-outline">
              Ver Servicios
            </button>
          </div>

          {/* Location pin */}
          <div className="flex items-center gap-2 mt-10 text-stone-300 animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-sm">{CONTACT.location}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold-300 hover:text-gold-200 transition-colors animate-float"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Descubre más</span>
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
