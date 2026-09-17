import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NutritionProvider, useNutrition } from './context/NutritionContext';
import { AppHeader } from './components/common/AppHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { SetupBodyMetrics } from './components/onboarding/SetupBodyMetrics';
import { SetupPreferences } from './components/onboarding/SetupPreferences';
import { DashboardPage } from './pages/DashboardPage';
import { FoodLogPage } from './pages/FoodLogPage';
import { ScannerPage } from './pages/ScannerPage';
import { MealDetailPage } from './pages/MealDetailPage';
import { ProfilePage } from './pages/ProfilePage';

// Root Entry Guard: Redirects to /dashboard if onboarded, else /splash
const RootRedirect: React.FC = () => {
  const { userProfile } = useNutrition();
  return userProfile.isOnboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/splash" replace />;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col items-center justify-start overflow-x-hidden">
      {/* Centered Mobile-First Shell (max-w-md on desktop) */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-[#09090b] shadow-2xl">
        {/* Contextual App Header */}
        <AppHeader />

        {/* Primary Screen Area */}
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/setup/metrics" element={<SetupBodyMetrics />} />
            <Route path="/setup/preferences" element={<SetupPreferences />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/log" element={<FoodLogPage />} />
            <Route path="/scan" element={<ScannerPage />} />
            <Route path="/meal/:mealId" element={<MealDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Catch-all redirect */}
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </main>

        {/* Persistent Floating Bottom Navigation Dock */}
        <BottomNavigation />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <NutritionProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </NutritionProvider>
  );
};

export default App;
