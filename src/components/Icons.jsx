/**
 * High-Tech Studio Precision Micro-Components
 * Replaces repetitive raw unicode text arrows with bespoke, engineered SVG indicators.
 */

// Primary CTA action indicator (sleek vector arrow inside micro-surface)
export function ActionIcon({ className = "" }) {
  return (
    <span className={`btn-action-icon ${className}`.trim()} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.5 7h9M7.5 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Project exploration indicator (diagonal vector arrow inside micro-badge)
export function ExploreIcon({ className = "" }) {
  return (
    <span className={`project-explore-icon ${className}`.trim()} aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Section bridge flow beacon (vertical downward vector)
export function BridgeFlowIcon({ className = "" }) {
  return (
    <span className={`strata-bridge-indicator ${className}`.trim()} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 1.5v8.5M2.5 6.5L6 10l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Engagement model fronts action badge (status pill with vector arrow)
export function FrontsActionBadge({ className = "" }) {
  return (
    <span className={`fronts-cta-badge ${className}`.trim()} aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8M6 2l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Step forward indicator (for process sequence)
export function StepArrowIcon({ className = "" }) {
  return (
    <span className={`step-arrow-icon ${className}`.trim()} aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8M6 2l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
