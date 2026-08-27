import { motion } from 'framer-motion';
import { useAppStore, AppId } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Terminal,
  Code,
  Briefcase,
  Layers,
  User,
  Mail,
  Folder,
  Globe,
  Settings,
  LayoutGrid
} from 'lucide-react';

interface DockAppItem {
  id: AppId;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const dockApps: DockAppItem[] = [
  { id: 'projects', icon: Code, label: 'Featured Projects', badge: '10' },
  { id: 'experience', icon: Briefcase, label: 'Experience & Timeline' },
  { id: 'skills', icon: Layers, label: 'Skills & System Monitor' },
  { id: 'about', icon: User, label: 'About Mohamed' },
  { id: 'terminal', icon: Terminal, label: 'Linux Terminal (Bash)' },
  { id: 'contact', icon: Mail, label: 'Contact / Mail Client' },
  { id: 'files', icon: Folder, label: 'Files & Resume' },
  { id: 'browser', icon: Globe, label: 'Web Browser' },
  { id: 'settings', icon: Settings, label: 'System Settings' },
];

const Dock = () => {
  const {
    theme,
    windows,
    activeWindow,
    openWindow,
    focusWindow,
    minimizeWindow,
    openLauncher,
  } = useAppStore();
  const currentTheme = themes[theme];

  const handleAppClick = (id: AppId) => {
    const win = windows[id];
    if (win.isOpen && !win.isMinimized && activeWindow === id) {
      // Toggle minimize if clicking active window
      minimizeWindow(id);
    } else if (win.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <aside
      className="fixed z-40 backdrop-blur-xl transition-all duration-300 select-none
        bottom-0 left-0 right-0 h-16 border-t flex flex-row items-center justify-around px-2
        md:top-8 md:bottom-0 md:left-0 md:right-auto md:w-16 md:h-auto md:flex-col md:justify-start md:py-3 md:gap-1.5 md:border-r md:border-t-0"
      style={{
        backgroundColor: currentTheme.dockBg,
        borderColor: currentTheme.panelBorder,
      }}
    >
      {/* Applications List */}
      <div className="flex flex-row md:flex-col items-center gap-1 md:gap-1.5 flex-1 md:flex-initial overflow-x-auto md:overflow-x-visible no-scrollbar">
        {dockApps.map((app) => {
          const Icon = app.icon;
          const win = windows[app.id];
          const isOpen = win?.isOpen;
          const isActive = activeWindow === app.id && isOpen && !win.isMinimized;

          return (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleAppClick(app.id)}
              className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-150 group"
              style={{
                backgroundColor: isActive
                  ? `${currentTheme.accent}35`
                  : isOpen
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'transparent',
                border: isActive ? `1px solid ${currentTheme.accent}50` : '1px solid transparent',
              }}
              title={app.label}
              aria-label={app.label}
            >
              <Icon
                className="w-5 h-5 md:w-6 md:h-6 transition-colors"
                style={{
                  color: isActive
                    ? currentTheme.accent
                    : isOpen
                    ? currentTheme.textPrimary
                    : currentTheme.textSecondary,
                }}
              />

              {/* Running Pill Indicator (Left bar on desktop, bottom dot on mobile) */}
              {isOpen && (
                <>
                  {/* Desktop left indicator */}
                  <span
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all"
                    style={{
                      height: isActive ? '18px' : '6px',
                      backgroundColor: currentTheme.accent,
                      boxShadow: isActive ? `0 0 8px ${currentTheme.accent}` : 'none',
                    }}
                  />
                  {/* Mobile bottom indicator */}
                  <span
                    className="md:hidden absolute bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: currentTheme.accent }}
                  />
                </>
              )}

              {/* Tooltip on Hover (Desktop only) */}
              <div
                className="hidden md:block absolute left-16 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border z-50 translate-x-1 group-hover:translate-x-0"
                style={{
                  backgroundColor: currentTheme.windowBg,
                  borderColor: currentTheme.windowBorder,
                  color: currentTheme.textPrimary,
                }}
              >
                {app.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dock Separator / Launcher Button */}
      <div className="hidden md:flex flex-col items-center mt-auto pt-2 border-t w-10" style={{ borderColor: currentTheme.cardBorder }}>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={openLauncher}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors group relative"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          title="Applications Menu (Ctrl + K)"
        >
          <LayoutGrid className="w-5 h-5 opacity-70 group-hover:opacity-100" style={{ color: currentTheme.accent }} />
          <div
            className="absolute left-16 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border z-50"
            style={{
              backgroundColor: currentTheme.windowBg,
              borderColor: currentTheme.windowBorder,
              color: currentTheme.textPrimary,
            }}
          >
            All Applications (Ctrl + K)
          </div>
        </motion.button>
      </div>
    </aside>
  );
};

export default Dock;

