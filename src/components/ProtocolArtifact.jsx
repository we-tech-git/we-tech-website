/* ---------------------------------------------------------------
   WE TECH HUB — BUILD PROTOCOL
   Assembly Viewport Artifact (SVG Monolith)
   Progressive visual definition across 6 states:
   01: Boundary / Frame
   02: Structure / Define
   03: Experience / Shape
   04: Functional System / Build
   05: Validation / Validate
   06: Evolution / Evolve
   --------------------------------------------------------------- */

import React from "react";

export default function ProtocolArtifact({ activeStep = 0, isMini = false, miniStep = null }) {
  const step = isMini ? miniStep : activeStep;

  // Visual flags based on active progressive step (0 to 5)
  const showFrame = step >= 0;
  const showDefine = step >= 1;
  const showShape = step >= 2;
  const showBuild = step >= 3;
  const showValidate = step >= 4;
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
        {/* Background Subtle Grid Texture */}
        <defs>
          <pattern id="protoGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
          </pattern>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 77, 0, 0)" />
            <stop offset="50%" stopColor="rgba(255, 77, 0, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 77, 0, 0)" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#protoGrid)" />

        {/* -------------------------------------------------------------
            STAGE 01: FRAME / BOUNDARY (Always base)
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--frame ${showFrame ? "active" : ""}`}>
          {/* Corner Crosshairs */}
          <path d="M 32 44 L 48 44 M 40 36 L 40 52" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M 512 44 L 528 44 M 520 36 L 520 52" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M 32 316 L 48 316 M 40 308 L 40 324" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M 512 316 L 528 316 M 520 308 L 520 324" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

          {/* Primary Bounding Box (Dashed/Hairline) */}
          <rect
            x="40"
            y="44"
            width="480"
            height="272"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray={step === 0 ? "4 4" : "none"}
            fill="rgba(10, 11, 13, 0.4)"
          />

          {/* Center Guide Axes (Subtle) */}
          <line x1="280" y1="44" x2="280" y2="316" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" strokeWidth="1" />
          <line x1="40" y1="180" x2="520" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" strokeWidth="1" />

          {/* Axis Labels */}
          <text x="46" y="60" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="var(--font-mono)">
            Base [0, 0]
          </text>
          <text x="456" y="306" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="var(--font-mono)">
            Grade [560, 360]
          </text>
        </g>

        {/* -------------------------------------------------------------
            STAGE 02: DEFINE / STRUCTURAL DIVISIONS
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--define ${showDefine ? "active" : ""}`}>
          {/* Header Bar Partition */}
          <line x1="40" y1="84" x2="520" y2="84" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Left Sidebar Partition */}
          <line x1="160" y1="84" x2="160" y2="316" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Right Split Partition */}
          <line x1="380" y1="84" x2="380" y2="316" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="160" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Caliper Measurement Marks along Sidebar */}
          <line x1="156" y1="120" x2="164" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="156" y1="160" x2="164" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="156" y1="240" x2="164" y2="240" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="156" y1="280" x2="164" y2="280" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Zone Tags */}
          <text x="52" y="104" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="var(--font-mono)">
            Navegação
          </text>
          <text x="172" y="104" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="var(--font-mono)">
            Conteúdo
          </text>
          <text x="392" y="104" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="var(--font-mono)">
            Detalhes
          </text>
        </g>

        {/* -------------------------------------------------------------
            STAGE 03: SHAPE / EXPERIENCE & INTERACTION PLANES
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--shape ${showShape ? "active" : ""}`}>
          {/* Top Bar Action Elements */}
          <rect x="52" y="56" width="36" height="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="100" y1="63" x2="140" y2="63" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <line x1="150" y1="63" x2="185" y2="63" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <circle cx="496" cy="63" r="4" fill="var(--accent)" />
          <circle cx="480" cy="63" r="3" fill="rgba(255,255,255,0.2)" />

          {/* Left Menu Items (Abstract Interface) */}
          <rect x="52" y="120" width="94" height="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="60" y1="130" x2="120" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

          <rect x="52" y="148" width="94" height="20" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="60" y1="158" x2="105" y2="158" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          <rect x="52" y="176" width="94" height="20" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="60" y1="186" x2="115" y2="186" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* Main Content Functional Cards */}
          <rect x="174" y="118" width="192" height="68" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="186" y1="134" x2="250" y2="134" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <line x1="186" y1="148" x2="340" y2="148" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="186" y1="160" x2="310" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle cx="348" cy="134" r="3" fill="var(--accent)" />

          {/* Lower Main Grid Sub-blocks */}
          <rect x="174" y="214" width="90" height="88" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="186" y1="230" x2="230" y2="230" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="186" y="246" width="66" height="42" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          <rect x="276" y="214" width="90" height="88" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="288" y1="230" x2="332" y2="230" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="288" y="246" width="66" height="42" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Right Inspector Panel Rows */}
          <rect x="392" y="118" width="114" height="184" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="404" y1="136" x2="470" y2="136" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <line x1="404" y1="156" x2="492" y2="156" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="404" y1="174" x2="450" y2="174" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="404" y1="194" x2="492" y2="194" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="404" y1="212" x2="465" y2="212" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        </g>

        {/* -------------------------------------------------------------
            STAGE 04: BUILD / INTEGRATED ARCHITECTURAL SYSTEM
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--build ${showBuild ? "active" : ""}`}>
          {/* Depth / Extrusion Shadows & Underlines (Isometric Structural Anchor) */}
          <path
            d="M 40 316 L 46 322 L 526 322 L 520 316"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <path
            d="M 520 44 L 526 50 L 526 322 L 520 316"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />

          {/* High-Integrity Solid Borders */}
          <rect x="174" y="118" width="192" height="68" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="transparent" />
          <rect x="392" y="118" width="114" height="184" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="transparent" />

          {/* Inter-Module Bus Lines & Routing */}
          <path d="M 146 130 L 174 130" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 366 148 L 392 148" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 270 186 L 270 214" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2" />

          {/* Connection Terminal Pins */}
          <circle cx="174" cy="130" r="2.5" fill="#FFFFFF" />
          <circle cx="366" cy="148" r="2.5" fill="#FFFFFF" />
          <circle cx="392" cy="148" r="2.5" fill="#FFFFFF" />
          <circle cx="270" cy="214" r="2.5" fill="#FFFFFF" />
        </g>

        {/* -------------------------------------------------------------
            STAGE 05: VALIDATE / INSPECTION & PRECISION CHECKPOINTS
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--validate ${showValidate ? "active" : ""}`}>
          {/* Scanline Sweep Bar */}
          <rect x="40" y="140" width="480" height="24" fill="url(#scanGradient)" opacity="0.8" />
          <line x1="40" y1="152" x2="520" y2="152" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.7" />

          {/* Inspection Target Reticles on Key Joints */}
          <g transform="translate(174, 118)">
            <circle cx="0" cy="0" r="6" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <circle cx="0" cy="0" r="2" fill="var(--accent)" />
          </g>

          <g transform="translate(366, 186)">
            <circle cx="0" cy="0" r="6" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <circle cx="0" cy="0" r="2" fill="var(--accent)" />
          </g>

          <g transform="translate(506, 118)">
            <circle cx="0" cy="0" r="6" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <circle cx="0" cy="0" r="2" fill="var(--accent)" />
          </g>

          <g transform="translate(366, 302)">
            <circle cx="0" cy="0" r="6" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <circle cx="0" cy="0" r="2" fill="var(--accent)" />
          </g>

          {/* Calibration Marks (Ticks) */}
          <line x1="36" y1="152" x2="44" y2="152" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="516" y1="152" x2="524" y2="152" stroke="var(--accent)" strokeWidth="1.5" />
        </g>

        {/* -------------------------------------------------------------
            STAGE 06: EVOLVE / CONTINUOUS SYSTEM EXPANSION
            ------------------------------------------------------------- */}
        <g className={`proto-layer proto-layer--evolve ${showEvolve ? "active" : ""}`}>
          {/* Extended Modular Projection (Right Outer Vector) */}
          <path
            d="M 520 84 L 540 84 L 540 316 L 520 316"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <line x1="520" y1="200" x2="540" y2="200" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

          {/* Directional Expansion Arrows */}
          <path d="M 544 196 L 550 200 L 544 204" stroke="var(--accent)" strokeWidth="1.5" fill="none" />

          {/* Active Continuity Node */}
          <circle cx="520" cy="84" r="3" fill="var(--accent)" />
          <circle cx="540" cy="84" r="2" fill="var(--accent)" opacity="0.8" />
          <circle cx="540" cy="200" r="2" fill="var(--accent)" opacity="0.8" />

          {/* Continuity marker */}
          <circle cx="52" cy="304" r="3" fill="var(--accent)" />
          <text x="62" y="307" fill="var(--accent)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.04em">
            Sistema contínuo · Pronto para evoluir
          </text>
        </g>
      </svg>
    </div>
  );
}
