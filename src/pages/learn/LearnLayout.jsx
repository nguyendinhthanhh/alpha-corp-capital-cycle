import { NavLink, Outlet } from 'react-router-dom';
import { BookOpenCheck, Brain, CalendarClock, ChartSpline, LibraryBig, ShieldQuestion, Swords } from 'lucide-react';
import './LearnPages.css';

const items = [
  { to: '/learn', label: 'Dashboard', icon: ChartSpline, end: true },
  { to: '/learn/quiz', label: 'Adaptive Quiz', icon: ShieldQuestion },
  { to: '/learn/daily', label: 'Daily', icon: CalendarClock },
  { to: '/learn/review', label: 'Review', icon: BookOpenCheck },
  { to: '/learn/case-mission', label: 'Case Mission', icon: LibraryBig },
  { to: '/learn/debate', label: 'Debate', icon: Swords },
  { to: '/learn/progress', label: 'Progress', icon: Brain },
];

export default function LearnLayout() {
  return (
    <div className="learn-layout">
      <div className="container">
        <div className="learn-subnav">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `learn-subnav-item ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

