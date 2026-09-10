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
  },
];

export function getProjeto(slug) {
  return projetos.find((p) => p.slug === slug);
}
