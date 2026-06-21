import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  { id: "quiz", label: "Kiểm tra", route: "/quiz" },
  { id: "appendix", label: "Nguồn & AI", route: "/appendix" },
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
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

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
      setIsScrolled(window.scrollY > 10);

      const totalScroll = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setProgress(Math.min(1, Math.max(0, scroll)));

      if (location.pathname === "/") {
        const probe = totalScroll + window.innerHeight * 0.35;
        const sections = homeSectionNavMap
          .map(({ id, nav }) => {
            const element = document.getElementById(id);
            return element ? { element, nav } : null;
          })
          .filter(Boolean)
          .sort((a, b) => a.element.offsetTop - b.element.offsetTop);

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

  const replaceHomeUrl = (sectionId) => {
    if (typeof window === "undefined" || location.pathname !== "/") {
      return;
    }

    const nextUrl = sectionId && sectionId !== "hero" ? `/#${sectionId}` : "/";
    window.history.replaceState(window.history.state, "", nextUrl);
  };

  const handleHomeSectionNavigation = (sectionId = "hero") => {
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
          className="header-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />

        <div className="container header-container">
          <Link to="/" className="brand-logo" onClick={handleBrandClick}>
            <span className="brand-name">AlphaCorp</span>
            <span className="brand-subtitle">Capital Cycle Study</span>
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`nav-item ${checkIsActive(item) ? "active" : ""}`}
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
