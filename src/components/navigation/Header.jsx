import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const navItems = [
  { id: 'overview', label: 'Tổng quan', path: '/' },
  { id: 'capital-journey', label: 'Hành trình vốn', path: '/#capital-journey' },
  { id: 'crisis', label: 'Điểm đứt gãy', path: '/#crisis' },
  { id: 'simulators', label: 'Mô phỏng', path: '/simulators' },
  { id: 'knowledge', label: 'Lý luận', path: '/knowledge' },
  { id: 'quiz', label: 'Kiểm tra', path: '/quiz' },
  { id: 'appendix', label: 'Nguồn & AI', path: '/appendix' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Calculate progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setProgress(totalScroll === 0 ? 0 : Number(scroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(path);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };

  const checkIsActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.replace('/', '');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-progress-bar" style={{ transform: `scaleX(${progress})` }} />
        
        <div className="container header-container">
          <Link to="/" className="brand-logo">
            <span className="brand-name">AlphaCorp</span>
            <span className="brand-subtitle">Capital Cycle Study</span>
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`nav-item ${checkIsActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`mobile-nav-item ${checkIsActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;
