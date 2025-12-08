import { useAppStore, ThemeType } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiVolume2, FiVolumeX, FiMonitor, FiMoon, FiTerminal } from 'react-icons/fi';

const themeOptions: { id: ThemeType; icon: React.ElementType; preview: string }[] = [
  { id: 'ubuntu', icon: FiMonitor, preview: 'linear-gradient(135deg, #2C001E 0%, #DD4814 100%)' },
  { id: 'dark', icon: FiMoon, preview: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)' },
  { id: 'hacker', icon: FiTerminal, preview: 'linear-gradient(135deg, #000000 0%, #003300 100%)' },
];

const Settings = () => {
  const { theme, soundEnabled, setTheme, toggleSound } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <div
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      {/* Theme Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <p className="text-sm opacity-70 mb-4">Choose your preferred theme</p>
        
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              className={`relative rounded-xl p-1 transition-all ${
                theme === option.id ? 'ring-2 ring-orange-500 scale-105' : 'hover:scale-102'
              }`}
            >
              <div
                className="aspect-video rounded-lg mb-2 flex items-center justify-center"
                style={{ background: option.preview }}
              >
                <option.icon className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-sm font-medium capitalize">{option.id}</p>
              {theme === option.id && (
                <div
                  className="absolute top-2 right-2 w-4 h-4 rounded-full"
                  style={{ backgroundColor: currentTheme.accent }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Sound Settings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Sound</h2>
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ backgroundColor: `${currentTheme.accent}15` }}
        >
          <div className="flex items-center gap-4">
            {soundEnabled ? (
              <FiVolume2 className="w-6 h-6" style={{ color: currentTheme.accent }} />
            ) : (
              <FiVolumeX className="w-6 h-6 opacity-50" />
            )}
            <div>
              <p className="font-medium">Terminal Sounds</p>
              <p className="text-sm opacity-70">Play sounds when typing in terminal</p>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`w-14 h-7 rounded-full transition-colors relative ${
              soundEnabled ? '' : 'opacity-50'
            }`}
            style={{ backgroundColor: soundEnabled ? currentTheme.accent : `${currentTheme.textSecondary}40` }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                soundEnabled ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <div
          className="p-4 rounded-xl"
          style={{ backgroundColor: `${currentTheme.accent}15` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${currentTheme.accent}30` }}
            >
              💻
            </div>
            <div>
              <p className="font-semibold">Ubuntu Portfolio OS</p>
              <p className="text-sm opacity-70">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-sm opacity-70">
            A creative portfolio built with React, TypeScript, and love. 
            Inspired by Ubuntu's beautiful desktop environment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
