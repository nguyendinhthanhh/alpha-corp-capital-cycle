import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../navigation/Header';
import Footer from './Footer';
import GlobalBackground from './GlobalBackground';
import { AIContextBridge } from '../ai/AIContextBridge';
import { AITutorDrawer } from '../ai/AITutorDrawer';
import { AITutorTrigger } from '../ai/AITutorTrigger';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.__appLenis) {
        window.__appLenis.stop();
        window.__appLenis.scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setTimeout(() => {
          if (window.__appLenis) window.__appLenis.start();
        }, 50);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <GlobalBackground />
      <AIContextBridge />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <AITutorTrigger />
      <AITutorDrawer />
    </div>
  );
};

export default Layout;
