import { Outlet } from 'react-router-dom';
import Header from '../navigation/Header';
import Footer from './Footer';
import GlobalBackground from './GlobalBackground';
import { AIContextBridge } from '../ai/AIContextBridge';
import { AITutorDrawer } from '../ai/AITutorDrawer';
import { AITutorTrigger } from '../ai/AITutorTrigger';

const Layout = () => {
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
