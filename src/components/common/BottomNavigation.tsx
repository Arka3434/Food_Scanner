import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardNavIcon,
  AnalyticsNavIcon,
  ScanNavIcon,
  MealsNavIcon,
  SettingsNavIcon
} from './BottomNavIcons';

export * from './BottomNavIcons';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const hash = location.hash;

  // Do NOT render on onboarding, scanner, or meal detail routes
  if (
    path === '/splash' ||
    path.startsWith('/setup') ||
    path === '/scan' ||
    path.startsWith('/meal')
  ) {
    return null;
  }

  const isDashboard = path === '/dashboard' || path === '/';
  const isAnalytics = path === '/log';
  const isMeals = path === '/foods' || path.startsWith('/food-detail') || path === '/add-manually';
  const isProfile = path === '/profile';

  const handleNavigateToAnalytics = () => {
    if (path === '/log') {
      window.location.hash = '#analytics';
      const el = document.getElementById('analytics');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/log#analytics');
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none pb-safe select-none">
      <div className="px-4 pb-4">
        <nav className="pointer-events-auto relative max-w-[358px] mx-auto h-[64px] rounded-full bg-[#121215]/95 backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex items-center justify-between px-2.5 border border-white/[0.06]">
          {/* 1. HOME / DASHBOARD -> /dashboard */}
          <button
            type="button"
            aria-label="Dashboard"
            onClick={() => navigate('/dashboard')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-150 relative ${
              isDashboard ? 'text-[#4F8CFF]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <DashboardNavIcon className="size-6 transition-transform duration-150 active:scale-95" />
            {isDashboard && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]"></span>
            )}
            <span className="sr-only">Dashboard</span>
          </button>

          {/* 2. ANALYTICS -> /log#analytics */}
          <button
            type="button"
            aria-label="Analytics"
            onClick={handleNavigateToAnalytics}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-150 relative ${
              isAnalytics ? 'text-[#4F8CFF]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <AnalyticsNavIcon className="size-6 transition-transform duration-150 active:scale-95" />
            {isAnalytics && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]"></span>
            )}
            <span className="sr-only">Analytics</span>
          </button>

          {/* 3. SCAN (Special elevated central Scan button with blue action color) -> /scan */}
          <div className="relative flex items-center justify-center w-14">
            <button
              type="button"
              aria-label="Scan Barcode"
              onClick={() => navigate('/scan')}
              className="absolute -top-7 size-14 rounded-full bg-[#4F8CFF] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(79,140,255,0.45)] active:scale-95 hover:scale-105 transition-all ring-4 ring-[#09090b]/50 border-2 border-[#121215]"
            >
              <ScanNavIcon className="size-7" />
              <span className="sr-only">Scan Barcode</span>
            </button>
          </div>

          {/* 4. MEALS / FOOD ITEMS -> /foods */}
          <button
            type="button"
            aria-label="Meals"
            onClick={() => navigate('/foods')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-150 relative ${
              isMeals ? 'text-[#4F8CFF]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <MealsNavIcon className="size-6 transition-transform duration-150 active:scale-95" />
            {isMeals && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]"></span>
            )}
            <span className="sr-only">Meals</span>
          </button>

          {/* 5. PROFILE / SETTINGS -> /profile */}
          <button
            type="button"
            aria-label="Settings"
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-150 relative ${
              isProfile ? 'text-[#4F8CFF]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <SettingsNavIcon className="size-6 transition-transform duration-150 active:scale-95" />
            {isProfile && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]"></span>
            )}
            <span className="sr-only">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
