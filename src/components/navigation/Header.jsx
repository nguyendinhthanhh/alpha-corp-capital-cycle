import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSectionById } from '../../utils/motion';
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

const homeSectionNavMap = [
  { id: 'hero', nav: 'hero' },
  { id: 'capital-journey', nav: 'capital-journey' },
  { id: 'crisis', nav: 'crisis' },
  { id: 'three-forms', nav: 'crisis' },
  { id: 'conditions', nav: 'crisis' },
  { id: 'turnover', nav: 'crisis' },
  { id: 'impact', nav: 'crisis' },
  { id: 'accumulation', nav: 'crisis' },
  { id: 'profit', nav: 'crisis' },
  { id: 'faq', nav: 'crisis' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setProgress(Math.min(1, Math.max(0, scroll)));

      if (location.pathname === '/') {
        const probe = totalScroll + window.innerHeight * 0.35;
        const sections = homeSectionNavMap
          .map(({ id, nav }) => {
            const element = document.getElementById(id);
            return element ? { element, nav } : null;
          })
          .filter(Boolean)
          .sort((a, b) => a.element.offsetTop - b.element.offsetTop);

        let nextActive = 'hero';
        sections.forEach(({ element, nav }) => {
          if (probe >= element.offsetTop - 24) {
            nextActive = nav;
          }
        });

        setActiveSection((current) => (current === nextActive ? current : nextActive));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);

    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(path);
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        scrollToSectionById(id);
      }
      return;
    }

    navigate(path);
  };

  const checkIsActive = (path) => {
    if (path === '/' || path === '/#hero') {
      return location.pathname === '/' && activeSection === 'hero';
    }

    if (path.startsWith('/#')) {
      return location.pathname === '/' && activeSection === path.replace('/#', '');
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

      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />}
    </>
  );
};

export default Header;
