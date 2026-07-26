import { CheckCircle2, Award, Heart, Users } from 'lucide-react';
import { IMAGES, CONTACT } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

const VALUES = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Atención Personalizada',
    description: 'Cada celebración recibe dedicación exclusiva, desde la primera visita hasta el último brindis.',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Calidad Premium',
    description: 'Instalaciones de alto nivel, proveedores seleccionados y estándares de servicio que nos distinguen.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Experiencia Comprobada',
    description: 'Más de 180 eventos exitosos respaldan nuestro compromiso con la excelencia.',
  },
];

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container-lux relative">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.about}
                alt="Instalaciones de La Candelaria"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-900/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white rounded-2xl shadow-xl p-6 border border-stone-200 max-w-[200px]">
              <p className="font-serif text-5xl font-light text-gold-600 mb-1">{CONTACT.years}+</p>
              <p className="text-sm text-stone-600 leading-snug">
                años creando celebraciones inolvidables
              </p>
            </div>

            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold-500/40 rounded-tl-3xl pointer-events-none" />
          </div>

          {/* Content side */}
          <div>
            <p className="section-eyebrow">
              <span className="w-8 h-px bg-gold-500" />
              Sobre Nosotros
            </p>
            <h2 className="section-title mb-6">
              Un espacio boutique
              <br />
              <span className="text-gold-600 italic">para momentos únicos</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              En La Candelaria Casa de Eventos hemos transformado la manera de celebrar
              en Montería. Nuestro espacio combina la elegancia de un salón climatizado
              con la frescura de jardines integrados, ofreciendo el escenario perfecto
              para bodas, quince años y eventos corporativos.
            </p>

            {/* Values list */}
            <div className="space-y-5 mb-10">
              {VALUES.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-wine-900 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Jardines integrados', 'Salón climatizado', 'Estacionamiento', 'Seguridad 24h'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
