import { motion } from 'framer-motion';
import { useAppStore, AppId } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  FiTerminal,
  FiUser,
  FiFolder,
  FiCode,
  FiLayers,
  FiMail,
  FiSettings,
  FiGlobe
} from 'react-icons/fi';

const apps = [
  { id: 'terminal' as AppId, icon: FiTerminal, label: 'Terminal' },
  { id: 'browser' as AppId, icon: FiGlobe, label: 'Browser' },
  { id: 'about' as AppId, icon: FiUser, label: 'About' },
  { id: 'projects' as AppId, icon: FiCode, label: 'Projects' },
  { id: 'skills' as AppId, icon: FiLayers, label: 'Skills' },
  { id: 'contact' as AppId, icon: FiMail, label: 'Contact' },
  { id: 'files' as AppId, icon: FiFolder, label: 'Files' },
  { id: 'settings' as AppId, icon: FiSettings, label: 'Settings' },
];

const Dock = () => {
  const { theme, windows, openWindow, focusWindow } = useAppStore();
  const currentTheme = themes[theme];

  const handleClick = (id: AppId) => {
    if (windows[id].isOpen && !windows[id].isMinimized) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <motion.div
      initial={{ x: -60 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-8 bottom-0 w-16 flex flex-col items-center py-4 gap-2 backdrop-blur-md z-40"
      style={{ backgroundColor: currentTheme.dockBg }}
    >
      {apps.map((app) => {
        const Icon = app.icon;
        const isOpen = windows[app.id].isOpen;

        return (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(app.id)}
            className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors group"
            style={{
              backgroundColor: isOpen ? `${currentTheme.accent}33` : 'transparent',
            }}
            title={app.label}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: currentTheme.textPrimary }}
            />
            {isOpen && (
              <div
                className="absolute left-0 w-1 h-2 rounded-r-full"
                style={{ backgroundColor: currentTheme.accent }}
              />
            )}
            <div
              className="absolute left-14 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                backgroundColor: currentTheme.windowBg,
                color: currentTheme.textPrimary,
              }}
            >
              {app.label}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default Dock;
