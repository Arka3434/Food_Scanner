import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-space-sm">
        {/* 1. Dashboard / Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-14 h-14 transition-all ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span 
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                home
              </span>
              <span className="text-label-sm font-body">Home</span>
            </>
          )}
        </NavLink>

        {/* 2. Food Log */}
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-14 h-14 transition-all ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span 
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                edit_note
              </span>
              <span className="text-label-sm font-body">Log</span>
            </>
          )}
        </NavLink>

        {/* 3. Center Floating AI Scanner CTA */}
        <NavLink
          to="/scan"
          className="flex flex-col items-center justify-center -mt-5"
          title="Scan Food with AI"
        >
          {({ isActive }) => (
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-stitch-btn transition-transform hover:scale-105 ${
                isActive ? 'bg-primary-container text-on-primary ring-4 ring-primary-fixed/40' : 'bg-primary text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[28px]">
                qr_code_scanner
              </span>
            </div>
          )}
        </NavLink>

        {/* 4. Progress / Analytics */}
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-14 h-14 transition-all ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span 
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                monitoring
              </span>
              <span className="text-label-sm font-body">Progress</span>
            </>
          )}
        </NavLink>

        {/* 5. Profile & Goals */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-space-xs w-14 h-14 transition-all ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span 
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                person
              </span>
              <span className="text-label-sm font-body">Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
