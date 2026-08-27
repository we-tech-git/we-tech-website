import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";

const navItems = [
  { href: "/#work", hash: "#work", label: "Projetos" },
  { href: "/#expertise", hash: "#expertise", label: "Capacidades" },
  { href: "/#process", hash: "#process", label: "Processo" },
  { href: "/#about", hash: "#about", label: "Sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="nav" role="banner">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="We Tech Hub — página inicial">
          <Logo />
          <span>We Tech</span>
        </Link>

        <nav className="nav__links" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav__link${
                location.pathname === "/" && location.hash === item.hash ? " nav__link--active" : ""
              }`}
              aria-current={
                location.pathname === "/" && location.hash === item.hash ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/#contato" className="btn btn--primary btn--sm nav__cta">
          Iniciar projeto
        </Link>

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`nav__mobile${menuOpen ? " is-open" : ""}`}
        aria-label="Navegação mobile"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`nav__link${
              location.pathname === "/" && location.hash === item.hash ? " nav__link--active" : ""
            }`}
            aria-current={
              location.pathname === "/" && location.hash === item.hash ? "page" : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/#contato"
          className="btn btn--primary"
          onClick={() => setMenuOpen(false)}
          style={{ marginTop: "var(--space-5)", alignSelf: "flex-start" }}
        >
          Iniciar projeto
        </Link>
      </nav>
    </header>
  );
}
