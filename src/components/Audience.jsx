import { useI18n } from "../i18n/I18nContext.jsx";
import WhyWeTech from "./WhyWeTech.jsx";

export default function Audience() {
  const { t } = useI18n();
  return (
    <WhyWeTech
      id="para-quem"
      headingId="audience-title"
      eyebrow={t("audience.eyebrow")}
      title={t("audience.title")}
      lead={t("audience.lead")}
      bridge={{ label: t("audience.bridgeLabel"), text: t("audience.closing") }}
      footnote={t("audience.notFor")}
      items={t("audience.items").map((item, i) => ({
        category: String(i + 1).padStart(2, "0"),
        title: item.replace(/[;.]$/, ""),
      }))}
    />
  );
}
