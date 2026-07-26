import { IMAGES } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

const GALLERY = [
  { src: IMAGES.serviceWedding, alt: 'Boda elegante', span: 'lg:col-span-2 lg:row-span-2' },
  { src: IMAGES.serviceCorporate, alt: 'Evento corporativo', span: '' },
  { src: IMAGES.serviceQuince, alt: 'Celebración de quince años', span: '' },
  { src: IMAGES.about, alt: 'Instalaciones del salón', span: 'lg:col-span-2' },
  { src: IMAGES.hero, alt: 'Fachada del venue', span: '' },
  { src: IMAGES.serviceWedding, alt: 'Decoración de boda', span: '' },
];

export default function Gallery() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="galeria" className="py-24 lg:py-32 bg-stone-100">
      <div className="container-lux">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}>
          <p className="section-eyebrow justify-center">
            <span className="w-8 h-px bg-gold-500" />
            Galería
            <span className="w-8 h-px bg-gold-500" />
          </p>
          <h2 className="section-title mb-6">
            Momentos que <span className="text-gold-600 italic">permanecen</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Una mirada a las celebraciones que hemos tenido el honor de crear.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {GALLERY.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
              style={{
                opacity: 0,
                transform: 'scale(0.95)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: `${idx * 0.08}s`,
              }}
              ref={(el) => {
                if (!el) return;
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'scale(1)';
                        observer.unobserve(el);
                      }
                    });
                  },
                  { threshold: 0.1 }
                );
                observer.observe(el);
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-wine-900/0 group-hover:bg-wine-900/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium tracking-wide">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
