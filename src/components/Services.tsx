import { Heart, Building2, Sparkles, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
  span: string;
};

const SERVICES: Service[] = [
  {
    id: 'bodas',
    title: 'Bodas y Gala',
    description: 'Ceremonias al aire libre en nuestros jardines integrados, seguidas de recepciones elegantes en salón climatizado.',
    image: IMAGES.serviceWedding,
    icon: <Heart className="w-5 h-5" />,
    features: ['Ceremonia en jardines', 'Salón climatizado', 'Decoración personalizada'],
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'corporativo',
    title: 'Eventos Corporativos',
    description: 'Espacios profesionales para lanzamientos, conferencias y celebraciones empresariales.',
    image: IMAGES.serviceCorporate,
    icon: <Building2 className="w-5 h-5" />,
    features: ['Capacidad flexible', 'Audio y proyección', 'Coffee breaks'],
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'quince',
    title: 'Quince Años y Sociales',
    description: 'Celebraciones memorables con ambiente boutique y atención personalizada.',
    image: IMAGES.serviceQuince,
    icon: <Sparkles className="w-5 h-5" />,
    features: ['Ambiente temático', 'Iluminación profesional', 'Coreografía y DJ'],
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollToReservar = () => {
    document.querySelector('#reservar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-stone-50 relative">
      <div className="container-lux">
        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} max-w-2xl mb-16`}>
          <p className="section-eyebrow">
            <span className="w-8 h-px bg-gold-500" />
            Nuestros Servicios
          </p>
          <h2 className="section-title mb-6">
            Celebraciones diseñadas
            <br />
            <span className="text-gold-600 italic">a tu medida</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Cada evento es único. Combinamos espacios versátiles, atención personalizada
            y años de experiencia para crear celebraciones que trascienden.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {SERVICES.map((service, idx) => (
            <article
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${service.span}`}
              onClick={scrollToReservar}
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
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-wine-900/90 via-wine-900/30 to-transparent transition-opacity duration-300 group-hover:from-wine-900/95" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gold-500/90 flex items-center justify-center text-wine-900">
                    {service.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gold-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-stone-200 text-sm leading-relaxed mb-4 max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500">
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 delay-75">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-gold-200 px-3 py-1 rounded-full glass-dark border border-gold-500/20"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-stone-200">
          {[
            { value: '+180', label: 'Celebraciones' },
            { value: '8+', label: 'Años de trayectoria' },
            { value: '4.9', label: 'Calificación Google' },
            { value: '100%', label: 'Eventos personalizados' },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: 0,
                animation: `fadeUp 0.6s ease-out ${idx * 0.1}s forwards`,
              }}
            >
              <p className="font-serif text-4xl lg:text-5xl font-light text-gold-600 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
