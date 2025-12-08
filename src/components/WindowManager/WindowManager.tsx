import { useAppStore, AppId } from '@/stores/useAppStore';
import UbuntuWindow from './UbuntuWindow';
import Terminal from '@/apps/Terminal/Terminal';
import About from '@/apps/About/About';
import Projects from '@/apps/Projects/Projects';
import Skills from '@/apps/Skills/Skills';
import Contact from '@/apps/Contact/Contact';
import FileExplorer from '@/apps/FileExplorer/FileExplorer';
import Settings from '@/apps/Settings/Settings';
import BrowserWindow from '@/apps/Browser/BrowserWindow';

const appComponents: Record<AppId, { component: React.FC; title: string }> = {
  terminal: { component: Terminal, title: 'Terminal' },
  about: { component: About, title: 'About Me' },
  projects: { component: Projects, title: 'Projects' },
  skills: { component: Skills, title: 'Skills' },
  contact: { component: Contact, title: 'Contact' },
  files: { component: FileExplorer, title: 'Files' },
  settings: { component: Settings, title: 'Settings' },
  browser: { component: BrowserWindow, title: 'Browser' },
};

const WindowManager = () => {
  const windows = useAppStore((state) => state.windows);

  return (
    <>
      {(Object.keys(windows) as AppId[]).map((appId) => {
        const window = windows[appId];
        const { component: AppComponent, title } = appComponents[appId];

        if (!window.isOpen) return null;

        return (
          <UbuntuWindow key={appId} appId={appId} title={title}>
            <AppComponent />
          </UbuntuWindow>
        );
      })}
    </>
  );
};

export default WindowManager;
