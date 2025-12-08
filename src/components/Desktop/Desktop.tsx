import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import TopBar from '../TopBar/TopBar';
import Dock from '../Dock/Dock';
import WindowManager from '../WindowManager/WindowManager';
import NotificationCenter from '../Notification/NotificationCenter';
import MatrixRain from './MatrixRain';

const Desktop = () => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = themes[theme];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: currentTheme.wallpaper }}
    >
      {theme === 'hacker' && <MatrixRain />}
      <TopBar />
      <div className="pt-8 pl-16 w-full h-full">
        <WindowManager />
      </div>
      <Dock />
      <NotificationCenter />
    </div>
  );
};

export default Desktop;
