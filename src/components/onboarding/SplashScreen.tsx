import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-between overflow-hidden select-none">
      {/* Cinematic Hero Food Background */}
      <div 
        className="absolute inset-x-0 top-0 h-[62%] w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDK91B0YG_Uj8sGads0v_Eqi_-axXUzFK6VmjJvmC04O_73S6xdXU8lcTT2HCU6s5qqwbEyaygatlYw_5Wp_eMMG-XHd6sfBBUttqZBHyJWfavMFkexAClAtSuiL1st9zbIneOF2kihWTgRVbs2elRLDLigQMFv6dBvW02L_QAvjT-iKw9H-_0gt0gXHfdvkG7eAuErJvdT9cI7zCqWJNODBPdtcnvaOkK-3sIXM8c0rTkgFiMeTEo')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/40 to-[#09090b]"></div>
      </div>

      {/* Spacer to push content down */}
      <div className="flex-1"></div>

      {/* Bottom Container Card */}
      <div className="z-10 flex flex-col px-6 pb-12 w-full max-w-md mx-auto text-center items-center">
        <div className="w-full flex flex-col items-center space-y-4 bg-[#1A1C19] p-8 rounded-[28px] shadow-2xl border border-white/[0.04]">
          <div className="flex flex-col items-center space-y-1">
            <h1 className="text-[34px] font-bold tracking-tight text-[#fafafa] font-headline">
              NutriTrack
            </h1>
            <p className="text-[#a1a1aa] text-sm font-medium tracking-wide">
              Point. Scan. Know.
            </p>
          </div>

          <div className="w-full pt-4 flex flex-col space-y-3 items-center">
            <button
              onClick={() => navigate('/setup/metrics')}
              className="w-full py-4 rounded-full font-semibold text-center text-[#09090b] transition-transform active:scale-95 shadow-lg flex items-center justify-center font-headline"
              style={{ backgroundColor: '#C7F464' }}
            >
              Get started
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-[#a1a1aa] hover:text-[#fafafa] transition-colors pt-2"
            >
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
