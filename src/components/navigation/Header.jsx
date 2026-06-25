import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  PENDING_HOME_SECTION_STORAGE_KEY,
  scrollToPageTop,
  scrollToSectionById,
} from "../../utils/motion";
import "./Header.css";

const navItems = [
  { id: "hero", label: "Tổng quan", route: "/", sectionId: "hero" },
  { id: "crisis", label: "Điểm đứt gãy", route: "/", sectionId: "crisis" },
  {
    id: "capital-journey",
    label: "Hành trình vốn",
    route: "/",
    sectionId: "capital-journey",
  },
  { id: "capital-lab", label: "Capital Lab", route: "/capital-lab" },
  { id: "simulators", label: "Mô phỏng", route: "/simulators" },
  { id: "learn", label: "Học tập", route: "/learn" },
];

const homeSectionNavMap = [
  { id: "hero", nav: "hero" },
  { id: "capital-journey", nav: "capital-journey" },
  { id: "crisis", nav: "crisis" },
  { id: "three-forms", nav: "crisis" },
  { id: "conditions", nav: "crisis" },
  { id: "turnover", nav: "crisis" },
  { id: "impact", nav: "crisis" },
  { id: "accumulation", nav: "crisis" },
  { id: "profit", nav: "crisis" },
  { id: "faq", nav: "crisis" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const isScrolledRef = useRef(false);
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 10;
      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      const totalScroll = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, scroll))})`;
      }

      if (location.pathname === "/") {
        const probe = totalScroll + window.innerHeight * 0.35;
        const sections = homeSectionNavMap
          .map(({ id, nav }) => {
            const element = document.getElementById(id);
            return element ? { element, nav } : null;
          })
          .filter(Boolean)
          .sort((a, b) => a.element.offsetTop - b.element.offsetTop);

        if (isManualScrolling.current) {
          return;
        }

        let nextActive = "hero";
        sections.forEach(({ element, nav }) => {
          if (probe >= element.offsetTop - 24) {
            nextActive = nav;
          }
        });

        setActiveSection((current) =>
          current === nextActive ? current : nextActive,
        );
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Update absolute indicator position
  useEffect(() => {
    // Small delay to ensure DOM is updated before measuring
    const timeout = setTimeout(() => {
      const activeBtn = navRef.current?.querySelector(".nav-item.active");
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1,
        });
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [location.pathname, activeSection]);

  const replaceHomeUrl = (sectionId) => {
    if (typeof window === "undefined" || location.pathname !== "/") {
      return;
    }

    const nextUrl = sectionId && sectionId !== "hero" ? `/#${sectionId}` : "/";
    window.history.replaceState(window.history.state, "", nextUrl);
  };

  const handleHomeSectionNavigation = (sectionId = "hero") => {
    setActiveSection(sectionId);
    isManualScrolling.current = true;
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    if (location.pathname !== "/") {
      window.sessionStorage.setItem(
        PENDING_HOME_SECTION_STORAGE_KEY,
        sectionId,
      );
      navigate(sectionId === "hero" ? "/" : `/#${sectionId}`);
      return;
    }

    if (sectionId === "hero") {
      scrollToPageTop();
    } else {
      scrollToSectionById(sectionId);
    }

    replaceHomeUrl(sectionId);
  };

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);

    if (item.route === "/" && item.sectionId) {
      handleHomeSectionNavigation(item.sectionId);
      return;
    }

    navigate(item.route);
  };

  const handleBrandClick = (event) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    handleHomeSectionNavigation("hero");
  };

  const checkIsActive = (item) => {
    if (item.route === "/" && item.sectionId) {
      return location.pathname === "/" && activeSection === item.sectionId;
    }

    return location.pathname.startsWith(item.route);
  };

  return (
    <>
      <header className={`app-header ${isScrolled ? "scrolled" : ""}`}>
        <div
          ref={progressRef}
          className="header-progress-bar"
          style={{ transform: `scaleX(0)` }}
        />

        <div className="container header-container">
          <Link to="/" className="brand-logo" onClick={handleBrandClick}>
            <span className="brand-name">AlphaCorp</span>
            <span className="brand-subtitle">Capital Cycle Study</span>
          </Link>

          <nav className="desktop-nav" ref={navRef} style={{ position: 'relative' }}>
            <motion.div
              className="nav-active-indicator"
              animate={indicatorStyle}
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              style={{ top: '0.15rem', bottom: '0.15rem', zIndex: 0 }}
            />
            {navItems.map((item) => {
              const isActive = checkIsActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} style={{ pointerEvents: "none" }} />
            ) : (
              <Menu size={24} style={{ pointerEvents: "none" }} />
            )}
          </button>
        </div>
      </header>

      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`mobile-nav-item ${checkIsActive(item) ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
