import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useNutrition();
  const path = location.pathname;

  // Header is omitted on onboarding, scanner, meal detail, food log, and food management screens (which render their own specialized headers)
  if (
    path === '/splash' ||
    path.startsWith('/setup') ||
    path === '/scan' ||
    path.startsWith('/meal') ||
    path === '/log' ||
    path === '/foods' ||
    path.startsWith('/food-detail') ||
    path === '/add-manually'
  ) {
    return null;
  }

  const title = path === '/profile' ? 'Profile' : 'Dashboard';

  return (
    <header className="sticky top-0 inset-x-0 z-30 bg-[#09090b]/80 backdrop-blur-xl pt-safe border-b border-white/[0.04] max-w-md mx-auto w-full select-none">
      <div className="h-16 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-headline font-semibold tracking-[-0.02em] text-white">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {title === 'Dashboard' && (
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => alert('No new notifications')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#a1a1aa] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
          )}

          <button
            type="button"
            aria-label="User Profile"
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-[#C7F464] text-[#09090b] flex items-center justify-center ml-1 active:scale-95 transition-transform"
          >
            <span
              className="material-symbols-outlined text-[#09090b] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
