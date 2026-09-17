import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNutrition } from '../context/NutritionContext';
import { WeekDayStrip } from '../components/food-log/WeekDayStrip';
import { AnalyticsGrid } from '../components/food-log/AnalyticsGrid';
import { DailyIntakeChart } from '../components/food-log/DailyIntakeChart';

export const FoodLogPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meals, targets, consumed } = useNutrition();
  const [selectedDate, setSelectedDate] = useState('2026-09-16');

  // Handle automatic scrolling for #food-log or #analytics
  useEffect(() => {
    const hash = location.hash;
    if (hash === '#analytics') {
      const el = document.getElementById('analytics');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (hash === '#food-log') {
      const el = document.getElementById('food-log');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const breakfastMeal = meals.find((m) => m.category === 'breakfast');
  const lunchMeal = meals.find((m) => m.category === 'lunch');
  const dinnerMeal = meals.find((m) => m.category === 'dinner');
  const snackMeal = meals.find((m) => m.category === 'snack');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0E0F0D] text-[#fafafa] pb-28 select-none max-w-md mx-auto">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate('/dashboard')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-base font-semibold tracking-wide font-headline">
          Food Log &amp; Analytics
        </h1>
        <button
          type="button"
          aria-label="Select Date"
          onClick={() => alert('Calendar: Active week Sept 12 - Sept 18')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-white">calendar_today</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Horizontal Week Strip */}
        <WeekDayStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* SECTION 1: FOOD LOG (Target for #food-log) */}
        <section id="food-log" className="flex flex-col scroll-mt-4">
          {/* Day Total Section */}
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="text-[48px] font-bold tracking-tight leading-none text-white font-headline">
              {consumed.calories}
            </div>
            <div className="text-xs font-medium tracking-widest text-[#a1a1aa] uppercase mt-2 font-mono">
              OF {targets.calories.toLocaleString()} KCAL
            </div>
          </div>

          {/* Entries List */}
          <div className="flex flex-col px-4 gap-6 max-w-md mx-auto w-full">
            {/* Breakfast Group */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa] px-1 font-mono">
                <span>Breakfast</span>
                <span>{breakfastMeal ? `${breakfastMeal.calories} kcal` : '0 kcal'}</span>
              </div>

              {breakfastMeal && breakfastMeal.items && breakfastMeal.items.length > 0 ? (
                breakfastMeal.items.map((it, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/meal/${breakfastMeal.id}`)}
                    className="flex items-center justify-between py-2 px-1 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {it.image ? (
                        <img
                          src={it.image}
                          alt={it.name}
                          className="size-[36px] rounded-lg object-cover bg-[#18181b]"
                        />
                      ) : (
                        <div className="size-[36px] rounded-lg bg-[#18181b] flex items-center justify-center text-[#4F8CFF]">
                          <span className="material-symbols-outlined text-lg">restaurant</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-white">{it.name}</span>
                        <span className="text-[11px] text-[#a1a1aa] font-mono">{it.portion}</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#a1a1aa] font-mono">{it.calories} kcal</span>
                  </div>
                ))
              ) : breakfastMeal ? (
                <div
                  onClick={() => navigate(`/meal/${breakfastMeal.id}`)}
                  className="flex items-center justify-between py-2 px-1 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={breakfastMeal.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbwtD3qVjM-ie5wT88Wh2Y3ANuOcYagMniCwsLEDoR3HY5nYc-4x-zCNhVyHEe1iAX2Gix34RVv7V682HabnhKff2-TW4G82jxbCjFN_pt4awwPiBqtokDKOr7lbwLlorxNrIxPBKx3QmVrD6gcOdJQ3fKL7XEA4B0-XdBuBjzoYZ1NVuVH4w0EP8KKd_6NwUAsRJQU2badxgQzgW6OWNuSbG7S06LFO6zb7dfBgueNXJQ3OspIik'}
                      alt={breakfastMeal.name}
                      className="size-[36px] rounded-lg object-cover"
                    />
                    <span className="text-[15px] font-medium text-white">{breakfastMeal.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#a1a1aa] font-mono">{breakfastMeal.calories} kcal</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/scan')}
                  className="w-full h-12 border border-dashed border-[#4F8CFF]/30 hover:border-[#4F8CFF] rounded-xl flex items-center justify-center transition-colors group"
                >
                  <span className="material-symbols-outlined text-[#4F8CFF] text-sm">
                    add
                  </span>
                </button>
              )}
            </div>

            {/* Lunch Group */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa] px-1 font-mono">
                <span>Lunch</span>
                <span>{lunchMeal ? `${lunchMeal.calories} kcal` : '0 kcal'}</span>
              </div>
              {lunchMeal ? (
                <div
                  onClick={() => navigate(`/meal/${lunchMeal.id}`)}
                  className="flex items-center justify-between py-2 px-1 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lunchMeal.image || '/images/salmon-poke-bowl.jpg'}
                      alt={lunchMeal.name}
                      className="size-[36px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-[15px] font-medium text-white">{lunchMeal.name}</span>
                      <span className="text-[11px] text-[#4F8CFF]">View breakdown &amp; edit</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#a1a1aa] font-mono">{lunchMeal.calories} kcal</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/scan')}
                  className="w-full h-12 border border-dashed border-[#4F8CFF]/30 hover:border-[#4F8CFF] rounded-xl flex items-center justify-center transition-colors group"
                >
                  <span className="material-symbols-outlined text-[#4F8CFF] text-sm">
                    add
                  </span>
                </button>
              )}
            </div>

            {/* Dinner Group */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa] px-1 font-mono">
                <span>Dinner</span>
                <span>{dinnerMeal ? `${dinnerMeal.calories} kcal` : '0 kcal'}</span>
              </div>
              {dinnerMeal ? (
                <div
                  onClick={() => navigate(`/meal/${dinnerMeal.id}`)}
                  className="flex items-center justify-between py-2 px-1 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dinnerMeal.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFS5WPydXzAZ1KeA6_3Gl1TKbxe8UWdmB32lMKPUhHFTX4o4gvavtoiuq5vWdcZjpwBDrWXcljNA8RywqqxTmaWXlti9ORguXZebhZ5JGDkiuBDUb2vzSDgmB5x_BUpt8LZCHdSym8OQ-W7JGRTzXk0WXevZW32NldDcdXbhJmIrOtgyd3S2JqL6ODfl6s_kocDgQ6QgyPhWr8ysXrQxchVCBDz0AsnS5p6QcjOAyOujotThclJ4w'}
                      alt={dinnerMeal.name}
                      className="size-[36px] rounded-lg object-cover"
                    />
                    <span className="text-[15px] font-medium text-white">{dinnerMeal.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#a1a1aa] font-mono">{dinnerMeal.calories} kcal</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/scan')}
                  className="w-full h-12 border border-dashed border-[#4F8CFF]/30 hover:border-[#4F8CFF] rounded-xl flex items-center justify-center transition-colors group"
                >
                  <span className="material-symbols-outlined text-[#4F8CFF] text-sm">
                    add
                  </span>
                </button>
              )}
            </div>

            {/* Snacks Group */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#a1a1aa] px-1 font-mono">
                <span>Snacks</span>
                <span>{snackMeal ? `${snackMeal.calories} kcal` : '0 kcal'}</span>
              </div>
              {snackMeal ? (
                <div
                  onClick={() => navigate(`/meal/${snackMeal.id}`)}
                  className="flex items-center justify-between py-2 px-1 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
                >
                  <span className="text-[15px] font-medium text-white">{snackMeal.name}</span>
                  <span className="text-sm font-medium text-[#a1a1aa] font-mono">{snackMeal.calories} kcal</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/scan')}
                  className="w-full h-12 border border-dashed border-[#4F8CFF]/30 hover:border-[#4F8CFF] rounded-xl flex items-center justify-center transition-colors group"
                >
                  <span className="material-symbols-outlined text-[#4F8CFF] text-sm">
                    add
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full max-w-md mx-auto px-4 my-8">
          <div className="border-t border-white/[0.08]"></div>
        </div>

        {/* SECTION 2: DAILY INTAKE (Must come before Analytics) */}
        <section className="flex flex-col w-full max-w-md mx-auto px-4 mb-6">
          <DailyIntakeChart />
        </section>

        {/* SECTION 3: ANALYTICS (Target for #analytics) */}
        <section id="analytics" className="flex flex-col w-full max-w-md mx-auto px-4 scroll-mt-6">
          <AnalyticsGrid />
        </section>
      </main>
    </div>
  );
};
