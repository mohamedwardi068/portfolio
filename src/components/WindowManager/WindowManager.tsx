import React from 'react';
import { useAppStore, AppId } from '@/stores/useAppStore';
import UbuntuWindow from './UbuntuWindow';
import Terminal from '@/apps/Terminal/Terminal';
import About from '@/apps/About/About';
import Projects from '@/apps/Projects/Projects';
import Experience from '@/apps/Experience/Experience';
import Skills from '@/apps/Skills/Skills';
import Contact from '@/apps/Contact/Contact';
import FileExplorer from '@/apps/FileExplorer/FileExplorer';
import Settings from '@/apps/Settings/Settings';
import BrowserWindow from '@/apps/Browser/BrowserWindow';

const appComponents: Record<AppId, { component: React.ComponentType<any>; title: string }> = {
  projects: { component: Projects, title: '💻 Projects Showcase' },
  experience: { component: Experience, title: '📜 Experience & Career Log' },
  skills: { component: Skills, title: '📊 Skills & System Monitor' },
  about: { component: About, title: '👨‍💻 About Mohamed' },
  terminal: { component: Terminal, title: '⚡ Linux Terminal (Bash)' },
  contact: { component: Contact, title: '📬 Mail & Contact Client' },
  files: { component: FileExplorer, title: '📁 Files & Resume Viewer' },
  browser: { component: BrowserWindow, title: '🌐 Web Browser' },
  settings: { component: Settings, title: '⚙️ System Settings' },
};

const WindowManager: React.FC = () => {
  const windows = useAppStore((state) => state.windows);

  return (
    <>
      {(Object.keys(windows) as AppId[]).map((appId) => {
        const windowState = windows[appId];
        const appInfo = appComponents[appId];

        if (!windowState || !windowState.isOpen || !appInfo) return null;

        const AppComponent = appInfo.component;

        return (
          <UbuntuWindow key={appId} appId={appId} title={appInfo.title}>
            <AppComponent />
          </UbuntuWindow>
        );
      })}
    </>
  );
};

export default WindowManager;

