import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { waLink } from "../data.js";

const navItems = [
  { href: "/#diferencial", label: "Diferencial" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#prova", label: "Clientes" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
];

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: "rgba(15,27,45,0.72)",
        borderBottom: "1px solid rgba(240,244,248,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
          }}
        >
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
            We Tech Hub
          </span>
        </Link>

        <nav
          className="header-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            fontSize: 13.5,
            color: "rgba(240,244,248,0.72)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={waLink("Olá! Quero falar com a equipe da We Tech Hub.")}
          target="_blank"
          rel="noreferrer"
          className="btn-accent"
          style={{
            textDecoration: "none",
            background: "#C87D2F",
            color: "#0F1B2D",
            fontWeight: 600,
            fontSize: 13.5,
            padding: "9px 16px",
            borderRadius: 7,
          }}
        >
          Entrar em contato
        </a>
      </div>
    </header>
  );
}
