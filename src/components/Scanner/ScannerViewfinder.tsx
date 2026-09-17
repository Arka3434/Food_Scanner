import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutrition } from '../../context/NutritionContext';
import { MOCK_SCAN_RESULT } from '../../data/mockData';
import { FoodIngredientItem } from '../../types';

type ScannerStep = 'IDLE' | 'SCANNING' | 'RESULT' | 'USER_REVIEW' | 'CONFIRMATION';
type ScanMode = 'Barcode' | 'Meal' | 'Label';

const INITIAL_DETECTED_ITEMS: FoodIngredientItem[] = [
  {
    name: 'Atlantic Salmon',
    portion: '180 g',
    calories: 360,
    protein: 38,
    carbs: 0,
    fat: 22,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF6MMASsEDXY-1_6K1yym6Tycwad5lvUFpe-93NAgw1O9fmyD6F6nPuxwtjAhpWLtMaIF_Ryc0lcmQclukoHrR23WV8muFet-vcTeLqBdgiRTNuzepWr7VoCwuFHlN2a4sqtkKKNZSlARnR2_DOtsDJl650r3DRNw7AL2H7_DS5t4xrXoG9MKLk5vPyoYe0t2Kuz4xmnfqFkCbGmrFkNrQxJe5zKw-T_vbFwCAgFyHjxyPzFd-bIw'
  },
  {
    name: 'Sushi Rice',
    portion: '120 g',
    calories: 160,
    protein: 3,
    carbs: 35,
    fat: 0.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH6j3x1m0W2PBiV3Y7hZqG3uuc1PS7-BlCGWxtCr1wMm0pOCaJzVvP-kk6IpAcmrHQUngteNsKUJovVdSOFPhmqC8K9o0SGBtdncYVEtBjODfdbuhLGP-jOcvh3GcsPJnET3Qh2UjqCbeTJfIqEpz5eLZtWMZ_kCFH90TucGYTIyiEneCJitI7thJetblG0YWB-VpZMpKqUvX97XJG-V7fZOO5oXjfNUA5iPmh1zEa7HUo2F2TU8E'
  },
  {
    name: 'Avocado & Edamame',
    portion: '80 g',
    calories: 130,
    protein: 4,
    carbs: 6,
    fat: 10,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvVxysI1hkcDDyii0iJHS-mLSQ7uRiVNCuD0x6Q6r1AVdodM6s754WfLjsLWhneRa2RlV1D2T_WvRVkZiOwQSNmhOYAqOGCey8MSgmExuPrjoDSFCbR1xza-p2-FnWlhge_ubywfZ4FKQBFcsFqwk2plGZ3m8KhNG54pbD73h-WrTMQQWzm-L2NqXkQpkw_ozSJsEd0SnDaEIMV9F7Kb4znNdY-Zy6RcUjWh0sATG-dxjy1EF995o'
  }
];

export const ScannerViewfinder: React.FC = () => {
  const navigate = useNavigate();
  const { addMeal } = useNutrition();

  const [step, setStep] = useState<ScannerStep>('IDLE');
  const [mode, setMode] = useState<ScanMode>('Meal');
  const [flashOn, setFlashOn] = useState(false);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [items, setItems] = useState<FoodIngredientItem[]>(INITIAL_DETECTED_ITEMS);

  // MOCKED SCAN HANDLER (Ready to be wired to POST /api/v1/scans in future backend phase)
  const handleTriggerScan = () => {
    if (step === 'SCANNING') return;
    setStep('SCANNING');
    setTimeout(() => {
      setStep('RESULT');
    }, 700);
  };

  const handleAdjustPortion = (multiplier: number) => {
    setPortionMultiplier(multiplier);
    setItems(
      INITIAL_DETECTED_ITEMS.map((item) => ({
        ...item,
        calories: Math.round(item.calories * multiplier),
        protein: Math.round(item.protein * multiplier),
        carbs: Math.round(item.carbs * multiplier),
        fat: parseFloat((item.fat * multiplier).toFixed(1))
      }))
    );
  };

  // Recalculate totals from items
  const totalCalories = items.reduce((acc, it) => acc + it.calories, 0);
  const totalProtein = items.reduce((acc, it) => acc + it.protein, 0);
  const totalCarbs = items.reduce((acc, it) => acc + it.carbs, 0);
  const totalFat = parseFloat(items.reduce((acc, it) => acc + it.fat, 0).toFixed(1));

  const handleConfirmAndLog = () => {
    setStep('CONFIRMATION');

    addMeal({
      name: MOCK_SCAN_RESULT.name,
      category: 'lunch',
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      image: '/images/salmon-poke-bowl.jpg',
      items: items
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-[#0E0F0D] z-40 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Camera Viewfinder Image Simulation */}
      {/* High-visibility food plate without destructive blend modes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/salmon-poke-bowl.jpg"
          alt="Target Food Plate"
          className="w-full h-full object-cover object-center opacity-90 filter contrast-105"
        />
        {/* Soft dark vignette to ensure UI controls remain legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* 2. Top Toolbar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-12 pb-4">
        <button
          type="button"
          aria-label="Close scanner"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#121215]/75 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform border border-white/10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Status indicator pill */}
        <div className="px-4 py-1.5 rounded-full bg-[#121215]/80 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-lg">
          <span
            className={`w-2 h-2 rounded-full ${
              step === 'SCANNING' ? 'bg-[#4F8CFF] animate-ping' : 'bg-[#C7F464] animate-pulse'
            }`}
          ></span>
          <span className="text-xs font-headline font-medium tracking-wide text-white">
            {step === 'SCANNING'
              ? 'Analyzing plate...'
              : step === 'RESULT' || step === 'USER_REVIEW'
              ? 'Meal detected'
              : 'Hold steady'}
          </span>
        </div>

        <button
          type="button"
          aria-label="Toggle flash"
          onClick={() => setFlashOn(!flashOn)}
          className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform border border-white/10 ${
            flashOn ? 'bg-[#4F8CFF] text-white' : 'bg-[#121215]/75 text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">bolt</span>
        </button>
      </div>

      {/* 3. Center Focus Frame with Thin Lime Corner Brackets */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pointer-events-none">
        <div className="relative w-72 h-80 max-w-full">
          {/* 4 Corner Brackets (Data/Progress Lime #C7F464) */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C7F464] rounded-tl-sm"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C7F464] rounded-tr-sm"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C7F464] rounded-bl-sm"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C7F464] rounded-br-sm"></div>

          {/* Active scanning laser animation */}
          {step === 'SCANNING' && (
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4F8CFF] to-transparent animate-pulse shadow-[0_0_12px_#4F8CFF] top-1/2 -translate-y-1/2"></div>
          )}
        </div>

        <div className="mt-4 text-center pointer-events-auto">
          <span className="text-[11px] font-headline tracking-widest uppercase text-white/90 font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
            {step === 'SCANNING' ? 'Running visual model' : 'Align plate in frame'}
          </span>
        </div>
      </div>

      {/* 4. Bottom Controls Area */}
      <div className="relative z-20 pb-10 pt-4 px-6 flex flex-col items-center bg-gradient-to-t from-[#0E0F0D] via-[#0E0F0D]/90 to-transparent">
        {/* Mode Switcher */}
        <div className="flex items-center gap-8 mb-6">
          {(['Barcode', 'Meal', 'Label'] as ScanMode[]).map((m) => {
            const isActive = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`text-[11px] font-headline tracking-wider uppercase transition-colors relative py-1 ${
                  isActive ? 'text-[#4F8CFF] font-bold' : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                {m}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#4F8CFF] rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Shutter Controls */}
        <div className="w-full max-w-xs flex items-center justify-between px-4">
          {/* Gallery Icon */}
          <button
            type="button"
            aria-label="Upload from gallery"
            onClick={handleTriggerScan}
            className="w-12 h-12 rounded-full bg-[#121215]/80 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors active:scale-95 border border-white/10"
          >
            <span className="material-symbols-outlined text-[22px]">photo_library</span>
          </button>

          {/* Large Shutter Button (Action Blue #4F8CFF ring) */}
          <button
            type="button"
            aria-label="Take picture and scan"
            onClick={handleTriggerScan}
            disabled={step === 'SCANNING'}
            className="w-[72px] h-[72px] rounded-full bg-[#4F8CFF] flex items-center justify-center shadow-[0_8px_28px_rgba(79,140,255,0.45)] relative active:scale-95 transition-transform group"
          >
            <div className="w-[60px] h-[60px] rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-[48px] h-[48px] rounded-full bg-white shadow-inner group-hover:scale-95 transition-transform"></div>
            </div>
          </button>

          {/* Manual Input Icon */}
          <button
            type="button"
            aria-label="Manual search"
            onClick={() => navigate('/log#food-log')}
            className="w-12 h-12 rounded-full bg-[#121215]/80 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors active:scale-95 border border-white/10"
          >
            <span className="material-symbols-outlined text-[22px]">keyboard</span>
          </button>
        </div>
      </div>

      {/* 5. STATE: RESULT MODAL */}
      {step === 'RESULT' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col justify-end p-4 transition-all duration-300">
          <div className="bg-[#1A1C19] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 max-w-md mx-auto w-full">
            {/* Header with image */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/images/salmon-poke-bowl.jpg"
                  alt={MOCK_SCAN_RESULT.name}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h3 className="font-headline font-bold text-white text-lg leading-snug">
                    {MOCK_SCAN_RESULT.name}
                  </h3>
                  <p className="text-xs text-[#C7F464] font-medium flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Detected with {MOCK_SCAN_RESULT.confidence}% confidence
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep('IDLE')}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Macro Stats 4-Grid (Lime #C7F464 represents nutrition progress) */}
            <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-xl bg-[#121215] border border-white/5 text-center">
              <div>
                <span className="block text-[10px] text-[#a1a1aa] uppercase tracking-wider font-mono">
                  Calories
                </span>
                <span className="font-headline font-bold text-white text-base">
                  {totalCalories}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#a1a1aa] uppercase tracking-wider font-mono">
                  Protein
                </span>
                <span className="font-headline font-bold text-[#C7F464] text-base">
                  {totalProtein}g
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#a1a1aa] uppercase tracking-wider font-mono">
                  Carbs
                </span>
                <span className="font-headline font-bold text-white text-base">
                  {totalCarbs}g
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#a1a1aa] uppercase tracking-wider font-mono">
                  Fat
                </span>
                <span className="font-headline font-bold text-white text-base">
                  {totalFat}g
                </span>
              </div>
            </div>

            {/* Ingredients overview */}
            <div className="mb-5 px-1 text-xs text-white/70 font-mono">
              Includes: 180g Atlantic Salmon, 120g Sushi Rice, 80g Avocado &amp; Edamame
            </div>

            {/* CTAs (Blue #4F8CFF for User Action) */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleConfirmAndLog}
                className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white font-headline font-semibold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">check</span>
                Confirm &amp; Log to Lunch
              </button>
              <button
                type="button"
                onClick={() => setStep('USER_REVIEW')}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] text-white/80 hover:text-white font-headline font-medium text-xs border border-white/10 transition-colors"
              >
                Review &amp; Adjust Ingredients
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. STATE: USER REVIEW MODAL */}
      {step === 'USER_REVIEW' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col justify-end p-4 transition-all duration-300">
          <div className="bg-[#1A1C19] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md mx-auto w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-bold text-white text-lg">
                Review Meal Ingredients
              </h3>
              <button
                type="button"
                onClick={() => setStep('RESULT')}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Portion Quick Stepper */}
            <div className="mb-4 bg-[#121215] p-3 rounded-xl border border-white/5">
              <span className="block text-[11px] font-headline text-[#a1a1aa] uppercase tracking-wider mb-2 font-mono">
                Portion Scale
              </span>
              <div className="flex gap-2">
                {[0.75, 1.0, 1.25, 1.5].map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => handleAdjustPortion(mult)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      portionMultiplier === mult
                        ? 'bg-[#4F8CFF] text-white font-bold'
                        : 'bg-white/[0.05] text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>

            {/* Items list */}
            <div className="flex flex-col gap-2.5 mb-5">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-[#121215] rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || '/images/salmon-poke-bowl.jpg'}
                      alt={item.name}
                      className="size-9 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-sm font-medium text-white block">{item.name}</span>
                      <span className="text-xs text-[#a1a1aa] font-mono">{item.portion}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-semibold text-white block">{item.calories} kcal</span>
                    <span className="text-[11px] text-[#C7F464]">{item.protein}g P</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Bar */}
            <div className="flex items-center justify-between py-2 border-t border-white/10 mb-4 font-mono text-sm">
              <span className="text-[#a1a1aa]">Total Calculated:</span>
              <span className="text-white font-bold text-base">
                {totalCalories} kcal • {totalProtein}g Protein
              </span>
            </div>

            {/* Confirm CTA in Blue #4F8CFF */}
            <button
              type="button"
              onClick={handleConfirmAndLog}
              className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white font-headline font-semibold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check</span>
              Confirm &amp; Log ({totalCalories} kcal)
            </button>
          </div>
        </div>
      )}

      {/* 7. STATE: CONFIRMATION CELEBRATION */}
      {step === 'CONFIRMATION' && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-[#1A1C19] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl max-w-xs w-full">
            <div className="w-16 h-16 rounded-full bg-[#4F8CFF]/20 text-[#4F8CFF] flex items-center justify-center mb-4 animate-bounce">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-white mb-1">
              Meal Logged!
            </h3>
            <p className="text-sm text-white/70 font-mono mb-4">
              +{totalCalories} kcal added to Lunch
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C7F464] bg-[#C7F464]/10 px-3 py-1 rounded-full font-mono">
              <span>Syncing to Today's Dashboard...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
