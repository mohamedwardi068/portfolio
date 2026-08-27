import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';

const WallpaperGrid: React.FC = () => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = themes[theme];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700" 
        style={{ background: currentTheme.wallpaper }} 
      />

      {/* Subtle Developer Grid Lines */}
      <div className="absolute inset-0 developer-grid opacity-60" />

      {/* Subtle Ambient Radial Lighting */}
      <div 
        className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 animate-subtle-glow"
        style={{ backgroundColor: currentTheme.accent }}
      />
      <div 
        className="absolute -bottom-[20%] -left-[10%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-15"
        style={{ backgroundColor: '#5E2750' }}
      />

      {/* Watermark / Terminal Coordinates Overlay (subtle developer signature) */}
      <div className="absolute bottom-4 right-6 text-[11px] font-mono opacity-20 tracking-wider hidden sm:block">
        MOHAMED-DEV-WS // 35.8256° N, 10.6369° E // LINUX KERNEL 6.8
      </div>
    </div>
  );
};

export default WallpaperGrid;
