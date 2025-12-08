import { create } from 'zustand';

export interface BrowserTab {
    id: string;
    url: string;
    history: string[];
    historyIndex: number;
    title: string;
    isLoading: boolean;
}

interface BrowserState {
    tabs: BrowserTab[];
    activeTabId: string | null;

    // Actions
    addTab: (initialUrl?: string) => void;
    closeTab: (tabId: string) => void;
    setActiveTab: (tabId: string) => void;
    navigate: (tabId: string, newUrl: string) => void;
    goBack: (tabId: string) => void;
    goForward: (tabId: string) => void;
    reload: (tabId: string) => void;
    setLoading: (tabId: string, isLoading: boolean) => void;
    updateTitle: (tabId: string, title: string) => void;
}

const createNewTab = (url: string = 'home'): BrowserTab => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    url,
    history: [url],
    historyIndex: 0,
    title: url === 'home' ? 'Home' : 'New Tab',
    isLoading: false,
});

export const useBrowserStore = create<BrowserState>((set, get) => ({
    tabs: [createNewTab('home')],
    activeTabId: null,

    addTab: (initialUrl = 'home') => {
        const newTab = createNewTab(initialUrl);
        set((state) => ({
            tabs: [...state.tabs, newTab],
            activeTabId: newTab.id,
        }));
    },

    closeTab: (tabId) => {
        const { tabs, activeTabId } = get();
        if (tabs.length === 1) return; // Don't close the last tab

        const tabIndex = tabs.findIndex((t) => t.id === tabId);
        const newTabs = tabs.filter((t) => t.id !== tabId);

        let newActiveTabId = activeTabId;
        if (activeTabId === tabId) {
            // If closing active tab, switch to adjacent tab
            const nextIndex = tabIndex >= newTabs.length ? newTabs.length - 1 : tabIndex;
            newActiveTabId = newTabs[nextIndex]?.id || null;
        }

        set({ tabs: newTabs, activeTabId: newActiveTabId });
    },

    setActiveTab: (tabId) => {
        set({ activeTabId: tabId });
    },

    navigate: (tabId, newUrl) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId) {
                    const newHistory = tab.history.slice(0, tab.historyIndex + 1);
                    return {
                        ...tab,
                        url: newUrl,
                        history: [...newHistory, newUrl],
                        historyIndex: newHistory.length,
                        isLoading: true,
                        title: newUrl === 'home' ? 'Home' : newUrl,
                    };
                }
                return tab;
            }),
        }));
    },

    goBack: (tabId) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId && tab.historyIndex > 0) {
                    const newIndex = tab.historyIndex - 1;
                    return {
                        ...tab,
                        url: tab.history[newIndex],
                        historyIndex: newIndex,
                        isLoading: true,
                    };
                }
                return tab;
            }),
        }));
    },

    goForward: (tabId) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId && tab.historyIndex < tab.history.length - 1) {
                    const newIndex = tab.historyIndex + 1;
                    return {
                        ...tab,
                        url: tab.history[newIndex],
                        historyIndex: newIndex,
                        isLoading: true,
                    };
                }
                return tab;
            }),
        }));
    },

    reload: (tabId) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId) {
                    return { ...tab, isLoading: true };
                }
                return tab;
            }),
        }));
    },

    setLoading: (tabId, isLoading) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId) {
                    return { ...tab, isLoading };
                }
                return tab;
            }),
        }));
    },

    updateTitle: (tabId, title) => {
        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.id === tabId) {
                    return { ...tab, title };
                }
                return tab;
            }),
        }));
    },
}));
