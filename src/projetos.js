// Projetos reais da We Tech Hub
// Apenas informações verificáveis. Sem métricas inventadas.

export const projetos = [
  {
    slug: "triper",
    nome: "Triper",
    categoria: "Landing Page",
    tipo: "Produto digital · Viagens",
    resumo:
      "Landing page para plataforma de viagens — do conceito ao produto digital pronto para aquisição.",
    data: "2025",
    capa: "/img/projects/tripper_web_site.webp",
    preview: "/img/projects/tripper_web_site.webp",
    link: "",
    intro:
      "A We Tech idealizou e desenvolveu a landing page da Triper, transformando o conceito da plataforma de viagens em um produto digital funcional.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Criar uma presença digital que apresentasse a proposta de valor de forma clara para diferentes perfis de viajantes.",
      },
      {
        titulo: "O que construímos",
        texto:
          "Front-end com foco em performance, acessibilidade e experiência imersiva — animações e transições que reforçam a identidade da marca.",
      },
    ],
  },
  {
    slug: "toro-token",
    nome: "TORO Token",
    categoria: "Web3",
    tipo: "Plataforma · Cripto",
    resumo:
      "Site para token multi-estratégia com portfólio tokenizado de ativos digitais.",
    data: "2022",
    capa: "/img/projects/project_toro_banner_8.webp",
    preview: "/img/projects/toro_token_web_site.webp",
    link: "https://torotoken.io/",
    intro:
      "O TORO executa estratégias ativas e passivas — stop loss, stop buy, shorting e distribuições de rede — em um único token.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Comunicar um token multi-estratégia de forma clara e confiável para investidores.",
      },
      {
        titulo: "O que construímos",
        texto:
          "Narrativa e experiência do site para apresentar estratégias automatizadas, controles de risco e benefícios em uma página concisa.",
      },
    ],
  },
  {
    slug: "blue-token",
    nome: "Blue Token",
    categoria: "Web3",
    tipo: "Plataforma · Cripto",
    resumo:
      "Landing page para token digital baseado em cesta de criptoativos na BSC.",
    data: "2024",
    capa: "/img/projects/project_bluetoken_banner_6.webp",
    preview: "/img/projects/blue_token_web_site.webp",
    link: "https://bluetoken.io/homepage",
    intro:
      "Site da Blue Token para apresentar o token como uma cesta de criptomoedas, oferecendo diversificação em um único ativo.",
    secoes: [
      {
        titulo: "O que construímos",
        texto:
          "Reconstrução do site para renovar a marca e destacar as funcionalidades do token com clareza.",
      },
      {
        titulo: "Evolução",
        texto:
          "Projeto mantido como referência de clareza na comunicação de produtos cripto. A experiência segue sendo iterada.",
      },
    ],
  },
  {
    slug: "genesis-bank",
    nome: "Genesis Bank",
    categoria: "Institucional",
    tipo: "Site · Fintech",
    resumo:
      "Site institucional que traduz produtos bancários em uma experiência digital clara e confiável.",
    data: "2023",
    capa: "/img/projects/project_genesis_banner_10.webp",
    preview: "/img/projects/genesis_bank_web_site.webp",
    link: "https://www.genesisbank.com.br/",
    intro:
      "Experiência digital para a Genesis Bank — serviços, credibilidade e caminhos de onboarding apresentados com simplicidade.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Traduzir ofertas bancárias em uma narrativa digital clara, com tom compatível com o setor financeiro.",
      },
      {
        titulo: "O que construímos",
        texto:
          "Blocos de conteúdo organizados para produtos, benefícios e chamadas para ação, com linguagem visual alinhada ao setor financeiro.",
      },
    ],
  },
];

export function getProjeto(slug) {
  const normalizado = slug === "tripper" ? "triper" : slug;
  return projetos.find((p) => p.slug === normalizado);
}
