import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { AppTheme, AppAccent, AppFont } from '../../types';

interface AppearanceModalProps {
  onClose: () => void;
}

const ACCENT_OPTIONS: { label: string; color: AppAccent; previewHex: string }[] = [
  { label: 'Electric Lime', color: '#C7F464', previewHex: '#C7F464' },
  { label: 'Action Blue', color: '#4F8CFF', previewHex: '#4F8CFF' },
  { label: 'Violet Iris', color: '#A78BFA', previewHex: '#A78BFA' },
  { label: 'Emerald Mint', color: '#34D399', previewHex: '#34D399' },
  { label: 'Coral Peach', color: '#FF6B6B', previewHex: '#FF6B6B' }
];

const FONT_OPTIONS: { label: string; font: AppFont; description: string }[] = [
  { label: 'Geist', font: 'Geist', description: 'Stitch modern geometric sans' },
  { label: 'Inter', font: 'Inter', description: 'Neutral high-legibility UI sans' },
  { label: 'Outfit', font: 'Outfit', description: 'Curved contemporary editorial' },
  { label: 'Space Grotesk', font: 'Space Grotesk', description: 'Technical monospace vibe' }
];

export const AppearanceModal: React.FC<AppearanceModalProps> = ({ onClose }) => {
  const { appearance, updateAppearance } = useNutrition();

  const handleSelectTheme = (theme: AppTheme) => {
    updateAppearance({ theme });
  };

  const handleSelectAccent = (accent: AppAccent) => {
    updateAppearance({ accent });
  };

  const handleSelectFont = (font: AppFont) => {
    updateAppearance({ font });
    // Update font family dynamically
    document.body.style.fontFamily = `"${font}", sans-serif`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col justify-end p-4 select-none">
      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md mx-auto w-full max-h-[85vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4F8CFF] text-2xl">
              palette
            </span>
            <h3 className="font-headline font-bold text-white text-lg">
              Appearance Customization
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 1. Theme Selector */}
        <div className="flex flex-col mb-5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2">
            Theme Mode
          </span>
          <div className="grid grid-cols-3 gap-2 bg-[#121215] p-1.5 rounded-xl border border-white/5">
            {(['dark', 'light', 'auto'] as AppTheme[]).map((t) => {
              const isActive = appearance.theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleSelectTheme(t)}
                  className={`py-2 px-3 rounded-lg text-xs font-headline font-semibold capitalize flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#4F8CFF] text-white shadow-sm'
                      : 'text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {t === 'dark' ? 'dark_mode' : t === 'light' ? 'light_mode' : 'brightness_auto'}
                  </span>
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Accent Color Palette */}
        <div className="flex flex-col mb-5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2">
            Accent Color
          </span>
          <div className="grid grid-cols-5 gap-2 bg-[#121215] p-3 rounded-xl border border-white/5">
            {ACCENT_OPTIONS.map((opt) => {
              const isSelected = appearance.accent === opt.color;
              return (
                <button
                  key={opt.color}
                  type="button"
                  title={opt.label}
                  onClick={() => handleSelectAccent(opt.color)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                      isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121215] scale-105' : 'opacity-80 group-hover:opacity-100'
                    }`}
                    style={{ backgroundColor: opt.previewHex }}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-black text-sm font-bold">
                        check
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#a1a1aa] text-center truncate w-full">
                    {opt.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Typography / Text Style */}
        <div className="flex flex-col mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2">
            Typography Style
          </span>
          <div className="flex flex-col gap-2">
            {FONT_OPTIONS.map((opt) => {
              const isSelected = appearance.font === opt.font;
              return (
                <button
                  key={opt.font}
                  type="button"
                  onClick={() => handleSelectFont(opt.font)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#4F8CFF] bg-[#4F8CFF]/10 text-white'
                      : 'border-white/5 bg-[#121215] text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  <div>
                    <span
                      className="text-sm font-semibold block text-white"
                      style={{ fontFamily: `"${opt.font}", sans-serif` }}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-[#a1a1aa] font-mono">
                      {opt.description}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[#4F8CFF] text-lg">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Close CTA Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#4F8CFF] text-white font-headline font-semibold text-sm shadow-md active:scale-95 transition-transform"
        >
          Save &amp; Apply Appearance
        </button>
      </div>
    </div>
  );
};
