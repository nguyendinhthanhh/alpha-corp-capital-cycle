import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import StoryMode from './pages/StoryMode';
import Simulators from './pages/Simulators';
import KnowledgeHub from './pages/KnowledgeHub';
import Quiz from './pages/Quiz';
import Appendix from './pages/Appendix';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="story" element={<StoryMode />} />
        <Route path="simulators" element={<Simulators />} />
        <Route path="knowledge" element={<KnowledgeHub />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="appendix" element={<Appendix />} />
      </Route>
    </Routes>
  );
}

export default App;
