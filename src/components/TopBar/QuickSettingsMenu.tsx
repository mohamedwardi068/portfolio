import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, ThemeType } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Volume2,
  VolumeX,
  Moon,
  Monitor,
  Terminal,
  Zap,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Power
} from 'lucide-react';

interface QuickSettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSettingsMenu: React.FC<QuickSettingsMenuProps> = ({ isOpen, onClose }) => {
  const {
    theme,
    setTheme,
    soundEnabled,
    toggleSound,
    openWindow,
    quickLaunchRecruiter,
  } = useAppStore();
  const currentTheme = themes[theme];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110]" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-3 w-80 rounded-2xl shadow-2xl border p-4 backdrop-blur-xl flex flex-col gap-4 select-none"
          style={{
            backgroundColor: currentTheme.windowBg,
            borderColor: currentTheme.windowBorder,
            color: currentTheme.textPrimary,
          }}
        >
          {/* User Header */}
          <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: currentTheme.cardBorder }}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm"
              style={{ backgroundColor: currentTheme.accent }}
            >
              MO
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">Mohamed El Ouardi</h4>
              <p className="text-xs opacity-70 truncate">Full-Stack Engineer Workstation</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-green-500/20" title="Online" />
          </div>

          {/* Quick Recruiter Mode Launch */}
          <button
            onClick={() => {
              quickLaunchRecruiter('projects');
              onClose();
            }}
            className="w-full py-2.5 px-3 rounded-xl flex items-center justify-between font-semibold text-xs shadow-md transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#ffffff',
            }}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span> Recruiter Quick Launch</span>
            </div>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Fast Tour</span>
          </button>

          {/* Theme Switcher */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-2">
              Appearance & Theme
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ubuntu' as ThemeType, label: 'Ubuntu', icon: Monitor },
                { id: 'dark' as ThemeType, label: 'Midnight', icon: Moon },
                { id: 'hacker' as ThemeType, label: 'Cyber', icon: Terminal },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-xs font-medium transition-all ${
                    theme === item.id ? 'ring-1 shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: theme === item.id ? `${currentTheme.accent}25` : 'rgba(255,255,255,0.04)',
                    borderColor: theme === item.id ? currentTheme.accent : 'transparent',
                    color: theme === item.id ? currentTheme.accent : currentTheme.textPrimary,
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound & System Controls */}
          <div className="space-y-2 pt-2 border-t" style={{ borderColor: currentTheme.cardBorder }}>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" style={{ color: currentTheme.accent }} />
                ) : (
                  <VolumeX className="w-4 h-4 opacity-50" />
                )}
                <span>Typing Sound FX</span>
              </div>
              <button
                onClick={toggleSound}
                className="w-10 h-5 rounded-full transition-colors relative"
                style={{
                  backgroundColor: soundEnabled ? currentTheme.accent : 'rgba(255,255,255,0.2)',
                }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t" style={{ borderColor: currentTheme.cardBorder }}>
            <button
              onClick={() => {
                openWindow('files');
                onClose();
              }}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-left transition-colors flex items-center justify-between"
            >
              <span>📄 Resume / CV</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </button>
            <button
              onClick={() => {
                openWindow('contact');
                onClose();
              }}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-left transition-colors flex items-center justify-between"
            >
              <span>📬 Send Mail</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickSettingsMenu;
