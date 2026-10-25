/* ---------------------------------------------------------------
   WE TECH HUB — BUILD PROTOCOL
   Assembly Viewport Artifact (SVG Digital Product Evolution)
   Progressive visual definition across 6 cumulative states:
   01: Entender  — Contexto, Objetivo e Restrição delimitados
   02: Definir   — Grid funcional (Navegação, Conteúdo, Ação)
   03: Dar forma — Interface e wireframe reconhecíveis
   04: Construir — Componentes, estados A/B e conexões do sistema
   05: Validar   — Inspeção com 4 checkpoints reais (sem verde)
   06: Evoluir   — Expansão modular contínua pós-lançamento
   --------------------------------------------------------------- */

import React from "react";

export default function ProtocolArtifact({ activeStep = 0, isMini = false, miniStep = null }) {
  const step = isMini ? (miniStep ?? 0) : activeStep;

  // Visual accumulation flags based on active progressive step (0 to 5)
  const isStep0 = step === 0;
  const showDefine = step >= 1;
  const showShape = step >= 2;
  const showBuild = step >= 3;
  const isValidateStep = step === 4;
  const showEvolve = step >= 5;

  return (
    <div className={`protocol-artifact-wrapper ${isMini ? "protocol-artifact--mini" : ""}`}>
      <svg
        className="protocol-artifact-svg"
        viewBox="0 0 560 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Subtle grid pattern background */}
        <defs>
          <pattern id="protoGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#protoGrid)" />

        {/* =============================================================
            PERSISTENT BASE CANVAS & BOUNDARY (ACUMULAÇÃO A)
            Sempre visível do Passo 01 ao 06. O MESMO produto.
            ============================================================= */}
        <g className="proto-layer proto-layer--base active">
          {/* Main Product Window Boundary */}
          <rect
            x="38"
            y="36"
            width="460"
            height="288"
            rx="6"
            className="proto-window-frame"
            stroke={isStep0 ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.45)"}
            strokeWidth={isStep0 ? "1.2" : "1.5"}
            strokeDasharray={isStep0 ? "6 4" : "none"}
            fill={isStep0 ? "rgba(13, 16, 21, 0.6)" : "#0D1015"}
          />

          {/* Window Header Bar Divider */}
          <line
            x1="38"
            y1="72"
            x2="498"
            y2="72"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
          />

          {/* Window Control Indicators (3 discrete dots) */}
          <circle cx="54" cy="54" r="3" fill="rgba(255, 255, 255, 0.25)" />
          <circle cx="66" cy="54" r="3" fill="rgba(255, 255, 255, 0.25)" />
          <circle cx="78" cy="54" r="3" fill="rgba(255, 255, 255, 0.25)" />

          {/* Window Header Title Bar */}
          <text
            x="96"
            y="57"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="8"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
          >
            WE TECH // PRODUTO DIGITAL
          </text>
        </g>

        {/* =============================================================
            ESTADO 01: ENTENDER (Problem Framing)
            Aparece quando step === 0: delimitação do problema sem solução pronta.
            3 áreas com propósito claro e hipóteses: CONTEXTO, OBJETIVO, RESTRIÇÃO.
            ============================================================= */}
        <g className={`proto-layer proto-layer--framing ${isStep0 ? "active" : ""}`}>
          {/* Zona 1: CONTEXTO (Área de origem do problema) */}
          <rect
            x="52"
            y="88"
            width="102"
            height="216"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeDasharray="4 3"
          />
          <text
            x="64"
            y="110"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            CONTEXTO
          </text>
          <text x="64" y="132" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Cenário de negócio
          </text>
          <text x="64" y="148" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Dores do usuário
          </text>
          <text x="64" y="164" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Gargalos de conversão
          </text>
          <text x="64" y="180" fill="rgba(255, 255, 255, 0.4)" fontSize="6.5" fontFamily="var(--font-mono)">
            REF: RESEARCH_MAP
          </text>

          {/* Zona 2: OBJETIVO (Foco central do valor do produto) */}
          <rect
            x="166"
            y="88"
            width="192"
            height="216"
            rx="4"
            fill="rgba(255, 77, 0, 0.04)"
            stroke="rgba(255, 77, 0, 0.35)"
            strokeDasharray="5 3"
          />
          <text
            x="180"
            y="110"
            fill="#FF8547"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            OBJETIVO PRINCIPAL
          </text>
          <text x="180" y="132" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="var(--font-sans)">
            Unificar experiência, interface e runtime
          </text>
          <text x="180" y="148" fill="rgba(255, 255, 255, 0.65)" fontSize="7" fontFamily="var(--font-sans)">
            • Reduzir atrito nos fluxos de decisão
          </text>
          <text x="180" y="164" fill="rgba(255, 255, 255, 0.65)" fontSize="7" fontFamily="var(--font-sans)">
            • Performance de carregamento instantânea
          </text>
          <text x="180" y="180" fill="rgba(255, 255, 255, 0.65)" fontSize="7" fontFamily="var(--font-sans)">
            • Sustentar crescimento sem dívida técnica
          </text>
          <line x1="180" y1="196" x2="336" y2="196" stroke="rgba(255, 77, 0, 0.3)" strokeDasharray="3 3" />
          <text x="180" y="212" fill="#FF8547" fontSize="6.5" fontFamily="var(--font-mono)">
            CRITÉRIO DE SUCESSO: TIME-TO-VALUE &lt; 30d
          </text>

          {/* Zona 3: RESTRIÇÃO (Premissas e limites funcionais) */}
          <rect
            x="370"
            y="88"
            width="114"
            height="216"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeDasharray="4 3"
          />
          <text
            x="382"
            y="110"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            RESTRIÇÕES
          </text>
          <text x="382" y="132" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Stack web moderna
          </text>
          <text x="382" y="148" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Prazos e marcos claros
          </text>
          <text x="382" y="164" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="var(--font-sans)">
            • Compliance e segurança
          </text>
          <text x="382" y="180" fill="rgba(255, 255, 255, 0.4)" fontSize="6.5" fontFamily="var(--font-mono)">
            CONTRATO: ESTÁVEL
          </text>
        </g>

        {/* =============================================================
            ESTADO 02: DEFINIR (Functional Grid & Structural Columns)
            Visível a partir do Passo 02 (step >= 1).
            As 3 zonas ganham estrutura concreta: NAVEGAÇÃO, CONTEÚDO, AÇÃO.
            ============================================================= */}
        <g className={`proto-layer proto-layer--define ${showDefine ? "active" : ""}`}>
          {/* Superfícies estruturais distintas para contraste */}
          <rect x="38" y="72" width="116" height="252" fill="rgba(255, 255, 255, 0.015)" />
          <rect x="154" y="72" width="214" height="252" fill="rgba(255, 255, 255, 0.035)" />
          <rect x="368" y="72" width="130" height="252" fill="rgba(255, 255, 255, 0.02)" />

          {/* Divisórias das 3 colunas principais */}
          <line x1="154" y1="72" x2="154" y2="324" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
          <line x1="368" y1="72" x2="368" y2="324" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

          {/* Labels Estruturais em Português (ocultos durante inspeção para evitar sobreposição) */}
          <text
            x="48"
            y="94"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            NAVEGAÇÃO
          </text>
          <text
            x="48"
            y="106"
            fill="rgba(255, 255, 255, 0.35)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            opacity={isValidateStep ? 0 : 1}
          >
            Rotas &amp; Acesso
          </text>

          <text
            x="168"
            y="94"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            CONTEÚDO
          </text>
          <text
            x="168"
            y="106"
            fill="rgba(255, 255, 255, 0.35)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            opacity={isValidateStep ? 0 : 1}
          >
            Fluxo de Valor &amp; Telas
          </text>

          <text
            x="380"
            y="94"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            AÇÃO
          </text>
          <text
            x="380"
            y="106"
            fill="rgba(255, 255, 255, 0.35)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            opacity={isValidateStep ? 0 : 1}
          >
            Controles &amp; Deploy
          </text>
        </g>

        {/* =============================================================
            ESTADO 03: DAR FORMA (Recognizable UI with Typography & Rich Content)
            Visível a partir do Passo 03 (step >= 2).
            Componentes detalhados: menu ativo, hero header, cards, métricas e CTA.
            ============================================================= */}
        <g className={`proto-layer proto-layer--shape ${showShape ? "active" : ""}`}>
          {/* Top Bar Header Elements: Command Bar & Status */}
          <rect
            x="248"
            y="46"
            width="134"
            height="16"
            rx="3"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.18)"
          />
          <text
            x="256"
            y="57"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
          >
            /painel-de-controle
          </text>
          <rect
            x="404"
            y="46"
            width="58"
            height="16"
            rx="2"
            fill="rgba(0, 229, 117, 0.08)"
            stroke="rgba(0, 229, 117, 0.25)"
          />
          <text
            x="433"
            y="57"
            textAnchor="middle"
            fill="#00E575"
            fontSize="6.5"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            ● ONLINE
          </text>
          <circle cx="482" cy="54" r="5" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />

          {/* Navegação: Tag de Versão / Workspace */}
          <rect
            x="48"
            y="114"
            width="96"
            height="16"
            rx="2"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text
            x="54"
            y="125"
            fill="rgba(255, 255, 255, 0.55)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
          >
            WORKSPACE // v2.4
          </text>

          {/* Item 1 da Navegação (Ativo / Destaque) */}
          <rect
            x="48"
            y="136"
            width="96"
            height="24"
            rx="4"
            fill="rgba(255, 77, 0, 0.14)"
            stroke="rgba(255, 77, 0, 0.5)"
            strokeWidth="1"
          />
          <circle cx="58" cy="148" r="2.5" fill="#FF4D00" />
          <text
            x="68"
            y="151"
            fill="#FFFFFF"
            fontSize="7.5"
            fontWeight="600"
            fontFamily="var(--font-sans)"
          >
            Visão Geral
          </text>

          {/* Itens 2, 3 e 4 da Navegação */}
          <rect x="48" y="164" width="96" height="22" rx="3" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="58" cy="175" r="2" fill="rgba(255, 255, 255, 0.35)" />
          <text x="68" y="178" fill="rgba(255, 255, 255, 0.7)" fontSize="7.5" fontFamily="var(--font-sans)">
            Módulos
          </text>

          <rect x="48" y="189" width="96" height="22" rx="3" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="58" cy="200" r="2" fill="rgba(255, 255, 255, 0.35)" />
          <text x="68" y="203" fill="rgba(255, 255, 255, 0.7)" fontSize="7.5" fontFamily="var(--font-sans)">
            Integrações
          </text>

          <rect x="48" y="214" width="96" height="22" rx="3" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="58" cy="225" r="2" fill="rgba(255, 255, 255, 0.35)" />
          <text x="68" y="228" fill="rgba(255, 255, 255, 0.5)" fontSize="7.5" fontFamily="var(--font-sans)">
            Configurações
          </text>

          {/* Status de Navegação Inferior */}
          <rect
            x="48"
            y="290"
            width="96"
            height="22"
            rx="2"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <circle cx="58" cy="301" r="2.5" fill="#00E575" />
          <text x="66" y="304" fill="rgba(255, 255, 255, 0.5)" fontSize="6" fontFamily="var(--font-mono)">
            ROTAS ATIVAS
          </text>

          {/* Conteúdo: Cabeçalho da Página com Título e Subtítulo */}
          <text
            x="168"
            y="122"
            fill="#FFFFFF"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="var(--font-sans)"
          >
            Visão do Produto Digital
          </text>
          <text
            x="168"
            y="133"
            fill="rgba(255, 255, 255, 0.55)"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
          >
            ARQUITETURA DE VALOR &amp; RUNTIME
          </text>

          {/* Conteúdo: Cartão Principal (Módulo de Valor e Retenção) */}
          <rect
            x="168"
            y="142"
            width="188"
            height="68"
            rx="4"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
          />
          <text
            x="178"
            y="157"
            fill="#EDEDED"
            fontSize="8"
            fontWeight="600"
            fontFamily="var(--font-sans)"
          >
            Fluxo Crítico de Conversão
          </text>

          {/* Sub-bloco 1: Retenção */}
          <rect
            x="178"
            y="166"
            width="82"
            height="36"
            rx="2"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.12)"
          />
          <text x="184" y="177" fill="rgba(255, 255, 255, 0.45)" fontSize="6" fontFamily="var(--font-mono)">
            TAXA DE RETENÇÃO
          </text>
          <text x="184" y="193" fill="#00E575" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono)">
            +38.4%
          </text>

          {/* Sub-bloco 2: Desempenho */}
          <rect
            x="266"
            y="166"
            width="82"
            height="36"
            rx="2"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.12)"
          />
          <text x="272" y="177" fill="rgba(255, 255, 255, 0.45)" fontSize="6" fontFamily="var(--font-mono)">
            LATÊNCIA DE API
          </text>
          <text x="272" y="193" fill="#FF8547" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono)">
            14ms // 99.9%
          </text>

          {/* Conteúdo: Grade Inferior com 2 Cartões de Alta Fidelidade */}
          {/* Cartão 1: Design System & Tokens */}
          <rect
            x="168"
            y="218"
            width="90"
            height="94"
            rx="4"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <text x="176" y="232" fill="#EDEDED" fontSize="7.5" fontWeight="600" fontFamily="var(--font-sans)">
            Design System
          </text>
          <text x="176" y="243" fill="rgba(255, 255, 255, 0.45)" fontSize="6" fontFamily="var(--font-mono)">
            Tokens &amp; Ergonomia
          </text>
          <rect
            x="176"
            y="250"
            width="74"
            height="26"
            rx="2"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text x="182" y="261" fill="rgba(255, 255, 255, 0.7)" fontSize="6.5" fontFamily="var(--font-mono)">
            8pt Grid · 24 DS
          </text>
          <text x="182" y="271" fill="#FF8547" fontSize="6" fontFamily="var(--font-mono)">
            #FF4D00 Mineral
          </text>

          {/* Cartão 2: Engenharia & Runtime */}
          <rect
            x="266"
            y="218"
            width="90"
            height="94"
            rx="4"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <text x="274" y="232" fill="#EDEDED" fontSize="7.5" fontWeight="600" fontFamily="var(--font-sans)">
            Engenharia
          </text>
          <text x="274" y="243" fill="rgba(255, 255, 255, 0.45)" fontSize="6" fontFamily="var(--font-mono)">
            Runtime &amp; Contratos
          </text>
          <rect
            x="274"
            y="250"
            width="74"
            height="34"
            rx="2"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text x="280" y="262" fill="#00E575" fontSize="6.5" fontWeight="600" fontFamily="var(--font-mono)">
            ● HYDRATED
          </text>
          <text x="280" y="272" fill="rgba(255, 255, 255, 0.55)" fontSize="6" fontFamily="var(--font-mono)">
            SSR: 16ms
          </text>
          <text x="280" y="280" fill="rgba(255, 255, 255, 0.45)" fontSize="5.5" fontFamily="var(--font-mono)">
            ZERO_LEAKS
          </text>
          <text x="274" y="302" fill="rgba(255, 255, 255, 0.4)" fontSize="5.5" fontFamily="var(--font-mono)">
            SCORE: 99/100
          </text>

          {/* Ação: Botão Primário CTA com Texto Real */}
          <rect
            x="380"
            y="118"
            width="106"
            height="30"
            rx="4"
            fill="rgba(255, 77, 0, 0.18)"
            stroke="#FF4D00"
            strokeWidth="1.2"
          />
          <text
            x="433"
            y="136"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8"
            fontWeight="700"
            fontFamily="var(--font-sans)"
            letterSpacing="0.04em"
          >
            PUBLICAR PRODUTO
          </text>

          {/* Ação: Especificação Técnica e Metadados com Valores Reais */}
          <text
            x="380"
            y="164"
            fill="rgba(255, 255, 255, 0.45)"
            fontSize="6.5"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            ESPECIFICAÇÃO TÉCNICA
          </text>
          <line x1="380" y1="170" x2="486" y2="170" stroke="rgba(255, 255, 255, 0.12)" />

          <text x="380" y="184" fill="rgba(255, 255, 255, 0.5)" fontSize="6.5" fontFamily="var(--font-mono)">
            Ambiente:
          </text>
          <text x="486" y="184" textAnchor="end" fill="#FFFFFF" fontSize="6.5" fontWeight="600" fontFamily="var(--font-mono)">
            Produção
          </text>

          <text x="380" y="200" fill="rgba(255, 255, 255, 0.5)" fontSize="6.5" fontFamily="var(--font-mono)">
            Versão:
          </text>
          <text x="486" y="200" textAnchor="end" fill="#FF8547" fontSize="6.5" fontWeight="600" fontFamily="var(--font-mono)">
            v2.4.0
          </text>

          <text x="380" y="216" fill="rgba(255, 255, 255, 0.5)" fontSize="6.5" fontFamily="var(--font-mono)">
            Contrato:
          </text>
          <text x="486" y="216" textAnchor="end" fill="#00E575" fontSize="6.5" fontWeight="600" fontFamily="var(--font-mono)">
            Tipado
          </text>

          <text x="380" y="232" fill="rgba(255, 255, 255, 0.5)" fontSize="6.5" fontFamily="var(--font-mono)">
            SLA:
          </text>
          <text x="486" y="232" textAnchor="end" fill="#EDEDED" fontSize="6.5" fontWeight="600" fontFamily="var(--font-mono)">
            99.9%
          </text>

          {/* Mini console de auditoria de deploy */}
          <rect
            x="380"
            y="246"
            width="106"
            height="44"
            rx="3"
            fill="#090B0E"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text x="386" y="258" fill="rgba(255, 255, 255, 0.35)" fontSize="5.5" fontFamily="var(--font-mono)">
            $ we-tech audit --strict
          </text>
          <text x="386" y="269" fill="#00E575" fontSize="6" fontFamily="var(--font-mono)">
            ✔ 0 vulnerabilities
          </text>
          <text x="386" y="280" fill="rgba(255, 255, 255, 0.55)" fontSize="5.5" fontFamily="var(--font-mono)">
            ✔ bundle 125kb gzip
          </text>
        </g>

        {/* =============================================================
            ESTADO 04: CONSTRUIR (Functional System, Components & States)
            Visível a partir do Passo 04 (step >= 3).
            Alternador de estados (PROD / DEV), conexões funcionais de dados e selo de componente.
            ============================================================= */}
        <g className={`proto-layer proto-layer--build ${showBuild ? "active" : ""}`}>
          {/* Seletor de Estados Interativos no Cartão Principal com Texto Real */}
          <g transform="translate(266, 145)">
            <rect x="0" y="0" width="82" height="16" rx="2.5" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.25)" />
            {/* Pill ativo — estado selecionado */}
            <rect x="1.5" y="1.5" width="40" height="13" rx="2" fill="#FF4D00" />
            <text x="21.5" y="10.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="700" fontFamily="var(--font-mono)">
              PROD
            </text>
            {/* Estado alternativo — inativo */}
            <text x="61" y="10.5" textAnchor="middle" fill="rgba(255, 255, 255, 0.45)" fontSize="6" fontWeight="600" fontFamily="var(--font-mono)">
              DEV
            </text>
          </g>

          {/* Badge de Componente Ativo no Cartão Inferior */}
          <rect
            x="176"
            y="282"
            width="74"
            height="18"
            rx="2"
            fill="rgba(255, 77, 0, 0.14)"
            stroke="rgba(255, 77, 0, 0.45)"
          />
          <text
            x="213"
            y="294"
            textAnchor="middle"
            fill="#EDEDED"
            fontSize="6.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
          >
            COMPONENTE OK
          </text>

          {/* Linhas de Fluxo e Conexões do Sistema de Software */}
          <path
            d="M 144 148 L 168 158 M 356 160 L 380 132"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx="144" cy="148" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="168" cy="158" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="356" cy="160" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="380" cy="132" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
        </g>

        {/* =============================================================
            ESTADO 05: VALIDAR (Visual Checkpoints Overlaying Existing System)
            Visível no Passo 05. Inspeciona exatamente os módulos existentes.
            4 Checkpoints de Inspeção: NAVEGAÇÃO, CONTEÚDO, AÇÃO, RESPONSIVIDADE.
            ============================================================= */}
        <g className={`proto-layer proto-layer--validate ${isValidateStep ? "active" : ""}`}>
          {/* Checkpoint 1: NAVEGAÇÃO */}
          <rect
            x="44"
            y="106"
            width="104"
            height="114"
            rx="4"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <g transform="translate(44, 84)">
            <rect x="0" y="0" width="98" height="18" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="8" y="12" fill="#F0EDE6" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
              NAVEGAÇÃO
            </text>
            <text x="86" y="12" fill="#FF4D00" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
              ✓
            </text>
          </g>

          {/* Checkpoint 2: CONTEÚDO */}
          <rect
            x="164"
            y="138"
            width="196"
            height="76"
            rx="4"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <g transform="translate(164, 84)">
            <rect x="0" y="0" width="88" height="18" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="8" y="12" fill="#F0EDE6" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
              CONTEÚDO
            </text>
            <text x="76" y="12" fill="#FF4D00" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
              ✓
            </text>
          </g>

          {/* Checkpoint 3: AÇÃO */}
          <rect
            x="376"
            y="114"
            width="114"
            height="38"
            rx="4"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <g transform="translate(380, 84)">
            <rect x="0" y="0" width="70" height="18" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="7" y="12" fill="#F0EDE6" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
              AÇÃO
            </text>
            <text x="58" y="12" fill="#FF4D00" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
              ✓
            </text>
          </g>

          {/* Checkpoint 4: RESPONSIVIDADE (Inspeção de ancoragem e escala) */}
          <line x1="38" y1="316" x2="498" y2="316" stroke="#FF4D00" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="38" y1="311" x2="38" y2="321" stroke="#FF4D00" strokeWidth="2" />
          <line x1="498" y1="311" x2="498" y2="321" stroke="#FF4D00" strokeWidth="2" />
          <g transform="translate(198, 306)">
            <rect x="0" y="0" width="138" height="18" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="8" y="12" fill="#F0EDE6" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
              RESPONSIVIDADE
            </text>
            <text x="126" y="12" fill="#FF4D00" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
              ✓
            </text>
          </g>
        </g>

        {/* =============================================================
            ESTADO 06: EVOLUIR (Continuous Modular Expansion)
            Visível no Passo 06 (step >= 5).
            Expansão lateral do sistema com novo módulo contextualizado e ramificação.
            ============================================================= */}
        <g className={`proto-layer proto-layer--evolve ${showEvolve ? "active" : ""}`}>
          {/* Novo Módulo em Expansão Lateral */}
          <rect
            x="504"
            y="96"
            width="50"
            height="186"
            rx="4"
            fill="rgba(255, 77, 0, 0.06)"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* Ramificação Conectora saindo do sistema principal */}
          <path
            d="M 486 133 L 504 133"
            stroke="#FF4D00"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx="504" cy="133" r="3" fill="#FF4D00" />

          {/* Elementos internos do novo módulo com texto real */}
          <rect
            x="508"
            y="102"
            width="42"
            height="16"
            rx="2"
            fill="rgba(255, 77, 0, 0.15)"
            stroke="rgba(255, 77, 0, 0.4)"
          />
          <text
            x="529"
            y="113"
            textAnchor="middle"
            fill="#FF8547"
            fontSize="6"
            fontWeight="700"
            fontFamily="var(--font-mono)"
          >
            +NOVO
          </text>

          <rect
            x="508"
            y="124"
            width="42"
            height="32"
            rx="2"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.15)"
          />
          <text x="529" y="137" textAnchor="middle" fill="#EDEDED" fontSize="6" fontWeight="600" fontFamily="var(--font-mono)">
            MÓDULO
          </text>
          <text x="529" y="147" textAnchor="middle" fill="rgba(255, 255, 255, 0.45)" fontSize="5.5" fontFamily="var(--font-mono)">
            ANALYTICS
          </text>

          <rect
            x="508"
            y="162"
            width="42"
            height="32"
            rx="2"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.15)"
          />
          <text x="529" y="175" textAnchor="middle" fill="#FF8547" fontSize="6" fontWeight="600" fontFamily="var(--font-mono)">
            ESCALA
          </text>
          <text x="529" y="185" textAnchor="middle" fill="rgba(255, 255, 255, 0.45)" fontSize="5.5" fontFamily="var(--font-mono)">
            CONTÍNUA
          </text>

          {/* Indicador de Continuidade e Futuro */}
          <path
            d="M 525 212 L 531 218 L 525 224"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="529"
            y="238"
            textAnchor="middle"
            fill="#FF8547"
            fontSize="5.5"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            CICLO v2
          </text>
        </g>
      </svg>
    </div>
  );
}
