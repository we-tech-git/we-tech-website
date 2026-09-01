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
  const [isFloating, setIsFloating] = useState(false);
  const location = useLocation();

  // Activate floating navbar when user scrolls past the hero section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroEl = document.querySelector(".hero");
          if (heroEl) {
            const heroRect = heroEl.getBoundingClientRect();
            // When the bottom of the hero section reaches or passes the top of the viewport
            setIsFloating(heroRect.bottom <= 60);
          } else {
            // Fallback for pages without a hero section
            setIsFloating(window.scrollY > 80);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

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
    <header className="nav-wrapper" role="banner">
      <div
        className={`nav${isFloating ? " nav--floating" : ""}${
          menuOpen ? " is-menu-open" : ""
        }`}
      >
        <div className="container container--ultra nav__inner">
          <Link
            to="/"
            className="nav__brand"
            aria-label="We Tech Hub — página inicial"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              if (window.location.hash) {
                window.history.pushState(null, "", "/");
              }
            }
            setMenuOpen(false);
          }}
        >
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
      </div>
    </header>
  );
}
