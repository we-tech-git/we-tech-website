// Dados centrais da We Tech Hub
// WhatsApp removido — aguardando número real.
// Testimonials removidos — não havia prova social verificável.

export const WHATSAPP_NUMBER = "";

// Canais reais e confirmados da We Tech Hub
export const INSTAGRAM_URL = "https://www.instagram.com/wetech.h/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/we-tech-hub/?viewAsMember=true";

export function waLink(message) {
  if (!WHATSAPP_NUMBER) return "#contato";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Capacidades reais da We Tech — baseadas nos projetos existentes
export const capabilities = {
  product: [
    "Discovery & Estratégia",
    "UX Research",
    "Product Design",
  ],
  design: [
    "UI Design",
    "Prototipação",
    "Design Systems",
  ],
  engineering: [
    "Front-end & Web Apps",
    "Landing Pages",
    "Integrações",
  ],
};
