import React from 'react';
import { useAppStore, ThemeType } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Volume2,
  VolumeX,
  Monitor,
  Moon,
  Terminal,
  RotateCcw,
  Command,
  Sparkles,
  Check,
  Shield,
  Laptop
} from 'lucide-react';

const themeOptions: { id: ThemeType; label: string; icon: React.ElementType; desc: string; preview: string }[] = [
  {
    id: 'ubuntu',
    label: 'Ubuntu Aubergine',
    icon: Monitor,
    desc: 'Deep purple background with orange accent glow and dark charcoal window surfaces.',
    preview: 'radial-gradient(ellipse at center, #2A0629 0%, #170018 100%)',
  },
  {
    id: 'dark',
    label: 'Midnight Developer',
    icon: Moon,
    desc: 'Sleek dark navy workstation environment with soft violet accent illumination.',
    preview: 'radial-gradient(ellipse at center, #16213e 0%, #0F111A 100%)',
  },
  {
    id: 'hacker',
    label: 'Cyber Terminal',
    icon: Terminal,
    desc: 'Matrix rain stream with emerald green phosphors and monochrome dark shell.',
    preview: 'radial-gradient(ellipse at center, #08180C 0%, #050B06 100%)',
  },
];

const Settings: React.FC = () => {
  const { theme, soundEnabled, setTheme, toggleSound, addNotification } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <div
      className="h-full p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: currentTheme.cardBorder }}>
          <span className="text-xl">⚙️</span>
          <h1 className="text-2xl font-bold">System Preferences & Settings</h1>
        </div>

        {/* Wallpaper & Appearance Section */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Desktop Appearance & Wallpapers</span>
            </h2>
            <p className="text-xs opacity-70 mt-0.5">
              Select your preferred desktop wallpaper theme and ambient lighting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const isSelected = theme === option.id;
              const IconComponent = option.icon;

              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected ? 'ring-2 scale-[1.02] shadow-xl' : 'hover:scale-[1.01] opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: `${currentTheme.accent}0A`,
                    borderColor: isSelected ? currentTheme.accent : `${currentTheme.accent}20`,
                  }}
                >
                  <div>
                    {/* Visual Preview Box */}
                    <div
                      className="w-full h-24 rounded-xl mb-3 flex items-center justify-center border border-white/10 shadow-inner relative overflow-hidden"
                      style={{ background: option.preview }}
                    >
                      <IconComponent className="w-8 h-8 opacity-80 text-white" />
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 p-1 rounded-full shadow-md"
                          style={{ backgroundColor: currentTheme.accent }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-sm mb-1">{option.label}</h3>
                    <p className="text-[11px] opacity-70 leading-relaxed">{option.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Audio / Sound Preferences */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-bold">Audio Feedback</h2>
            <p className="text-xs opacity-70 mt-0.5">Toggle mechanical terminal key clicks sound synthesizer.</p>
          </div>

          <div
            className="flex items-center justify-between p-4 rounded-2xl border"
            style={{
              backgroundColor: `${currentTheme.accent}0A`,
              borderColor: `${currentTheme.accent}20`,
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="p-3 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                }}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-50" />}
              </div>
              <div>
                <h4 className="text-sm font-bold">Terminal Keypress FX</h4>
                <p className="text-xs opacity-70">Synthesized audio cues when typing inside the Linux terminal.</p>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className="w-12 h-6 rounded-full transition-colors relative"
              style={{
                backgroundColor: soundEnabled ? currentTheme.accent : 'rgba(255,255,255,0.2)',
              }}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  soundEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Keyboard Shortcuts Reference */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <Command className="w-4 h-4 text-orange-400" />
              <span>Keyboard Shortcuts & Productivity</span>
            </h2>
            <p className="text-xs opacity-70 mt-0.5">Global workstation hotkeys for quick navigation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { keys: ['Ctrl', 'K'], desc: 'Open Spotlight Command Launcher & search' },
              { keys: ['Ctrl', 'Shift', 'T'], desc: 'Launch Linux Bash Terminal' },
              { keys: ['Esc'], desc: 'Close active modal / Spotlight search' },
              { keys: ['Enter'], desc: 'Execute command or select focused item' },
            ].map((hk, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border flex items-center justify-between"
                style={{
                  backgroundColor: `${currentTheme.accent}08`,
                  borderColor: `${currentTheme.accent}20`,
                }}
              >
                <span className="text-xs opacity-85 font-medium">{hk.desc}</span>
                <div className="flex items-center gap-1 font-mono">
                  {hk.keys.map((k) => (
                    <kbd key={k} className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-bold">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workstation Specification Overview */}
        <section className="pt-2">
          <div
            className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-5"
            style={{
              backgroundColor: `${currentTheme.accent}08`,
              borderColor: `${currentTheme.accent}20`,
            }}
          >
            <div
              className="p-4 rounded-2xl shrink-0"
              style={{
                backgroundColor: `${currentTheme.accent}25`,
                color: currentTheme.accent,
              }}
            >
              <Laptop className="w-8 h-8" />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <h4 className="text-sm sm:text-base font-bold">Mohamed Developer Workstation OS</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                Version 2.0.0 (Production Release). Engineered with React 19, TypeScript, Tailwind CSS, Framer Motion, and Zustand state synchronization.
              </p>
              <p className="text-[11px] font-mono opacity-50 pt-1">
                Built by Mohamed El Ouardi • Sousse, Tunisia
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

