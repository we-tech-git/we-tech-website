import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1160,
        margin: "0 auto",
        padding: "36px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
        borderTop: "1px solid rgba(240,244,248,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <Logo size={20} />
        <span style={{ fontWeight: 700, fontSize: 14 }}>We Tech Hub</span>
        <span
          className="mono"
          style={{ fontSize: 11, color: "rgba(240,244,248,0.4)", marginLeft: 6 }}
        >
          BUILD. SCALE. REPEAT.
        </span>
      </div>
      <div style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(240,244,248,0.55)" }}>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
          style={{ textDecoration: "none" }}
        >
          WhatsApp
        </a>
        <a
          href="https://www.instagram.com/wetech.h/"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
          style={{ textDecoration: "none" }}
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
