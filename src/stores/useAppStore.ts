import { create } from 'zustand';

export type AppId = 'terminal' | 'about' | 'projects' | 'skills' | 'contact' | 'files' | 'settings' | 'browser';

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
  finishBooting: () => void;
  addNotification: (message: string, type?: 'info' | 'success' | 'warning') => void;
  removeNotification: (id: string) => void;
}

const defaultWindowState = (id: AppId): WindowState => ({
  id,
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: 1,
  position: { x: 100 + Math.random() * 100, y: 50 + Math.random() * 50 },
  size: { width: 700, height: 500 },
});

export const useAppStore = create<AppState>((set, get) => ({
  windows: {
    terminal: defaultWindowState('terminal'),
    about: { ...defaultWindowState('about'), size: { width: 1000, height: 800 } },
    projects: { ...defaultWindowState('projects'), size: { width: 1000, height: 800 } },
    skills: { ...defaultWindowState('skills'), size: { width: 1000, height: 800 } },
    contact: { ...defaultWindowState('contact'), size: { width: 1000, height: 800 } },
    files: { ...defaultWindowState('files'), size: { width: 1000, height: 800 } },
    settings: { ...defaultWindowState('settings'), size: { width: 1000, height: 800 } },
    browser: { ...defaultWindowState('browser'), size: { width: 1000, height: 800 } },
  },
  activeWindow: null,
  highestZIndex: 1,
  theme: 'ubuntu',
  soundEnabled: true,
  isLoggedIn: false,
  isBooting: true,
  notifications: [],

  openWindow: (id) => {
    const { highestZIndex } = get();
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: highestZIndex + 1,
        },
      },
      activeWindow: id,
      highestZIndex: highestZIndex + 1,
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
    if (!windows[id].isOpen || windows[id].isMinimized) return;

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
    get().addNotification(`Theme changed to ${theme}`, 'success');
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  login: () => {
    set({ isLoggedIn: true });
  },

  finishBooting: () => {
    set({ isBooting: false });
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
