import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/assets';

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-success-500 text-white flex items-center justify-center shadow-lg shadow-success-500/40 hover:bg-success-600 hover:scale-110 transition-all duration-300 group"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-wine-900 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ¿Conversamos?
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-success-500 animate-ping opacity-20" />
    </a>
  );
}
