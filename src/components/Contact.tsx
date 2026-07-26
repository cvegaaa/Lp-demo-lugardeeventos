import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const contactItems = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ubicación',
      value: CONTACT.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.location)}`,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Teléfono / WhatsApp',
      value: CONTACT.phone,
      href: `tel:${CONTACT.phoneRaw}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Correo',
      value: 'reservas@lacandelariaeventos.com',
      href: 'mailto:reservas@lacandelariaeventos.com',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Horario',
      value: 'Lun a Sáb · 9:00 AM – 7:00 PM',
      href: null,
    },
  ];

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="container-lux">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center max-w-2xl mx-auto mb-16`}>
          <p className="section-eyebrow justify-center">
            <span className="w-8 h-px bg-gold-500" />
            Contacto
            <span className="w-8 h-px bg-gold-500" />
          </p>
          <h2 className="section-title mb-6">
            Estamos para
            <br />
            <span className="text-gold-600 italic">ayudarte</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Escríbenos o visítanos. Nuestro equipo está listo para responder todas
            tus preguntas y ayudarte a planificar el evento perfecto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact info cards */}
          <div className="space-y-4">
            {contactItems.map((item, idx) => (
              <div
                key={item.label}
                className="flex items-center gap-5 p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-gold-400 hover:shadow-md transition-all duration-300"
                style={{
                  opacity: 0,
                  animation: `fadeUp 0.5s ease-out ${idx * 0.1}s forwards`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-wine-900 font-medium hover:text-gold-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-wine-900 font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-success-500 text-white font-medium hover:bg-success-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-success-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos directamente por WhatsApp
            </a>
          </div>

          {/* Map embed */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 min-h-[400px]">
            <iframe
              title="Ubicación de La Candelaria Casa de Eventos"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.location)}&output=embed`}
              className="w-full h-full min-h-[400px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
