import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './LearnPages.css';

export function LearningRouteFrame({
  eyebrow,
  title,
  subtitle,
  actions = null,
  backTo = '/learn',
  backLabel = 'Về dashboard học tập',
  showBackLink = true,
  variant = 'default',
  children,
}) {
  return (
    <section className="learn-route section-padding">
      <div className="container">
        <div className={`learn-route-header ${variant === 'compact' ? 'is-compact' : ''}`}>
          <div className="learn-route-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="learn-route-actions">
            {actions}
            {showBackLink && (
              <Link to={backTo} className="btn btn-secondary learn-back-link">
                {backLabel}
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
