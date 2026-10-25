import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import Home from "./pages/Home.jsx";
import ProjectsGallery from "./pages/ProjectsGallery.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import NotFound from "./pages/NotFound.jsx";

function SkipLink() {
  const { t } = useI18n();
  return (
    <a className="skip-link" href="#main">
      {t("a11y.skipToContent")}
    </a>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<ProjectsGallery />} />
        <Route path="/projetos/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
