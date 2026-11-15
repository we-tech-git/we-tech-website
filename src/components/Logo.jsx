// Símbolo "wt" da marca We Tech (Figma "We Tech" → Marca → Símbolo).
// O "w" fica sempre no laranja da marca; o "t" segue a cor do texto do tema
// (claro no tema escuro, tinta no tema claro), como as versões "fundo escuro"
// e "fundo claro" do Figma. Abaixo de 32px usa o traço mais grosso ("Pequeno").
export default function Logo({ size = 24 }) {
  const stroke = size < 32 ? 14 : 11;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 34L21 76L35 44L49 76L62 34H92"
        stroke="#F0602A"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M77 16V64C77 73.3333 81.6667 78 91 78"
        stroke="var(--text-primary, #F2F1EC)"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}
