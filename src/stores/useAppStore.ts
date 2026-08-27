import { create } from 'zustand';

export type AppId = 'terminal' | 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'files' | 'settings' | 'browser';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export type ThemeType = 'ubuntu' | 'dark' | 'hacker';

interface AppState {
  windows: Record<AppId, WindowState>;
  activeWindow: AppId | null;
  highestZIndex: number;
  theme: ThemeType;
  soundEnabled: boolean;
  isLoggedIn: boolean;
  isBooting: boolean;
  isLauncherOpen: boolean;
  selectedInspectorProjectId: number | null;
  notifications: { id: string; message: string; type: 'info' | 'success' | 'warning' }[];

  // Actions
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: AppId, size: { width: number; height: number }) => void;
  setTheme: (theme: ThemeType) => void;
  toggleSound: () => void;
  login: () => void;
  quickLaunchRecruiter: (targetApp?: AppId) => void;
  finishBooting: () => void;
  openLauncher: () => void;
  closeLauncher: () => void;
  toggleLauncher: () => void;
  openProjectInspector: (projectId: number) => void;
  closeProjectInspector: () => void;
  addNotification: (message: string, type?: 'info' | 'success' | 'warning') => void;
  removeNotification: (id: string) => void;
}

const defaultWindowState = (id: AppId, custom?: Partial<WindowState>): WindowState => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const defaultWidth = isMobile ? window.innerWidth - 16 : 940;
  const defaultHeight = isMobile ? window.innerHeight - 80 : 640;

  return {
    id,
    isOpen: false,
    isMinimized: false,
    isMaximized: isMobile,
    zIndex: 1,
    position: { x: isMobile ? 8 : 80 + Math.random() * 40, y: isMobile ? 36 : 45 + Math.random() * 30 },
    size: { width: defaultWidth, height: defaultHeight },
    ...custom,
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  windows: {
    terminal: defaultWindowState('terminal', { size: { width: 840, height: 540 } }),
    about: defaultWindowState('about', { size: { width: 980, height: 680 } }),
    projects: defaultWindowState('projects', { size: { width: 1040, height: 720 }, isOpen: false }),
    experience: defaultWindowState('experience', { size: { width: 960, height: 660 } }),
    skills: defaultWindowState('skills', { size: { width: 980, height: 680 } }),
    contact: defaultWindowState('contact', { size: { width: 920, height: 640 } }),
    files: defaultWindowState('files', { size: { width: 960, height: 620 } }),
    settings: defaultWindowState('settings', { size: { width: 820, height: 580 } }),
    browser: defaultWindowState('browser', { size: { width: 1020, height: 700 } }),
  },
  activeWindow: null,
  highestZIndex: 10,
  theme: 'ubuntu',
  soundEnabled: true,
  isLoggedIn: false,
  isBooting: true,
  isLauncherOpen: false,
  selectedInspectorProjectId: null,
  notifications: [],

  openWindow: (id) => {
    const { highestZIndex, windows } = get();
    const currentWin = windows[id];
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...currentWin,
          isOpen: true,
          isMinimized: false,
          zIndex: highestZIndex + 1,
        },
      },
      activeWindow: id,
      highestZIndex: highestZIndex + 1,
      isLauncherOpen: false,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      },
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
        },
      },
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: !state.windows[id].isMaximized,
        },
      },
    }));
  },

  focusWindow: (id) => {
    const { highestZIndex, windows } = get();
    if (!windows[id] || !windows[id].isOpen || windows[id].isMinimized) return;

    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: highestZIndex + 1,
          isMinimized: false,
        },
      },
      activeWindow: id,
      highestZIndex: highestZIndex + 1,
    }));
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position,
        },
      },
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          size,
        },
      },
    }));
  },

  setTheme: (theme) => {
    set({ theme });
    get().addNotification(`Theme switched to ${theme.toUpperCase()}`, 'info');
  },

  toggleSound: () => {
    set((state) => {
      const nextSound = !state.soundEnabled;
      return { soundEnabled: nextSound };
    });
  },

  login: () => {
    set({ isLoggedIn: true, isBooting: false });
    // Open Projects and About windows by default for instant delight
    get().openWindow('projects');
  },

  quickLaunchRecruiter: (targetApp: AppId = 'projects') => {
    set({ isLoggedIn: true, isBooting: false, isLauncherOpen: false });
    get().openWindow(targetApp);
    get().addNotification(' Quick Launch: Developer Workstation Ready', 'success');
  },

  finishBooting: () => {
    set({ isBooting: false });
  },

  openLauncher: () => {
    set({ isLauncherOpen: true });
  },

  closeLauncher: () => {
    set({ isLauncherOpen: false });
  },

  toggleLauncher: () => {
    set((state) => ({ isLauncherOpen: !state.isLauncherOpen }));
  },

  openProjectInspector: (projectId: number) => {
    set({ selectedInspectorProjectId: projectId });
  },

  closeProjectInspector: () => {
    set({ selectedInspectorProjectId: null });
  },

  addNotification: (message, type = 'info') => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    setTimeout(() => {
      get().removeNotification(id);
    }, 4000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

