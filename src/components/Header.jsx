import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useI18n } from "../i18n/I18nContext.jsx";
import { ThemeToggle, LangToggle } from "./Toggles.jsx";

const NAV_ITEMS = [
  { href: "/#solucoes", hash: "#solucoes", key: "nav.solutions" },
  { href: "/#processo", hash: "#processo", key: "nav.process" },
  { href: "/#cases", hash: "#cases", key: "nav.cases" },
  { href: "/#sobre", hash: "#sobre", key: "nav.about" },
];

export default function Header() {
  const { t } = useI18n();
  const navItems = NAV_ITEMS.map((item) => ({ ...item, label: t(item.key) }));
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
            aria-label={t("a11y.homeLink")}
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

        <nav className="nav__links" aria-label={t("a11y.mainNav")}>
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

        <div className="nav__tools">
          <LangToggle />
          <ThemeToggle />
        </div>

        <Link to="/#contato" className="btn btn--primary btn--sm nav__cta">
          {t("nav.cta")}
        </Link>

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`nav__mobile${menuOpen ? " is-open" : ""}`}
        aria-label={t("a11y.mobileNav")}
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
          {t("nav.cta")}
        </Link>
      </nav>
      </div>
    </header>
  );
}
