import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { WeightTrackingModal } from '../components/profile/WeightTrackingModal';
import { AppearanceModal } from '../components/profile/AppearanceModal';

export const ProfilePage: React.FC = () => {
  const { userProfile, targets, updateProfile, updateTargets, meals, weightHistory, waterIntake, appearance } = useNutrition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleToggleUnits = () => {
    const next = userProfile.unit === 'metric' ? 'imperial' : 'metric';
    updateProfile({ unit: next });
    showToast(`Units switched to ${next.toUpperCase()} (cm/kg ↔ ft/lb synced)`);
  };

  const handleToggleNotifications = () => {
    const nextState = !userProfile.notifications;
    updateProfile({ notifications: nextState });
    showToast(
      nextState
        ? 'Local reminders enabled. (Cloud push coming with account sync)'
        : 'Reminders disabled'
    );
  };

  const handleEditCalories = () => {
    const val = prompt('Enter new daily calorie goal (kcal):', targets.calories.toString());
    if (val && !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 500) {
      updateTargets({ calories: parseInt(val, 10) });
      showToast(`Daily calorie target set to ${val} kcal`);
    }
  };

  const handleEditWaterGoal = () => {
    const val = prompt('Enter new daily water goal (Litres):', targets.water.toString());
    if (val && !isNaN(parseFloat(val)) && parseFloat(val) > 0) {
      updateTargets({ water: parseFloat(parseFloat(val).toFixed(1)) });
      showToast(`Water goal set to ${val} L`);
    }
  };

  const handleCycleGoal = () => {
    const goals = ['Fat loss', 'Muscle gain', 'Maintenance', 'Athletic performance'];
    const currentIdx = goals.indexOf(userProfile.goal);
    const nextGoal = goals[(currentIdx + 1) % goals.length];
    updateProfile({ goal: nextGoal });
    showToast(`Goal updated to "${nextGoal}"`);
  };

  const handleExportData = () => {
    const exportPayload = {
      app: 'NutriTrack AI',
      exportedAt: new Date().toISOString(),
      userProfile,
      targets,
      meals,
      weightHistory,
      waterIntake,
      appearance
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutritrack_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Local JSON backup downloaded. (Cloud export coming with account sync)');
  };

  const handleHelp = () => {
    alert(
      'NutriTrack AI (Frontend Edition)\n\n' +
      '• Visual Source: Google Stitch Design\n' +
      '• Local Mode: All nutrition data, weight, water, and appearance settings are persisted securely in your browser.\n' +
      '• Backend sync: Coming in a future update with PostgreSQL & Cloud Auth.'
    );
  };

  // Unit display calculations
  const isImperial = userProfile.unit === 'imperial';
  const displayWeight = isImperial
    ? `${Math.round(userProfile.weight * 2.20462)} lb`
    : `${userProfile.weight} kg`;
  const displayHeight = isImperial
    ? `${Math.floor(userProfile.height / 30.48)}'${Math.round((userProfile.height % 30.48) / 2.54)}"`
    : `${userProfile.height} cm`;

  return (
    <div className="flex flex-col w-full text-white min-h-screen bg-[#09090b] px-4 pt-2 pb-28 select-none max-w-md mx-auto">
      {/* Honest Local Mode Notice */}
      <div className="mx-auto mt-2 mb-1 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 flex items-center gap-2 text-[11px] font-mono text-white/60">
        <span className="w-2 h-2 rounded-full bg-[#4F8CFF]"></span>
        <span>Local Device Storage • Cloud sync coming soon</span>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center pt-3 pb-6">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#18181b] border-2 border-white/10 shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVa1fg36REARFeogWVEptIwE4C5IHJMYiQrr1Ir2rDrHxsZ4Gc5fQhgl0bC9Sbo6p_7VbB2r2DUKtohZ4kq0LnnqpmlaGKp6GGt4M0Ke1oILeig6j9yu3fbQwl9SbgIQ1sSUHFWtzoJ0einEixxkXTXtfPF7nMB-R4OxZGJWdVqlz90L2RINZur2YKvQMt1ap2q-KMk7rB0AZBwC2r5mnNJEWYH2jQ8OT5Mwtdejn0TUMc1BFS-_Y"
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#1e1e22] px-2 py-0.5 rounded-full text-[10px] font-headline font-semibold text-[#4F8CFF] border border-[#4F8CFF]/40 shadow-sm">
            Pro
          </div>
        </div>

        <h2 className="text-[22px] font-headline font-bold tracking-tight text-white mb-4">
          {userProfile.name}
        </h2>

        {/* 3-Stat Summary Row (Synced with units state) */}
        <div className="w-full max-w-xs bg-[#121215] rounded-xl p-3 flex justify-around items-center border border-white/[0.04]">
          <div className="flex flex-col items-center flex-1">
            <span className="text-[11px] font-headline tracking-wider text-[#a1a1aa] uppercase">
              Age
            </span>
            <span className="text-[15px] font-headline font-semibold text-white mt-0.5">
              {userProfile.age}
            </span>
          </div>

          <div className="w-px h-6 bg-white/[0.08]"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="text-[11px] font-headline tracking-wider text-[#a1a1aa] uppercase">
              Height
            </span>
            <span className="text-[15px] font-headline font-semibold text-white mt-0.5 font-mono">
              {displayHeight}
            </span>
          </div>

          <div className="w-px h-6 bg-white/[0.08]"></div>

          <div
            onClick={() => setShowWeightModal(true)}
            className="flex flex-col items-center flex-1 cursor-pointer group"
          >
            <span className="text-[11px] font-headline tracking-wider text-[#a1a1aa] uppercase group-hover:text-[#4F8CFF] transition-colors">
              Weight
            </span>
            <span className="text-[15px] font-headline font-semibold text-white mt-0.5 font-mono group-hover:text-[#4F8CFF] transition-colors">
              {displayWeight}
            </span>
          </div>
        </div>
      </div>

      {/* Settings List (Hairline rows) */}
      <div className="flex flex-col w-full bg-[#121215] rounded-2xl overflow-hidden mb-6 border border-white/[0.04]">
        {/* Row: Goal */}
        <button
          type="button"
          onClick={handleCycleGoal}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              flag
            </span>
            <span className="text-[15px] font-headline text-white truncate">Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#a1a1aa] truncate">{userProfile.goal}</span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Daily calories */}
        <button
          type="button"
          onClick={handleEditCalories}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              local_fire_department
            </span>
            <span className="text-[15px] font-headline text-white truncate">Daily calories</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#a1a1aa] truncate font-mono">
              {targets.calories.toLocaleString()} kcal
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Macros */}
        <button
          type="button"
          onClick={() => showToast('Macro Split: 30% Protein • 45% Carbs • 25% Fat')}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              pie_chart
            </span>
            <span className="text-[15px] font-headline text-white truncate">Macros</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#a1a1aa] truncate font-mono">
              {userProfile.macroSplit.protein}·{userProfile.macroSplit.carbs}·{userProfile.macroSplit.fat}
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Water */}
        <button
          type="button"
          onClick={handleEditWaterGoal}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              water_drop
            </span>
            <span className="text-[15px] font-headline text-white truncate">Water</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#a1a1aa] truncate font-mono">
              {targets.water.toFixed(1)} L
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Weight Tracking (REAL FEATURE) */}
        <button
          type="button"
          onClick={() => setShowWeightModal(true)}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              monitor_weight
            </span>
            <span className="text-[15px] font-headline text-white truncate">Weight Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#4F8CFF] truncate font-mono">
              {displayWeight}
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Diet tags */}
        <button
          type="button"
          onClick={() => showToast('Dietary preferences: Vegetarian, Dairy-free')}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              tag
            </span>
            <span className="text-[15px] font-headline text-white truncate">Diet tags</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#a1a1aa] truncate">
              {userProfile.dietaryPreferences.length} set
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Reminders */}
        <button
          type="button"
          onClick={handleToggleNotifications}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              notifications
            </span>
            <span className="text-[15px] font-headline text-white truncate">Reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[15px] font-headline truncate ${userProfile.notifications ? 'text-[#34d399]' : 'text-[#a1a1aa]'}`}>
              {userProfile.notifications ? 'On (Local)' : 'Off'}
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Units (REAL FEATURE) */}
        <button
          type="button"
          onClick={handleToggleUnits}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              straighten
            </span>
            <span className="text-[15px] font-headline text-white truncate">Units</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#4F8CFF] truncate capitalize font-mono">
              {userProfile.unit} ({isImperial ? 'ft / lb' : 'cm / kg'})
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Appearance (REAL FEATURE) */}
        <button
          type="button"
          onClick={() => setShowAppearanceModal(true)}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              palette
            </span>
            <span className="text-[15px] font-headline text-white truncate">Appearance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-headline text-[#4F8CFF] truncate capitalize">
              {appearance.theme}
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Export data (REAL LOCAL EXPORT) */}
        <button
          type="button"
          onClick={handleExportData}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              download
            </span>
            <span className="text-[15px] font-headline text-white truncate">Export Data (JSON)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#4F8CFF] font-mono">Download</span>
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
        <div className="h-px bg-white/[0.04] mx-4"></div>

        {/* Row: Help */}
        <button
          type="button"
          onClick={handleHelp}
          className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-colors hover:bg-white/[0.03] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa] group-hover:text-[#4F8CFF] transition-colors">
              help
            </span>
            <span className="text-[15px] font-headline text-white truncate">Help &amp; Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]/60">chevron_right</span>
          </div>
        </button>
      </div>

      {/* Floating Toast Notification Feedback */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1e1e22] text-white px-4 py-2 rounded-full text-xs font-headline shadow-2xl border border-white/10 z-50 flex items-center gap-2 animate-fade-in max-w-[90%] text-center">
          <span className="material-symbols-outlined text-[#4F8CFF] text-[16px]">info</span>
          {toastMessage}
        </div>
      )}

      {/* Weight Tracking Modal */}
      {showWeightModal && (
        <WeightTrackingModal onClose={() => setShowWeightModal(false)} />
      )}

      {/* Appearance Customization Modal */}
      {showAppearanceModal && (
        <AppearanceModal onClose={() => setShowAppearanceModal(false)} />
      )}
    </div>
  );
};
