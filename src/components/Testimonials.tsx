import { Star, Quote } from 'lucide-react';
import { IMAGES, CONTACT } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María Camila Pérez',
    role: 'Boda · Diciembre 2024',
    avatar: IMAGES.testimonial1,
    quote: 'Superó todas nuestras expectativas. El equipo de La Candelaria hizo que nuestro día fuera mágico, cada detalle estaba perfectamente cuidado. Los jardines son un sueño para la ceremonia.',
    rating: 5,
  },
  {
    name: 'Andrés Felipe Gómez',
    role: 'Evento Corporativo · Octubre 2024',
    avatar: IMAGES.testimonial2,
    quote: 'Organizamos nuestra convención anual y el resultado fue impecable. Espacios profesionales, atención de primera y un servicio que hizo sentir especiales a todos nuestros invitados.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-gradient-lux relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux relative">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}>
          <p className="section-eyebrow justify-center text-gold-400">
            <span className="w-8 h-px bg-gold-500" />
            Testimonios
            <span className="w-8 h-px bg-gold-500" />
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Lo que dicen
            <br />
            <span className="text-gold-400 italic">nuestros clientes</span>
          </h2>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-gold-500/20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm text-gold-200 font-medium">
              {CONTACT.rating} / 5.0 · +{CONTACT.reviews} celebraciones
            </span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={t.name}
              className="relative bg-white/5 backdrop-blur-sm border border-gold-500/15 rounded-3xl p-8 lg:p-10 transition-all duration-300 hover:bg-white/10 hover:border-gold-500/30 hover:-translate-y-1"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: `${idx * 0.15}s`,
              }}
              ref={(el) => {
                if (!el) return;
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        observer.unobserve(el);
                      }
                    });
                  },
                  { threshold: 0.1 }
                );
                observer.observe(el);
              }}
            >
              <Quote className="w-10 h-10 text-gold-500/40 mb-5" />

              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>

              <p className="text-stone-200 text-lg leading-relaxed mb-8 font-serif italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold-500/30"
                />
                <div>
                  <p className="text-white font-medium text-base">{t.name}</p>
                  <p className="text-gold-300 text-sm">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
