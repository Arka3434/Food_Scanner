import React from 'react';
import { MOCK_WEEK_LOG } from '../../data/mockData';

interface WeekDayStripProps {
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
}

export const WeekDayStrip: React.FC<WeekDayStripProps> = ({
  selectedDate = '2026-09-16',
  onSelectDate
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 overflow-x-auto gap-2 border-b border-white/[0.06] select-none">
      {MOCK_WEEK_LOG.map((item) => {
        const isSelected = item.date === selectedDate || item.isActive;
        return (
          <button
            key={item.date}
            type="button"
            onClick={() => onSelectDate && onSelectDate(item.date)}
            className={`flex flex-col items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all relative ${
              isSelected ? 'opacity-100' : 'opacity-40 hover:opacity-75'
            }`}
          >
            <span
              className={`text-xs font-medium font-headline ${
                isSelected ? 'text-[#34d399]' : 'text-white'
              }`}
            >
              {item.dayShort}
            </span>
            <span className="text-xs font-semibold font-mono text-white">
              {item.dayNum}
            </span>
            {isSelected && (
              <span className="absolute -bottom-1.5 size-1.5 rounded-full bg-[#34d399]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
