import Hero from "../components/Hero.jsx";
import SelectedWork from "../components/SelectedWork.jsx";
import Capabilities from "../components/Capabilities.jsx";
import Process from "../components/Process.jsx";
import WhyWeTech from "../components/WhyWeTech.jsx";
import ClosingCta from "../components/ClosingCta.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <Capabilities />
      <Process />
      <WhyWeTech />
      <ClosingCta />
    </main>
  );
}
