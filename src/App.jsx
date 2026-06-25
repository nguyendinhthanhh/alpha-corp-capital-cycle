import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Lenis from "lenis";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/shared/PageLoader";
import LandingPage from "./pages/LandingPage";
import { prefersReducedMotion } from "./utils/motion";

const StoryMode = lazy(() => import("./pages/StoryMode"));
const Simulators = lazy(() => import("./pages/Simulators"));
const CapitalLabPage = lazy(() => import("./pages/CapitalLabPage"));
const LearnLayout = lazy(() => import("./pages/learn/LearnLayout"));
const LearnDashboard = lazy(() => import("./pages/learn/LearnDashboard"));
const LearnQuiz = lazy(() => import("./pages/learn/LearnQuiz"));
const LearnDaily = lazy(() => import("./pages/learn/LearnDaily"));
const LearnReview = lazy(() => import("./pages/learn/LearnReview"));
const LearnProgress = lazy(() => import("./pages/learn/LearnProgress"));
const LearnDebate = lazy(() => import("./pages/learn/LearnDebate"));
const LearnCaseMission = lazy(() => import("./pages/learn/LearnCaseMission"));
const QuizReview = lazy(() => import("./pages/dev/QuizReview"));

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
    window.__appLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (window.__appLenis === lenis) {
        delete window.__appLenis;
      }
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
          path="quiz"
          element={
            <Suspense fallback={<PageLoader />}>
              <Navigate to="/learn/quiz" replace />
            </Suspense>
          }
        />
        <Route
          path="learn"
          element={
            <Suspense fallback={<PageLoader />}>
              <LearnLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnDashboard />
              </Suspense>
            }
          />
          <Route
            path="quiz"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnQuiz />
              </Suspense>
            }
          />
          <Route
            path="daily"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnDaily />
              </Suspense>
            }
          />
          <Route
            path="review"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnReview />
              </Suspense>
            }
          />
          <Route
            path="progress"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnProgress />
              </Suspense>
            }
          />
          <Route
            path="debate"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnDebate />
              </Suspense>
            }
          />
          <Route
            path="case-mission"
            element={
              <Suspense fallback={<PageLoader />}>
                <LearnCaseMission />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="quiz-review"
          element={
            <Suspense fallback={<PageLoader />}>
              <QuizReview />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
