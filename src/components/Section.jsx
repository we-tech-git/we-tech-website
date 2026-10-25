import useReveal from "../hooks/useReveal.js";

// Shared building blocks for the home sections.

export function Reveal({ as: Tag = "div", variant = "standard", delay = 0, className = "", children, ...rest }) {
  const { ref, className: revealClass } = useReveal({ variant, delay });
  return (
    <Tag ref={ref} className={`${revealClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHeader({ id, eyebrow, title, lead, narrow = false }) {
  return (
    <Reveal className={`h-head${narrow ? " h-head--narrow" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className="h-title">
        {title}
      </h2>
      {lead && <p className="h-lead">{lead}</p>}
    </Reveal>
  );
}
