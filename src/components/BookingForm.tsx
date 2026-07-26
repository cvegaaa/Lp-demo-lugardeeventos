import { useState, type FormEvent } from 'react';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  AlertCircle,
  PartyPopper,
} from 'lucide-react';
import { supabase, type ReservationInput } from '@/lib/supabase';
import { EVENT_TYPES, CONTACT } from '@/lib/assets';
import { useReveal } from '@/hooks/useReveal';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function BookingForm() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [form, setForm] = useState<ReservationInput>({
    name: '',
    email: '',
    phone: '',
    event_type: EVENT_TYPES[0],
    event_date: '',
    guests: 50,
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('reservations').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        event_type: form.event_type,
        event_date: form.event_date,
        guests: form.guests,
        message: form.message || null,
      });

      if (error) throw error;

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Ocurrió un error al enviar la solicitud.');
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      event_type: EVENT_TYPES[0],
      event_date: '',
      guests: 50,
      message: '',
    });
    setStatus('idle');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservar" className="py-24 lg:py-32 bg-stone-50 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wine-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container-lux relative">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} grid lg:grid-cols-5 gap-12 lg:gap-16 items-start`}>
          {/* Left: info */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <p className="section-eyebrow">
              <span className="w-8 h-px bg-gold-500" />
              Reservaciones
            </p>
            <h2 className="section-title mb-6">
              Solicita tu
              <br />
              <span className="text-gold-600 italic">fecha disponible</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Completa el formulario y nuestro equipo te contactará dentro de las
              próximas 24 horas para confirmar disponibilidad y coordinar cada detalle
              de tu celebración.
            </p>

            {/* Quick contact */}
            <div className="space-y-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-gold-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-full bg-success-500/10 flex items-center justify-center text-success-600 group-hover:bg-success-500 group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">WhatsApp</p>
                  <p className="text-wine-900 font-medium">{CONTACT.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200">
                <div className="w-11 h-11 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Disponibilidad</p>
                  <p className="text-wine-900 font-medium">Consulta sin compromiso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form / success */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 lg:p-12 text-center animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-success-500/10 flex items-center justify-center mx-auto mb-6">
                  <PartyPopper className="w-10 h-10 text-success-600" />
                </div>
                <h3 className="font-serif text-3xl font-medium text-wine-900 mb-3">
                  ¡Solicitud enviada!
                </h3>
                <p className="text-stone-600 text-lg leading-relaxed mb-2">
                  Gracias, <span className="font-medium text-wine-900">{form.name || 'amig@'}</span>.
                  Hemos recibido tu solicitud de reserva.
                </p>
                <p className="text-stone-500 mb-8">
                  Te contactaremos dentro de las próximas 24 horas para confirmar disponibilidad.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={resetForm} className="btn-primary">
                    Enviar otra solicitud
                  </button>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 lg:p-10"
              >
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-error-500/10 border border-error-500/20 text-error-600 animate-fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">No se pudo enviar la solicitud</p>
                      <p className="text-xs mt-0.5">{errorMsg}</p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="input-lux pl-11"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        className="input-lux pl-11"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Correo electrónico *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tucorreo@ejemplo.com"
                        className="input-lux pl-11"
                      />
                    </div>
                  </div>

                  {/* Event type */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Tipo de evento *
                    </label>
                    <div className="relative">
                      <PartyPopper className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <select
                        name="event_type"
                        required
                        value={form.event_type}
                        onChange={handleChange}
                        className="input-lux pl-11 appearance-none cursor-pointer"
                      >
                        {EVENT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Event date */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Fecha del evento *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="date"
                        name="event_date"
                        required
                        min={today}
                        value={form.event_date}
                        onChange={handleChange}
                        className="input-lux pl-11"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Número de invitados: <span className="text-gold-600 font-semibold">{form.guests}</span>
                    </label>
                    <div className="relative flex items-center gap-3">
                      <Users className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      <input
                        type="range"
                        name="guests"
                        min="20"
                        max="300"
                        step="5"
                        value={form.guests}
                        onChange={handleChange}
                        className="flex-1 accent-gold-500 cursor-pointer"
                      />
                      <span className="text-sm text-stone-500 w-24 text-right">
                        {form.guests} personas
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Mensaje (opcional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                      <textarea
                        name="message"
                        rows={4}
                        value={form.message ?? ''}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre tu evento, preferencias o preguntas especiales..."
                        className="input-lux pl-11 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Solicitar Reserva
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-stone-400 mt-4">
                  Al enviar aceptas ser contactado por nuestro equipo. Sin compromiso.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
