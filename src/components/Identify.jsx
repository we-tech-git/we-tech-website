import { useI18n } from "../i18n/I18nContext.jsx";
import WhyWeTech from "./WhyWeTech.jsx";

export default function Identify() {
  const { t } = useI18n();
  return (
    <WhyWeTech
      id="problemas"
      headingId="identify-title"
      eyebrow={t("identify.eyebrow")}
      title={t("identify.title")}
      lead={t("identify.lead")}
      bridge={{ label: t("identify.bridgeLabel"), text: t("identify.outro") }}
      items={t("identify.pains").map((pain, i) => ({
        category: String(i + 1).padStart(2, "0"),
        title: pain,
      }))}
    />
  );
}
