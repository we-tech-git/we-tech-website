import useReveal from "../hooks/useReveal.js";

/* ---------------------------------------------------------------
   WE TECH HUB — EDITORIAL LIST SECTION (formerly "Why We Tech")
   Left column: sticky narrative (eyebrow, heading, lead, bridge).
   Right column: editorial list of items with hairline separators.
   Reused by the problem, solutions, about and audience sections so
   they all share the same visual language.
   --------------------------------------------------------------- */

function ListItem({ item, index }) {
  const itemReveal = useReveal({ variant: "standard", threshold: 0.15, delay: index * 40 });

  return (
    <li ref={itemReveal.ref} className={`why-principle-item ${itemReveal.className}`}>
      <div className="why-principle-header">
        <div className="why-principle-meta">
          <span className="why-principle-cat">{item.category}</span>
        </div>
      </div>

      <div className="why-principle-body">
        <h3 className="why-principle-title">{item.title}</h3>
        {item.description && <p className="why-principle-desc">{item.description}</p>}
        {item.tags && (
          <ul className="why-principle-tags" aria-label={item.title}>
            {item.tags.map((tag) => (
              <li key={tag} className="protocol-deliverable-chip">
                <span>{item.tagPrefix}{tag}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function WhyWeTech({
  id,
  headingId,
  eyebrow,
  title,
  highlight,
  lead,
  bridge,
  items,
  footnote,
}) {
  const introReveal = useReveal({ variant: "standard" });

  return (
    <section id={id} className="section why-section" aria-labelledby={headingId}>
      <div className="container">
        <div className="why-grid">
          <div ref={introReveal.ref} className={`${introReveal.className} why-sticky-col`}>
            <div className="why-eyebrow-wrap">
              <span className="eyebrow">{eyebrow}</span>
            </div>

            <h2 id={headingId} className="heading-lg why-heading">
              {title}
              {highlight && <span className="why-heading-highlight"> {highlight}</span>}
            </h2>

            {lead && <p className="body-base why-lead">{lead}</p>}

            {bridge && (
              <div className="why-bridge">
                <span className="why-bridge-label">{bridge.label}</span>
                <p className="why-bridge-text">{bridge.text}</p>
              </div>
            )}
          </div>

          <div className="why-principles-col">
            <ol className="why-principles-list" role="list">
              {items.map((item, idx) => (
                <ListItem key={item.title} item={item} index={idx} />
              ))}
            </ol>
            {footnote && <p className="why-footnote">{footnote}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
