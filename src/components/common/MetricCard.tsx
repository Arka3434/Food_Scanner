import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  statusText?: string;
  statusType?: 'success' | 'neutral' | 'warning';
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  statusText,
  statusType = 'neutral',
  icon,
  iconBg = 'bg-primary-container/20',
  iconColor = 'text-primary'
}) => {
  const getStatusColor = () => {
    switch (statusType) {
      case 'success': return 'text-primary';
      case 'warning': return 'text-error';
      default: return 'text-outline';
    }
  };

  return (
    <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-stitch-card border border-surface-container-high/30">
      <div className="flex items-center justify-between">
        <span className="text-label-sm text-outline font-medium">{label}</span>
        {icon && (
          <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center ${iconColor}`}>
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
        )}
      </div>

      <div className="mt-space-md">
        <div className="text-headline-md font-headline font-bold text-on-surface">
          {value} {unit && <span className="text-body-sm font-normal text-outline">{unit}</span>}
        </div>

        {(subtext || statusText) && (
          <div className={`flex items-center gap-1 mt-1 text-label-sm ${getStatusColor()}`}>
            {statusType === 'success' && (
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
            )}
            <span>{statusText || subtext}</span>
          </div>
        )}
      </div>
    </div>
  );
};
