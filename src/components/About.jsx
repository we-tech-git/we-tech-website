import { useI18n } from "../i18n/I18nContext.jsx";
import WhyWeTech from "./WhyWeTech.jsx";

export default function About() {
  const { t } = useI18n();
  return (
    <WhyWeTech
      id="sobre"
      headingId="about-title"
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      items={t("about.items").map((item, i) => ({
        category: String(i + 1).padStart(2, "0"),
        title: item.title,
        description: item.text,
      }))}
    />
  );
}
