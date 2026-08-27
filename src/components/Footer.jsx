import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { INSTAGRAM_URL } from "../data.js";

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

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Brand & Descriptor Column (Cols 1–5) */}
          <div className="footer__brand-col">
            <Link to="/" className="footer__brand" aria-label="We Tech Hub — página inicial">
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
                <span>Instagram @wetech.h</span>
                <span className="footer__arrow" aria-hidden="true">↗</span>
              </a>

              <Link
                to="/#top"
                className="footer__back-to-top"
                aria-label="Voltar ao topo da página"
              >
                <span>Voltar ao topo</span>
                <span className="footer__arrow" aria-hidden="true">↑</span>
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
