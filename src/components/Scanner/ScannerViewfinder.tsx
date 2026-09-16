import React from 'react';
import { DetectedBoundingBox } from '../../types';

interface ScannerViewfinderProps {
  imageSrc: string;
  isScanning: boolean;
  detectedCount: number;
  mealTitle: string;
  boundingBoxes: DetectedBoundingBox[];
  onRescan: () => void;
  onToggleUpload: () => void;
}

export const ScannerViewfinder: React.FC<ScannerViewfinderProps> = ({
  imageSrc,
  isScanning,
  detectedCount,
  mealTitle,
  boundingBoxes,
  onRescan,
  onToggleUpload
}) => {
  return (
    <div className="relative w-full h-[360px] sm:h-[380px] rounded-2xl overflow-hidden bg-inverse-surface shadow-stitch-card">
      {/* Background Food Image */}
      <img
        src={imageSrc}
        alt={mealTitle}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Scrim for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/85 via-transparent to-on-secondary-fixed/45 pointer-events-none" />

      {/* Scanning Pulse Laser Line (CSS Animation) */}
      <div className="absolute inset-x-0 h-0.5 bg-secondary-fixed shadow-[0_0_14px_#6ffbbe] animate-[scan_2.4s_ease-in-out_infinite] z-20" />

      {/* AI Bounding Boxes */}
      {!isScanning &&
        boundingBoxes.map((box, idx) => (
          <div
            key={idx}
            className="absolute border-2 border-secondary-fixed/90 rounded-lg bg-secondary-fixed/15 backdrop-blur-[2px] flex flex-col justify-between p-2 z-10 animate-pulse transition-all"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height
            }}
          >
            <div className="flex justify-between items-start">
              <span className="bg-secondary-fixed text-on-secondary-fixed text-label-sm px-2 py-0.5 rounded-full font-bold shadow-sm">
                {box.label} {box.confidence}%
              </span>
              <span className="material-symbols-outlined text-secondary-fixed text-[16px]">
                verified
              </span>
            </div>
            <div className="text-on-secondary text-body-sm font-medium bg-on-secondary-fixed/70 px-1.5 py-0.5 rounded self-start backdrop-blur-md">
              {box.weight} • {box.kcal} kcal
            </div>
          </div>
        ))}

      {/* Viewfinder Controls Overlay - Top */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-30">
        <span className="bg-on-secondary-fixed/70 text-secondary-fixed text-label-sm px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-space-xs border border-secondary-fixed/25">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
          <span className="font-semibold">
            {isScanning ? 'Scanning Food...' : 'AI Scanner Active (Mock)'}
          </span>
        </span>

        <button
          type="button"
          onClick={onToggleUpload}
          className="w-10 h-10 rounded-full bg-on-secondary-fixed/70 text-on-secondary flex items-center justify-center backdrop-blur-md hover:bg-on-secondary-fixed transition-colors"
          title="Upload or Change Photo"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
        </button>
      </div>

      {/* Viewfinder Status - Bottom */}
      <div className="absolute bottom-4 inset-x-4 flex justify-between items-end z-30">
        <div className="text-on-secondary">
          <span className="text-body-sm text-secondary-fixed font-semibold">
            {detectedCount} items detected
          </span>
          <h3 className="text-headline-sm font-headline font-bold text-on-secondary drop-shadow">
            {mealTitle}
          </h3>
        </div>

        <button
          type="button"
          onClick={onRescan}
          className="bg-surface/95 text-on-surface text-label-sm px-3.5 py-2 rounded-lg backdrop-blur-md font-semibold hover:bg-surface transition-colors flex items-center gap-space-xs shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Re-scan
        </button>
      </div>

      {/* Keyframes for Scan Laser Line */}
      <style>{`
        @keyframes scan {
          0% { top: 8%; opacity: 0.85; }
          50% { top: 90%; opacity: 1; }
          100% { top: 8%; opacity: 0.85; }
        }
      `}</style>
    </div>
  );
};
