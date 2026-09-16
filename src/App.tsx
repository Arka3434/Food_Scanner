import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NutritionProvider } from './context/NutritionContext';
import { AppHeader } from './components/common/AppHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { DashboardPage } from './pages/DashboardPage';
import { ScannerPage } from './pages/ScannerPage';
import { FoodLogPage } from './pages/FoodLogPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <NutritionProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface flex flex-col text-on-surface">
          {/* Sticky Shared App Header */}
          <AppHeader />

          {/* Responsive Centered Shell Container */}
          <main className="flex-1 w-full max-w-2xl mx-auto px-space-lg pt-space-md pb-24">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/scan" element={<ScannerPage />} />
              <Route path="/log" element={<FoodLogPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Shared Persistent Mobile Bottom Navigation */}
          <BottomNavigation />
        </div>
      </BrowserRouter>
    </NutritionProvider>
  );
};

export default App;
