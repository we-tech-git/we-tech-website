import { useI18n } from "../i18n/I18nContext.jsx";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import Identify from "../components/Identify.jsx";
import Solutions from "../components/Solutions.jsx";
import Process from "../components/Process.jsx";
import SelectedWork from "../components/SelectedWork.jsx";
import About from "../components/About.jsx";
import Audience from "../components/Audience.jsx";
import ClosingCta from "../components/ClosingCta.jsx";

export default function Home() {
  const { t } = useI18n();
  return (
    <main id="main" tabIndex={-1}>
      <Seo title={t("meta.homeTitle")} description={t("meta.homeDescription")} />
      <Hero />
      <Identify />
      <Solutions />
      <Process />
      <SelectedWork />
      <About />
      <Audience />
      <ClosingCta />
    </main>
  );
}
