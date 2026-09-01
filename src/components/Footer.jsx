import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { INSTAGRAM_URL, LINKEDIN_URL } from "../data.js";

/* ---------------------------------------------------------------
   WE TECH HUB — FOOTER (FASE 8)
   Clean, architectural, and restrained closure.
   Preserves real links only. Zero invented metadata.
   --------------------------------------------------------------- */

const FOOTER_NAV = [
  { href: "/#work", label: "Projetos" },
  { href: "/#expertise", label: "Capacidades" },
  { href: "/#process", label: "Processo" },
  { href: "/#about", label: "Princípios" },
  { href: "/projetos", label: "Todos os Projetos" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Brand & Descriptor Column (Cols 1–5) */}
          <div className="footer__brand-col">
            <Link
              to="/"
              className="footer__brand"
              aria-label="We Tech Hub — página inicial"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (window.location.hash) {
                    window.history.pushState(null, "", "/");
                  }
                }
              }}
            >
              <Logo size={20} />
              <span className="footer__brand-name">We Tech Hub</span>
            </Link>

            <span className="mono footer__descriptor">
              Digital Product & Engineering Studio
            </span>

            <p className="footer__summary">
              Produto, design e engenharia conectados ao longo de toda a evolução do produto.
            </p>
          </div>

          {/* Navigation Column (Cols 6–9) */}
          <div className="footer__nav-col">
            <span className="mono footer__col-title">Navegação</span>
            <nav className="footer__nav" aria-label="Links do rodapé">
              <ul className="footer__nav-list" role="list">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Channels & Actions Column (Cols 10–12) */}
          <div className="footer__channels-col">
            <span className="mono footer__col-title">Contato</span>
            <div className="footer__channels-list">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__channel-link"
                aria-label="Acessar o perfil oficial da We Tech Hub no Instagram"
              >
                <svg
                  className="footer__social-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__channel-link"
                aria-label="Acessar a página oficial da We Tech Hub no LinkedIn"
              >
                <svg
                  className="footer__social-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <Link
                to="/#top"
                className="footer__back-to-top"
                aria-label="Voltar ao topo da página"
              >
                <span>Voltar ao topo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Metadata Bar */}
        <div className="footer__bottom">
          <span className="mono footer__copyright">
            © {currentYear} We Tech Hub. Todos os direitos reservados.
          </span>

          <span className="mono footer__bottom-label">
            We Tech Hub · {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
}
