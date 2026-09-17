import React from 'react';
import { MacroType } from '../../types';

interface MacroRowSelectorProps {
  selectedMacro: MacroType;
  onSelect: (macro: MacroType) => void;
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const MacroRowSelector: React.FC<MacroRowSelectorProps> = ({
  selectedMacro,
  onSelect,
  consumed,
  targets
}) => {
  const rows: { id: MacroType; label: string; current: number; total: number; unit: string }[] = [
    {
      id: 'CALORIES',
      label: 'CALORIES',
      current: consumed.calories,
      total: targets.calories,
      unit: 'kcal'
    },
    {
      id: 'PROTEIN',
      label: 'PROTEIN',
      current: consumed.protein,
      total: targets.protein,
      unit: 'g'
    },
    {
      id: 'CARBS',
      label: 'CARBS',
      current: consumed.carbs,
      total: targets.carbs,
      unit: 'g'
    },
    {
      id: 'FAT',
      label: 'FAT',
      current: consumed.fat,
      total: targets.fat,
      unit: 'g'
    }
  ];

  return (
    <div className="w-full max-w-[340px] mx-auto mt-1 bg-[#141613] rounded-2xl p-2 flex flex-col space-y-1 select-none border border-white/[0.02]">
      {rows.map((row, index) => {
        const isActive = selectedMacro === row.id;
        return (
          <React.Fragment key={row.id}>
            <button
              type="button"
              onClick={() => onSelect(row.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-mono ${
                isActive
                  ? 'text-[#C7F464] bg-[#1C2017] shadow-sm font-semibold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-[10px] tracking-[0.12em] uppercase">
                {row.label}
              </span>
              <span className="text-[13px] font-medium">
                {row.current.toLocaleString()} / {row.total.toLocaleString()}{row.unit}
              </span>
            </button>
            {index < rows.length - 1 && <div className="h-[1px] w-full bg-white/[0.04]"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
