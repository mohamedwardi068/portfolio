import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  ChevronDown,
  Search,
  Sparkles,
  Command
} from 'lucide-react';
import QuickSettingsMenu from './QuickSettingsMenu';

const appDisplayTitles: Record<string, { title: string; icon: string }> = {
  projects: { title: 'Projects Showcase', icon: '💻' },
  experience: { title: 'Experience & Career Log', icon: '📜' },
  skills: { title: 'Skills & System Monitor', icon: '📊' },
  about: { title: 'About Mohamed', icon: '👨‍💻' },
  terminal: { title: 'Terminal', icon: '⚡' },
  contact: { title: 'Mail & Contact', icon: '📬' },
  files: { title: 'Files & Resume', icon: '📁' },
  settings: { title: 'Settings', icon: '⚙️' },
  browser: { title: 'Browser', icon: '🌐' },
};

const TopBar = () => {
  const [time, setTime] = useState(new Date());
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

  const {
    theme,
    activeWindow,
    windows,
    openLauncher,
    soundEnabled,
  } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const currentAppInfo = activeWindow && windows[activeWindow]?.isOpen
    ? appDisplayTitles[activeWindow] || { title: 'Desktop', icon: '🐧' }
    : { title: 'Desktop Workstation', icon: '🐧' };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-3 md:px-4 z-50 select-none backdrop-blur-lg border-b transition-colors"
        style={{
          backgroundColor: currentTheme.panelBg,
          borderColor: currentTheme.panelBorder,
          color: currentTheme.textPrimary,
        }}
      >
        {/* Left Section: Activities & Active App */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={openLauncher}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: `${currentTheme.accent}25`,
              color: currentTheme.accent,
              border: `1px solid ${currentTheme.accent}40`,
            }}
            title="Open Application Launcher (Ctrl + K)"
          >
            <Sparkles className="w-3 h-3" />
            <span>Activities</span>
          </button>

          {/* Quick Spotlight Trigger Button */}
          <button
            onClick={openLauncher}
            className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] opacity-60 hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <Search className="w-3 h-3" />
            <span>Quick search...</span>
            <kbd className="text-[9px] px-1 py-0.2 rounded bg-white/10 font-mono">Ctrl+K</kbd>
          </button>

          {/* Active Application Name */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium opacity-90 pl-1">
            <span>{currentAppInfo.icon}</span>
            <span>{currentAppInfo.title}</span>
          </div>
        </div>

        {/* Center: System Clock */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          onClick={openLauncher}
        >
          <span className="hidden sm:inline opacity-75">{formatDate(time)}</span>
          <span className="font-mono tracking-wider">{formatTime(time)}</span>
        </div>

        {/* Right Section: System Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2.5 opacity-80">
            <Wifi className="w-3.5 h-3.5 text-green-400" title="Connected: Fast Fiber (1000 Mbps)" />
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" title="Audio Enabled" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-50" title="Audio Muted" />
            )}
            <div className="flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[10px] font-mono opacity-80">100%</span>
            </div>
          </div>

          {/* User Quick Settings Trigger */}
          <button
            onClick={() => setIsQuickSettingsOpen(!isQuickSettingsOpen)}
            className="flex items-center gap-1.5 pl-2 pr-1 py-0.5 rounded-full transition-all duration-150 hover:bg-white/10"
            style={{
              backgroundColor: isQuickSettingsOpen ? `${currentTheme.accent}30` : 'transparent',
            }}
          >
            <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] bg-orange-600 text-white">
              M
            </span>
            <span className="text-xs font-medium hidden sm:inline">Mohamed</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isQuickSettingsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </header>

      {/* Quick Settings Dropdown */}
      <QuickSettingsMenu
        isOpen={isQuickSettingsOpen}
        onClose={() => setIsQuickSettingsOpen(false)}
      />
    </>
  );
};

export default TopBar;
