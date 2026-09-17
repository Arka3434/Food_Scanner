import React from 'react';

/**
 * EXACT Visual Icons extracted directly from Google Stitch finalized frames.
 * Standardized across Dashboard, Food Log & Analytics, AI Scanner, and Profile screens.
 */

// 1. HOME / DASHBOARD: 2x2 rounded squares grid
export const DashboardNavIcon: React.FC<{ className?: string }> = ({ className = 'size-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

// 2. ANALYTICS: Ascending trendline with arrow over 4 bar chart columns and baseline
export const AnalyticsNavIcon: React.FC<{ className?: string }> = ({ className = 'size-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 20h18" />
    <path d="M5 16l4-5 4 3 6-8" />
    <path d="M19 6h-4" />
    <path d="M19 6v4" />
    <path d="M5 20v-2" />
    <path d="M9 20v-5" />
    <path d="M13 20v-4" />
    <path d="M17 20v-8" />
  </svg>
);

// 3. SCAN: Barcode scanner viewfinder (4 corners + 5 weighted barcode stripes)
export const ScanNavIcon: React.FC<{ className?: string }> = ({ className = 'size-7' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" strokeWidth="2.5" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" strokeWidth="2.5" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" strokeWidth="2.5" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" strokeWidth="2.5" />
    <path d="M7 7.5v9" strokeWidth="2.4" />
    <path d="M10 7.5v9" strokeWidth="1.8" />
    <path d="M12.5 7.5v9" strokeWidth="2.4" />
    <path d="M15 7.5v9" strokeWidth="1.4" />
    <path d="M17 7.5v9" strokeWidth="2.2" />
  </svg>
);

// 4. MEALS / FOOD: Crossed utensils (fork & knife crossed at angles)
export const MealsNavIcon: React.FC<{ className?: string }> = ({ className = 'size-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2v5a3 3 0 0 1-3 3h-1" />
    <path d="M14 10l7 12" />
    <path d="M18 22L9.5 9.5" />
    <path d="M7 2a3 3 0 0 0-3 3c0 2 1.5 3.5 3 4.5" />
    <path d="M4 22l6.5-6.5" />
  </svg>
);

// 5. PROFILE / SETTINGS: Precision cogwheel gear with central circle
export const SettingsNavIcon: React.FC<{ className?: string }> = ({ className = 'size-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
