import { useI18n } from "../i18n/I18nContext.jsx";
import WhyWeTech from "./WhyWeTech.jsx";

export default function Solutions() {
  const { t } = useI18n();
  return (
    <WhyWeTech
      id="solucoes"
      headingId="solutions-title"
      eyebrow={t("solutions.eyebrow")}
      title={t("solutions.title")}
      lead={t("solutions.lead")}
      bridge={{ label: t("principle.eyebrow"), text: `${t("principle.title")} ${t("principle.lead")}` }}
      items={t("solutions.items").map((item, i) => ({
        category: String(i + 1).padStart(2, "0"),
        title: item.title,
        description: item.text,
        tags: item.tags,
      }))}
    />
  );
}
