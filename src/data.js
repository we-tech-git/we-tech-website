// Dados centrais da We Tech Hub
// WhatsApp removido — aguardando número real.
// Testimonials removidos — não havia prova social verificável.

export const WHATSAPP_NUMBER = "";

// Canal principal de contato (CTA do site)
export const CONTACT_EMAIL = "contact@wetechhub.com.br";

export function mailtoLink(subject, body) {
  const params = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT_EMAIL}?${params}`;
}

// Canais reais e confirmados da We Tech Hub
export const INSTAGRAM_URL = "https://www.instagram.com/wetech.h/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/we-tech-hub/?viewAsMember=true";

export function waLink(message) {
  if (!WHATSAPP_NUMBER) return "#contato";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
