import { Link } from "react-router-dom";
import { useEffect } from "react";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Página não encontrada — We Tech Hub";
    return () => { document.title = previous; };
  }, []);

  return (
    <main>
      <Seo noindex />
      <section className="pd pd__404">
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ marginBottom: "var(--space-4)", display: "block" }}>
            404
          </span>
          <h1 className="heading-lg" style={{ marginBottom: "var(--space-4)" }}>
            Página não encontrada
          </h1>
          <p className="body-lg" style={{ marginBottom: "var(--space-7)" }}>
            O link acessado não existe ou foi movido.
          </p>
          <div className="pd__actions">
            <Link to="/" className="btn btn--primary">
              Ir para a home
            </Link>
            <Link to="/projetos" className="btn btn--ghost">
              Ver projetos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
