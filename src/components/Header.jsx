import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const homeSections = [
  { id: 'case-file', label: 'Vụ việc' },
  { id: 'capital-journey', label: 'Hành trình vốn' },
  { id: 'crisis-lab', label: 'Khủng hoảng' },
];

const routeItems = [
  { path: '/simulators', label: 'Mô phỏng' },
  { path: '/knowledge', label: 'Lý luận' },
  { path: '/quiz', label: 'Kiểm tra' },
  { path: '/appendix', label: 'Nguồn & AI' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(homeSections[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const sectionElements = homeSections
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.2, 0.45, 0.7] },
    );

    sectionElements.forEach((element) => observer.observe(element));

    const updateProgress = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = totalScrollable <= 0 ? 0 : window.scrollY / totalScrollable;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, [location.pathname]);

  const routeLabel = useMemo(() => {
    const match = routeItems.find((item) => location.pathname.startsWith(item.path));
    return match?.label ?? '';
  }, [location.pathname]);

  const displayedProgress = location.pathname === '/' ? progress : 0;
  const displayedSection = location.pathname === '/' ? activeSection : '';

  const handleHomeSectionClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      <div className="site-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${displayedProgress})` }} />
      </div>

      <div className="container header-shell">
        <Link to="/" className="brand-lockup">
          <span className="brand-mark" />
          <div>
            <div className="eyebrow">Economic Forensics Lab</div>
            <strong>Alpha Corp Capital Cycle</strong>
          </div>
        </Link>

        <nav className="header-nav" aria-label="Điều hướng chính">
          {homeSections.map((item) => {
            const isActive = location.pathname === '/' && displayedSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => handleHomeSectionClick(item.id)}
              >
                {item.label}
              </button>
            );
          })}

          {routeItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link key={item.path} to={item.path} className={`nav-link ${isActive ? 'is-active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-status">
          <span className="status-dot" />
          <div>
            <div className="eyebrow">Theo dõi chương</div>
            <strong>{location.pathname === '/' ? homeSections.find((item) => item.id === displayedSection)?.label : routeLabel}</strong>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
