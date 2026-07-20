export const WHATSAPP_NUMBER = "5511999999999";

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const tech = [
  {
    t: "Desenvolvimento",
    d: "Loja, checkout e integrações sob medida em stack própria.",
  },
  {
    t: "Manutenção",
    d: "Time de plantão para o que não pode cair no pico de venda.",
  },
  {
    t: "Auditoria técnica",
    d: "Performance, Core Web Vitals e segurança do front ao back.",
  },
  {
    t: "Integrações",
    d: "ERP, pagamento, logística e BI falando a mesma língua.",
  },
];

export const perf = [
  {
    t: "CRO",
    d: "Otimização de conversão baseada em dado, não em achismo.",
  },
  {
    t: "Funil",
    d: "Redesenho de jornada do anúncio ao pós-compra.",
  },
  {
    t: "Testes A/B",
    d: "Hipótese, experimento e decisão — em ciclos curtos.",
  },
  {
    t: "Heatmap",
    d: "Onde o usuário trava vira ticket de dev no mesmo dia.",
  },
];

export const testimonials = [
  {
    quote:
      "Migramos a plataforma e a conversão subiu sem a gente precisar falar com três fornecedores diferentes.",
    name: "Camila Reis",
    role: "Head de E-commerce · Moda",
    initials: "CR",
    metric: "+38%",
    metricLabel: "conversão",
  },
  {
    quote:
      "Auditaram o front, corrigiram o checkout e rodaram os testes A/B. Tudo com o mesmo time, no mesmo sprint.",
    name: "Rodrigo Alves",
    role: "CEO · Casa & Decor",
    initials: "RA",
    metric: "-52%",
    metricLabel: "abandono de carrinho",
  },
  {
    quote:
      "Pela primeira vez dev e performance falam a mesma língua. Sem handoff, sem desculpa, sem jogo de empurra.",
    name: "Marina Costa",
    role: "Growth Lead · Beauty",
    initials: "MC",
    metric: "3.1x",
    metricLabel: "ROAS",
  },
];
