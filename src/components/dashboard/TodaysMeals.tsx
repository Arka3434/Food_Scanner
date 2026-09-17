import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedMeal } from '../../types';

interface TodaysMealsProps {
  meals: LoggedMeal[];
}

export const TodaysMeals: React.FC<TodaysMealsProps> = ({ meals }) => {
  const navigate = useNavigate();

  const breakfastMeal = meals.find((m) => m.category === 'breakfast');
  const lunchMeal = meals.find((m) => m.category === 'lunch');
  const dinnerMeal = meals.find((m) => m.category === 'dinner');
  const snackMeal = meals.find((m) => m.category === 'snack');

  return (
    <div className="flex flex-col space-y-5 select-none">
      {/* BREAKFAST */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono tracking-[0.12em] font-semibold text-white/40 uppercase">
            BREAKFAST
          </span>
          <span className="text-[10px] font-mono tracking-[0.08em] text-white/40 font-semibold">
            {breakfastMeal ? `${breakfastMeal.calories} KCAL` : '0 KCAL'}
          </span>
        </div>
        <div className="flex flex-col rounded-2xl bg-[#141613] overflow-hidden border border-white/[0.02]">
          {breakfastMeal && breakfastMeal.items && breakfastMeal.items.length > 0 ? (
            breakfastMeal.items.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 rounded-xl object-cover bg-black/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#1F221D] flex items-center justify-center text-white/40">
                        <span className="material-symbols-outlined text-[20px]">restaurant</span>
                      </div>
                    )}
                    <span className="text-[15px] font-medium text-white/90">{item.name}</span>
                  </div>
                  <span className="text-[13px] font-mono text-white/40 pr-2">{item.calories} kcal</span>
                </div>
                {idx < breakfastMeal.items.length - 1 && <div className="h-[1px] w-full bg-white/[0.08]"></div>}
              </React.Fragment>
            ))
          ) : (
            <button
              onClick={() => navigate('/scan')}
              className="w-full h-14 rounded-2xl bg-[#141613]/50 flex items-center justify-center text-white/30 hover:text-[#4F8CFF] hover:bg-[#141613] transition-all group border border-dashed border-white/10 hover:border-[#4F8CFF]/40"
            >
              <span className="material-symbols-outlined text-[20px] font-extralight group-hover:scale-110 transition-transform">add</span>
            </button>
          )}
        </div>
      </div>

      {/* LUNCH (Clickable into Meal Detail) */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono tracking-[0.12em] font-semibold text-white/40 uppercase">
            LUNCH
          </span>
          <span className="text-[10px] font-mono tracking-[0.08em] text-white/40 font-semibold">
            {lunchMeal ? `${lunchMeal.calories} KCAL` : '0 KCAL'}
          </span>
        </div>
        <div className="flex flex-col rounded-2xl bg-[#141613] overflow-hidden border border-white/[0.02]">
          {lunchMeal ? (
            <div
              onClick={() => navigate(`/meal/${lunchMeal.id}`)}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={lunchMeal.image || '/images/salmon-poke-bowl.jpg'}
                  alt={lunchMeal.name}
                  className="w-11 h-11 rounded-xl object-cover bg-black/40"
                />
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-white/90">{lunchMeal.name}</span>
                  <span className="text-[11px] text-[#4F8CFF] font-medium">Tap for detail breakdown</span>
                </div>
              </div>
              <span className="text-[13px] font-mono text-white/40 pr-2">{lunchMeal.calories} kcal</span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/scan')}
              className="w-full h-14 rounded-2xl bg-[#141613]/50 flex items-center justify-center text-white/30 hover:text-[#4F8CFF] hover:bg-[#141613] transition-all group border border-dashed border-white/10 hover:border-[#4F8CFF]/40"
            >
              <span className="material-symbols-outlined text-[20px] font-extralight group-hover:scale-110 transition-transform">add</span>
            </button>
          )}
        </div>
      </div>

      {/* DINNER */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono tracking-[0.12em] font-semibold text-white/40 uppercase">
            DINNER
          </span>
          <span className="text-[10px] font-mono tracking-[0.08em] text-white/40 font-semibold">
            {dinnerMeal ? `${dinnerMeal.calories} KCAL` : '0 KCAL'}
          </span>
        </div>
        <div className="flex flex-col rounded-2xl bg-[#141613] overflow-hidden border border-white/[0.02]">
          {dinnerMeal ? (
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <img
                  src={dinnerMeal.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFS5WPydXzAZ1KeA6_3Gl1TKbxe8UWdmB32lMKPUhHFTX4o4gvavtoiuq5vWdcZjpwBDrWXcljNA8RywqqxTmaWXlti9ORguXZebhZ5JGDkiuBDUb2vzSDgmB5x_BUpt8LZCHdSym8OQ-W7JGRTzXk0WXevZW32NldDcdXbhJmIrOtgyd3S2JqL6ODfl6s_kocDgQ6QgyPhWr8ysXrQxchVCBDz0AsnS5p6QcjOAyOujotThclJ4w'}
                  alt={dinnerMeal.name}
                  className="w-11 h-11 rounded-xl object-cover bg-black/40"
                />
                <span className="text-[15px] font-medium text-white/90">{dinnerMeal.name}</span>
              </div>
              <span className="text-[13px] font-mono text-white/40 pr-2">{dinnerMeal.calories} kcal</span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/scan')}
              className="w-full h-14 rounded-2xl bg-[#141613]/50 flex items-center justify-center text-white/30 hover:text-[#4F8CFF] hover:bg-[#141613] transition-all group border border-dashed border-white/10 hover:border-[#4F8CFF]/40"
            >
              <span className="material-symbols-outlined text-[20px] font-extralight group-hover:scale-110 transition-transform">add</span>
            </button>
          )}
        </div>
      </div>

      {/* SNACK */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono tracking-[0.12em] font-semibold text-white/40 uppercase">
            SNACK
          </span>
          <span className="text-[10px] font-mono tracking-[0.08em] text-white/40 font-semibold">
            {snackMeal ? `${snackMeal.calories} KCAL` : '0 KCAL'}
          </span>
        </div>
        {snackMeal ? (
          <div className="flex flex-col rounded-2xl bg-[#141613] overflow-hidden border border-white/[0.02] p-2">
            <span className="text-[15px] font-medium text-white/90">{snackMeal.name}</span>
          </div>
        ) : (
          <button
            onClick={() => navigate('/scan')}
            className="w-full h-14 rounded-2xl bg-[#141613]/50 flex items-center justify-center text-white/30 hover:text-[#4F8CFF] hover:bg-[#141613] transition-all group border border-dashed border-white/10 hover:border-[#4F8CFF]/40"
          >
            <span className="material-symbols-outlined text-[20px] font-extralight group-hover:scale-110 transition-transform">add</span>
          </button>
        )}
      </div>
    </div>
  );
};
