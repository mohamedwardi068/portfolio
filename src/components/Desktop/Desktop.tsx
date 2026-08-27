import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import TopBar from '../TopBar/TopBar';
import Dock from '../Dock/Dock';
import WindowManager from '../WindowManager/WindowManager';
import NotificationCenter from '../Notification/NotificationCenter';
import MatrixRain from './MatrixRain';
import WallpaperGrid from './WallpaperGrid';
import AppLauncherModal from '../Launcher/AppLauncherModal';

const Desktop = () => {
  const { theme, toggleLauncher, openWindow, closeLauncher } = useAppStore();

  // Global Keyboard Shortcuts (Ctrl+K for Launcher, Ctrl+Alt+T / Ctrl+Shift+T for Terminal, Esc to close modal/launcher)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K: Open Spotlight Launcher
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleLauncher();
      }
      // Ctrl+Shift+T or Ctrl+Alt+T: Launch Terminal
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        openWindow('terminal');
      }
      // Esc: close launcher
      if (e.key === 'Escape') {
        closeLauncher();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLauncher, openWindow, closeLauncher]);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#170018]">
      {/* Dynamic Wallpaper & Grid */}
      <WallpaperGrid />
      {theme === 'hacker' && <MatrixRain />}

      {/* Top System Bar */}
      <TopBar />

      {/* Main Workspace Area */}
      <main className="pt-8 pb-16 md:pb-0 md:pl-16 w-full h-full relative z-10 overflow-hidden">
        <WindowManager />
      </main>

      {/* Dock (Left on desktop, bottom on mobile) */}
      <Dock />

      {/* Spotlight Command Launcher (Ctrl + K) */}
      <AppLauncherModal />

      {/* System Notifications */}
      <NotificationCenter />
    </div>
  );
};

export default Desktop;

