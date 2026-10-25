// Projetos reais da We Tech Hub
// Apenas informações verificáveis. Sem métricas inventadas.

export const projetos = [
  {
    slug: "maria-mariana",
    nome: "Ateliê Maria Mariana",
    categoria: "E-commerce",
    tipo: "Loja virtual · Têxteis artesanais",
    resumo:
      "Loja virtual para têxteis artesanais de mesa, com catálogo de produtos e experiência de compra elegante.",
    data: "2026",
    capa: "/img/projects/marianaprojeto2.png",
    preview: "/img/projects/mariaprojeto.png",
    link: "https://ateliemariamariana.com.br",
    intro:
      "E-commerce para o Ateliê Maria Mariana — têxteis feitos à mão para a mesa, apresentados com uma vitrine digital que traduz o cuidado artesanal da marca.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Criar uma loja virtual que transmitisse a sofisticação artesanal da marca, com navegação clara por categorias de produto.",
      },
      {
        titulo: "O que construímos",
        texto:
          "E-commerce completo com catálogo, filtros por categoria e disponibilidade, e identidade visual editorial alinhada ao universo têxtil da marca.",
      },
    ],
    en: {
      categoria: "E-commerce",
      tipo: "Online store · Handmade textiles",
      resumo:
        "Online store for handmade table textiles, with a product catalog and an elegant buying experience.",
      intro:
        "E-commerce for Ateliê Maria Mariana — handmade table textiles presented in a digital storefront that conveys the brand's craftsmanship.",
      secoes: [
        {
          titulo: "The challenge",
          texto:
            "Create an online store that conveyed the brand's handcrafted sophistication, with clear navigation by product category.",
        },
        {
          titulo: "What we built",
          texto:
            "A complete e-commerce with catalog, category and availability filters, and an editorial visual identity aligned with the brand's textile universe.",
        },
      ],
    },
  },
  {
    slug: "we-party",
    nome: "We Party",
    categoria: "Social",
    tipo: "Plataforma · Eventos",
    resumo:
      "Rede social para descobrir eventos e se conectar com pessoas que também vão.",
    data: "2026",
    capa: "/img/projects/wepartyprojeto2.png",
    preview: "/img/projects/wepartyprojeto.png",
    link: "https://www.wepartyapp.com",
    intro:
      "A We Party conecta quem ama sair de casa — descoberta de eventos próximos, integração com ticketing e uma comunidade em torno de cada show.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Criar uma experiência social em torno de eventos, unindo descoberta, curtidas e conexão entre pessoas que vão ao mesmo lugar.",
      },
      {
        titulo: "O que construímos",
        texto:
          "Plataforma com feed de eventos, integração com Ticketmaster e perfis sociais, com identidade visual vibrante alinhada ao universo de shows e festas.",
      },
    ],
    en: {
      categoria: "Social",
      tipo: "Platform · Events",
      resumo:
        "A social network to discover events and connect with people who are going too.",
      intro:
        "We Party connects people who love going out — nearby event discovery, ticketing integration and a community around every show.",
      secoes: [
        {
          titulo: "The challenge",
          texto:
            "Create a social experience around events, combining discovery, likes and connection between people going to the same place.",
        },
        {
          titulo: "What we built",
          texto:
            "A platform with an event feed, Ticketmaster integration and social profiles, with a vibrant visual identity aligned with the world of shows and parties.",
        },
      ],
    },
  },
  {
    slug: "lelume",
    nome: "Lelume",
    categoria: "Institucional",
    tipo: "Site · Edtech",
    resumo:
      "Biblioteca digital por assinatura, com experiência clara para acesso a livros, audiolivros e conteúdos educacionais.",
    data: "2026",
    capa: "/img/projects/lelumeprojeto2.png",
    preview: "/img/projects/lelumeprojeto.png",
    link: "https://lelume.com.br/",
    intro:
      "Experiência digital para a Lelume — biblioteca digital que reúne livros, audiolivros e conteúdos educacionais em uma única assinatura.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Apresentar um catálogo amplo e em crescimento de forma organizada, comunicando confiança para estudantes e profissionais.",
      },
      {
        titulo: "O que construímos",
        texto:
          "Estrutura de conteúdo com destaque para o catálogo, benefícios da assinatura e indicadores de resultado, com linguagem visual clara e moderna.",
      },
    ],
    en: {
      categoria: "Institutional",
      tipo: "Website · Edtech",
      resumo:
        "A subscription digital library with a clear experience for accessing books, audiobooks and educational content.",
      intro:
        "A digital experience for Lelume — a digital library that brings books, audiobooks and educational content together in a single subscription.",
      secoes: [
        {
          titulo: "The challenge",
          texto:
            "Present a broad, growing catalog in an organized way, conveying trust to students and professionals.",
        },
        {
          titulo: "What we built",
          texto:
            "A content structure highlighting the catalog, the subscription benefits and result indicators, with a clear, modern visual language.",
        },
      ],
    },
  },
];

export function getProjeto(slug) {
  return projetos.find((p) => p.slug === slug);
}

// Returns the project with text fields resolved for the given language.
// Portuguese is the source of truth; `en` overrides the text fields.
export function localizeProjeto(projeto, lang) {
  if (!projeto || lang === "pt") return projeto;
  return { ...projeto, ...projeto.en };
}
