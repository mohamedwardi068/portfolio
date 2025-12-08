import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiWifi, FiVolume2, FiBattery, FiChevronDown } from 'react-icons/fi';

const TopBar = () => {
  const [time, setTime] = useState(new Date());
  const { theme, activeWindow, windows } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getActiveAppName = () => {
    if (!activeWindow) return 'Desktop';
    const names: Record<string, string> = {
      terminal: 'Terminal',
      about: 'About Me',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      files: 'Files',
      settings: 'Settings',
    };
    return names[activeWindow] || 'Desktop';
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-50 backdrop-blur-md"
      style={{ backgroundColor: currentTheme.panelBg }}
    >
      <div className="flex items-center gap-4">
        <span 
          className="font-semibold text-sm"
          style={{ color: currentTheme.textPrimary }}
        >
          Activities
        </span>
        <span 
          className="text-sm"
          style={{ color: currentTheme.textPrimary }}
        >
          {getActiveAppName()}
        </span>
      </div>

      <div 
        className="flex items-center gap-1 text-sm"
        style={{ color: currentTheme.textPrimary }}
      >
        <span>{formatDate(time)}</span>
        <span className="mx-2">{formatTime(time)}</span>
      </div>

      <div className="flex items-center gap-3">
        <FiWifi 
          className="w-4 h-4" 
          style={{ color: currentTheme.textPrimary }}
        />
        <FiVolume2 
          className="w-4 h-4" 
          style={{ color: currentTheme.textPrimary }}
        />
        <FiBattery 
          className="w-4 h-4" 
          style={{ color: currentTheme.textPrimary }}
        />
        <div 
          className="flex items-center gap-1 cursor-pointer hover:opacity-80"
          style={{ color: currentTheme.textPrimary }}
        >
          <span className="text-sm">User</span>
          <FiChevronDown className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
