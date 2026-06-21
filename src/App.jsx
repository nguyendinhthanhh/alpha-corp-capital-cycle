import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/shared/PageLoader";
import LandingPage from "./pages/LandingPage";
import { prefersReducedMotion } from "./utils/motion";

const StoryMode = lazy(() => import("./pages/StoryMode"));
const Simulators = lazy(() => import("./pages/Simulators"));
const KnowledgeHub = lazy(() => import("./pages/KnowledgeHub"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Appendix = lazy(() => import("./pages/Appendix"));
const CapitalLabPage = lazy(() => import("./pages/CapitalLabPage"));

function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="story"
          element={
            <Suspense fallback={<PageLoader />}>
              <StoryMode />
            </Suspense>
          }
        />
        <Route
          path="capital-lab"
          element={
            <Suspense fallback={<PageLoader />}>
              <CapitalLabPage />
            </Suspense>
          }
        />
        <Route
          path="simulators"
          element={
            <Suspense fallback={<PageLoader />}>
              <Simulators />
            </Suspense>
          }
        />
        <Route
          path="knowledge"
          element={
            <Suspense fallback={<PageLoader />}>
              <KnowledgeHub />
            </Suspense>
          }
        />
        <Route
          path="quiz"
          element={
            <Suspense fallback={<PageLoader />}>
              <Quiz />
            </Suspense>
          }
        />
        <Route
          path="appendix"
          element={
            <Suspense fallback={<PageLoader />}>
              <Appendix />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
