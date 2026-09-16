import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useNutrition();

  const getHeaderInfo = () => {
    switch (location.pathname) {
      case '/scan':
        return { subtitle: 'Live AI Vision', title: 'Food Scanner' };
      case '/log':
        return { subtitle: 'Daily Intake', title: 'Food Log & Search' };
      case '/progress':
        return { subtitle: 'Analytics', title: 'Progress & Trends' };
      case '/profile':
        return { subtitle: 'Settings', title: 'Profile & Goals' };
      case '/':
      default:
        return { subtitle: 'Daily Overview', title: `Hello, ${userProfile.name.split(' ')[0]}` };
    }
  };

  const { subtitle, title } = getHeaderInfo();

  return (
    <header className="sticky top-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high/60 px-space-lg py-space-sm pt-safe shadow-sm">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex flex-col">
          <span className="text-body-sm text-outline font-medium tracking-wide uppercase">
            {subtitle}
          </span>
          <h1 className="text-headline-sm font-headline text-on-surface font-bold leading-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-space-sm">
          <button 
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-sm shadow-sm hover:bg-primary-container transition-colors"
            title="View Profile"
          >
            {userProfile.name.charAt(0)}
          </button>
        </div>
      </div>
    </header>
  );
};
