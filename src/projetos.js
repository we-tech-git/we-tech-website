// Projetos que a We Tech desenvolveu — migrados do site antigo (Vue) para o
// site novo em React. Textos em PT-BR, alinhados à identidade atual.

export const projetos = [
  {
    slug: "triper",
    nome: "Triper",
    categoria: "Landing page · Viagens",
    resumo:
      "Experiência de viagem criada pela We Tech, conectando usuários a roteiros inspiradores.",
    data: "Publicado em jan 2025",
    capa: "/img/projects/tripper_web_site.png",
    preview: "/img/projects/tripper_web_site.png",
    link: "",
    intro:
      "A We Tech foi responsável por idealizar e desenvolver a landing page da Triper, transformando o conceito da plataforma de viagens em um produto digital pronto para receber novos clientes.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "A Triper precisava de uma presença digital moderna que apresentasse sua proposta de valor de forma clara e atrativa, transformando uma ideia inicial em um site capaz de se comunicar com diferentes perfis de viajantes.",
      },
      {
        titulo: "Soluções e aplicações",
        texto:
          "Estruturamos o front-end com as melhores práticas atuais de performance, acessibilidade e organização de componentes, explorando animações e transições que reforçam a identidade da Triper e mantêm a navegação leve e intuitiva.",
      },
    ],
    preview_titulo: "Visualização",
    preview_texto:
      "A interface desenhada destaca a experiência de viagem com imagens imersivas e tipografia limpa.",
    resultado_titulo: "Resultado",
    resultado_texto:
      "Uma landing page totalmente responsiva e envolvente pronta para o lançamento.",
  },
  {
    slug: "toro-token",
    nome: "TORO token",
    categoria: "Web3 · Cripto",
    resumo:
      "Portfólio tokenizado com estratégias ativas e passivas automatizadas em um único ativo.",
    data: "Publicado em jul 2022",
    capa: "/img/projects/project_toro_banner_8.png",
    preview: "/img/projects/toro_token_web_site.png",
    link: "https://torotoken.io/",
    intro:
      "O TORO foi programado para executar estratégias ativas e passivas — como stop loss, stop buy, shorting e distribuições de rede — ajudando detentores a construir um portfólio de ativos digitais em um único token, mitigando riscos.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Explicar um token multi-estratégia (stop loss / stop buy / short) de forma clara e confiável para investidores.",
      },
      {
        titulo: "Abordagem",
        texto:
          "Estruturamos a narrativa e a experiência do site para apresentar estratégias automatizadas, controles de risco e benefícios em uma página concisa.",
      },
    ],
    preview_titulo: "Resultado",
    preview_texto:
      "Seções de destaque apresentam a história do token e o mix de estratégias, com visuais que reforçam o acompanhamento de performance.",
    resultado_titulo: "Impacto",
    resultado_texto:
      "A comunicação clara aumentou a confiança e forneceu um ponto único de entrada para as estratégias tokenizadas do TORO.",
  },
  {
    slug: "blue-token",
    nome: "Blue Token",
    categoria: "Web3 · Cripto",
    resumo:
      "Landing criada pela We Tech para apresentar o BLUE, token digital baseado em uma cesta de criptoativos.",
    data: "Publicado em ago 2024",
    capa: "/img/projects/project_bluetoken_banner_6.png",
    preview: "/img/projects/blue_token_web_site.png",
    link: "https://bluetoken.io/homepage",
    intro:
      "A We Tech desenvolveu o site da Blue Token para explicar o token como uma cesta de criptomoedas na BSC, oferecendo aos usuários um único token que representa vários ativos, com conveniência e diversificação.",
    secoes: [
      {
        titulo: "Relatos da engenharia",
        texto:
          "Reconstruímos o site do BLUE para renovar a marca e destacar as características do token, oferecendo uma visão ampla das funcionalidades e dos benefícios que os usuários têm ao adquirir BLUE.",
      },
      {
        titulo: "BLUE token atualmente",
        texto:
          "Hoje o produto é mantido com referências de performance no mercado cripto; a We Tech usa o projeto como exemplo de clareza na apresentação do token e segue evoluindo a experiência.",
      },
    ],
    preview_titulo: "Visão do site",
    preview_texto:
      "A landing do BLUE criada pela We Tech apresenta a história do token, benefícios e visuais alinhados à nova direção de marca.",
    resultado_titulo: "Resultados e próximos passos",
    resultado_texto:
      "Com o novo site, o BLUE comunica sua proposta de forma mais clara; a We Tech segue iterando para evidenciar performance e ampliar o roadmap para novos usuários e investidores.",
  },
  {
    slug: "genesis-bank",
    nome: "Genesis Bank",
    categoria: "Institucional · Fintech",
    resumo:
      "Site institucional que traduz produtos bancários em uma experiência digital clara.",
    data: "Publicado em out 2023",
    capa: "/img/projects/project_genesis_banner_10.png",
    preview: "/img/projects/genesis_bank_web_site.png",
    link: "https://www.genesisbank.com.br/",
    intro:
      "A We Tech desenhou a experiência da Genesis Bank para apresentar serviços, credibilidade e caminhos de onboarding de forma simples.",
    secoes: [
      {
        titulo: "O desafio",
        texto:
          "Traduzir ofertas bancárias em uma narrativa digital que equilibre confiança, compliance e conversão.",
      },
      {
        titulo: "Abordagem",
        texto:
          "Organizamos blocos de conteúdo para produtos, benefícios e chamadas para ação, usando linguagem visual alinhada a finanças.",
      },
    ],
    preview_titulo: "Resultado",
    preview_texto:
      "A página destaca autoridade da marca e conduz usuários para contato e fluxos de serviço com CTAs claros.",
    resultado_titulo: "Impacto",
    resultado_texto:
      "Maior clareza e confiança para prospects que exploram a presença digital da Genesis Bank.",
  },
];

export function getProjeto(slug) {
  const normalizado = slug === "tripper" ? "triper" : slug;
  return projetos.find((p) => p.slug === normalizado);
}
