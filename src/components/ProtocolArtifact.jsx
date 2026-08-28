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

          {/* Window Header Title Bar Wireframe */}
          <line
            x1="98"
            y1="54"
            x2="154"
            y2="54"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* =============================================================
            ESTADO 01: ENTENDER (Problem Framing)
            Aparece quando step === 0: delimitação do problema sem solução pronta.
            3 áreas vagas com propósito: CONTEXTO, OBJETIVO, RESTRIÇÃO.
            ============================================================= */}
        <g className={`proto-layer proto-layer--framing ${isStep0 ? "active" : ""}`}>
          {/* Zona 1: CONTEXTO (Área de origem do problema) */}
          <rect
            x="52"
            y="88"
            width="100"
            height="216"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeDasharray="4 3"
          />
          <text
            x="64"
            y="112"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            CONTEXTO
          </text>
          <line x1="64" y1="134" x2="136" y2="134" stroke="rgba(255, 255, 255, 0.28)" strokeDasharray="3 3" />
          <line x1="64" y1="152" x2="120" y2="152" stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="3 3" />
          <line x1="64" y1="170" x2="130" y2="170" stroke="rgba(255, 255, 255, 0.16)" strokeDasharray="3 3" />

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
            y="112"
            fill="#FF8547"
            fontSize="9"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            OBJETIVO
          </text>
          {/* Delimitação do espaço de solução */}
          <line x1="180" y1="140" x2="336" y2="140" stroke="rgba(255, 77, 0, 0.35)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="180" y1="162" x2="290" y2="162" stroke="rgba(255, 255, 255, 0.25)" strokeDasharray="3 3" />
          <line x1="180" y1="184" x2="260" y2="184" stroke="rgba(255, 255, 255, 0.18)" strokeDasharray="3 3" />

          {/* Zona 3: RESTRIÇÃO (Premissas e limites funcionais) */}
          <rect
            x="372"
            y="88"
            width="112"
            height="216"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeDasharray="4 3"
          />
          <text
            x="384"
            y="112"
            fill="rgba(255, 255, 255, 0.85)"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            RESTRIÇÃO
          </text>
          <line x1="384" y1="134" x2="466" y2="134" stroke="rgba(255, 255, 255, 0.28)" strokeDasharray="3 3" />
          <line x1="384" y1="152" x2="444" y2="152" stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="3 3" />
          <line x1="384" y1="170" x2="456" y2="170" stroke="rgba(255, 255, 255, 0.16)" strokeDasharray="3 3" />
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

          {/* Linhas guia de grid e hierarquia no conteúdo */}
          <line x1="168" y1="140" x2="354" y2="140" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
          <line x1="168" y1="216" x2="354" y2="216" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />

          {/* Labels Estruturais em Português (ocultos durante inspeção para evitar duplicação) */}
          <text
            x="52"
            y="96"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            NAVEGAÇÃO
          </text>

          <text
            x="168"
            y="96"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            CONTEÚDO
          </text>

          <text
            x="382"
            y="96"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            opacity={isValidateStep ? 0 : 1}
          >
            AÇÃO
          </text>
        </g>

        {/* =============================================================
            ESTADO 03: DAR FORMA (Recognizable UI / Wireframe)
            Visível a partir do Passo 03 (step >= 2).
            Componentes visíveis: menu ativo, hero header, cards e CTA.
            ============================================================= */}
        <g className={`proto-layer proto-layer--shape ${showShape ? "active" : ""}`}>
          {/* Top Bar Header Elements */}
          <line x1="168" y1="54" x2="230" y2="54" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="3" strokeLinecap="round" />
          <rect x="246" y="46" width="92" height="16" rx="3" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.18)" />
          <circle cx="478" cy="54" r="5" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />

          {/* Navegação: Logo marcação & Itens de Menu */}
          <rect x="52" y="112" width="20" height="10" rx="2" fill="rgba(255, 255, 255, 0.18)" />
          <line x1="78" y1="117" x2="124" y2="117" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2" strokeLinecap="round" />

          {/* Item 1 da Navegação (Ativo / Destaque) */}
          <rect
            x="48"
            y="136"
            width="96"
            height="24"
            rx="4"
            fill="rgba(255, 77, 0, 0.12)"
            stroke="rgba(255, 77, 0, 0.45)"
            strokeWidth="1"
          />
          <circle cx="58" cy="148" r="2.5" fill="#FF4D00" />
          <line x1="68" y1="148" x2="126" y2="148" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Itens 2 e 3 da Navegação */}
          <rect x="48" y="166" width="96" height="20" rx="3" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="58" cy="176" r="2" fill="rgba(255, 255, 255, 0.3)" />
          <line x1="68" y1="176" x2="114" y2="176" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinecap="round" />

          <rect x="48" y="190" width="96" height="20" rx="3" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="58" cy="200" r="2" fill="rgba(255, 255, 255, 0.3)" />
          <line x1="68" y1="200" x2="102" y2="200" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinecap="round" />

          {/* Conteúdo: Cabeçalho da Página (Hero Wireframe) */}
          <line x1="168" y1="116" x2="252" y2="116" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="168" y1="128" x2="300" y2="128" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Conteúdo: Cartão Principal (Módulo de Valor) */}
          <rect
            x="168"
            y="146"
            width="186"
            height="64"
            rx="4"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
          <line x1="180" y1="162" x2="236" y2="162" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sub-blocos internos do cartão */}
          <rect x="180" y="174" width="76" height="24" rx="2" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.14)" />
          <line x1="188" y1="186" x2="246" y2="186" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="2" strokeLinecap="round" />
          <rect x="264" y="174" width="80" height="24" rx="2" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.14)" />
          <line x1="272" y1="186" x2="334" y2="186" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="2" strokeLinecap="round" />

          {/* Conteúdo: 2 Cartões Inferiores da Grade */}
          <rect x="168" y="222" width="88" height="84" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="178" y1="236" x2="226" y2="236" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="2" strokeLinecap="round" />
          <line x1="178" y1="248" x2="242" y2="248" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="178" y="260" width="68" height="34" rx="2" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />

          <rect x="266" y="222" width="88" height="84" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="276" y1="236" x2="324" y2="236" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="2" strokeLinecap="round" />
          <line x1="276" y1="248" x2="340" y2="248" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="276" y="260" width="68" height="34" rx="2" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />

          {/* Ação: Botão Primário CTA */}
          <rect
            x="382"
            y="116"
            width="102"
            height="28"
            rx="4"
            fill="rgba(255, 77, 0, 0.16)"
            stroke="#FF4D00"
            strokeWidth="1.2"
          />
          <text
            x="433"
            y="134"
            textAnchor="middle"
            fill="#FF8547"
            fontSize="9"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            EXECUTAR
          </text>

          {/* Ação: Linhas de propriedades e metadados */}
          <line x1="382" y1="162" x2="484" y2="162" stroke="rgba(255, 255, 255, 0.16)" />
          <line x1="382" y1="178" x2="426" y2="178" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" />
          <line x1="446" y1="178" x2="484" y2="178" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="382" y1="196" x2="484" y2="196" stroke="rgba(255, 255, 255, 0.16)" />
          <line x1="382" y1="212" x2="418" y2="212" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" />
          <line x1="438" y1="212" x2="484" y2="212" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* =============================================================
            ESTADO 04: CONSTRUIR (Functional System, Components & States)
            Visível a partir do Passo 04 (step >= 3).
            Alternador de estados (ESTADO A / ESTADO B), conexões funcionais de dados.
            ============================================================= */}
        <g className={`proto-layer proto-layer--build ${showBuild ? "active" : ""}`}>
          {/* Seletor de Estados Interativos no Cartão Principal */}
          <g transform="translate(244, 150)">
            <rect x="0" y="0" width="102" height="18" rx="3" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.3)" />
            {/* Pill Ativo ESTADO A */}
            <rect x="2" y="2" width="48" height="14" rx="2" fill="#FF4D00" />
            <text
              x="26"
              y="12"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="var(--font-mono)"
            >
              ESTADO A
            </text>
            {/* ESTADO B Inativo */}
            <text
              x="75"
              y="12"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.55)"
              fontSize="7.5"
              fontWeight="600"
              fontFamily="var(--font-mono)"
            >
              ESTADO B
            </text>
          </g>

          {/* Badge de Componente Ativo no Cartão Inferior */}
          <rect
            x="178"
            y="266"
            width="70"
            height="16"
            rx="2"
            fill="rgba(255, 77, 0, 0.14)"
            stroke="rgba(255, 77, 0, 0.45)"
          />
          <text
            x="213"
            y="276"
            textAnchor="middle"
            fill="#EDEDED"
            fontSize="7"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            COMPONENTE
          </text>

          {/* Linhas de Fluxo e Conexões do Sistema de Software */}
          <path
            d="M 144 148 L 168 158 M 354 158 L 382 130"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx="144" cy="148" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="168" cy="158" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="354" cy="158" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="382" cy="130" r="3" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1" />

          {/* Badge de Status do Sistema no Painel de Ação (posição dedicada) */}
          <rect
            x="382"
            y="238"
            width="102"
            height="22"
            rx="3"
            fill="rgba(255, 77, 0, 0.12)"
            stroke="rgba(255, 77, 0, 0.4)"
          />
          <text
            x="433"
            y="252"
            textAnchor="middle"
            fill="#EDEDED"
            fontSize="7.5"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            SISTEMA ATIVO
          </text>
        </g>

        {/* =============================================================
            ESTADO 05: VALIDAR (Visual Checkpoints Overlaying Existing System)
            Visível no Passo 05. Inspeciona exatamente os módulos existentes.
            4 Checkpoints de Inspeção: NAVEGAÇÃO, CONTEÚDO, AÇÃO, RESPONSIVIDADE.
            Sem verde — somente Off-white (#F0EDE6) e Laranja (#FF4D00).
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
            y="142"
            width="194"
            height="72"
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
            x="378"
            y="112"
            width="110"
            height="36"
            rx="4"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <g transform="translate(382, 84)">
            <rect x="0" y="0" width="68" height="18" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="7" y="12" fill="#F0EDE6" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
              AÇÃO
            </text>
            <text x="56" y="12" fill="#FF4D00" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
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
            Expansão lateral do sistema com novo módulo e ramificação.
            Sem termos proibidos (LIVE, PRODUCTION, SCALE, UPTIME, TELEMETRY).
            ============================================================= */}
        <g className={`proto-layer proto-layer--evolve ${showEvolve ? "active" : ""}`}>
          {/* Novo Módulo em Expansão Lateral */}
          <rect
            x="506"
            y="96"
            width="46"
            height="176"
            rx="4"
            fill="rgba(255, 77, 0, 0.06)"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* Ramificação Conectora saindo do sistema principal */}
          <path
            d="M 484 130 L 506 130"
            stroke="#FF4D00"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx="506" cy="130" r="3" fill="#FF4D00" />

          {/* Elementos internos do novo módulo */}
          <line x1="514" y1="114" x2="544" y2="114" stroke="#FF8547" strokeWidth="2" strokeLinecap="round" />
          <rect x="512" y="126" width="34" height="24" rx="2" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" />
          <line x1="517" y1="138" x2="541" y2="138" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="512" y="158" width="34" height="24" rx="2" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" />
          <line x1="517" y1="170" x2="538" y2="170" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Indicador de Continuidade e Futuro */}
          <path d="M 526 216 L 532 222 L 526 228" fill="none" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Badge de Continuidade Pós-Entrega */}
          <g transform="translate(366, 276)">
            <rect x="0" y="0" width="118" height="22" rx="3" fill="#141720" stroke="#FF4D00" strokeWidth="1" />
            <text x="12" y="14" fill="#F0EDE6" fontSize="7.5" fontWeight="700" fontFamily="var(--font-mono)">
              NOVO MÓDULO
            </text>
            <text x="74" y="14" fill="#FF4D00" fontSize="7.5" fontWeight="700" fontFamily="var(--font-mono)">
              + EXPANSÃO
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
