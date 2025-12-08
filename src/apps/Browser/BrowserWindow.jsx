import { useEffect } from 'react';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import BrowserToolbar from './BrowserToolbar';
import BrowserTabBar from './BrowserTabBar';
import BrowserHome from './BrowserHome';

const BrowserWindow = () => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const { tabs, activeTabId, setActiveTab, navigate, setLoading } = useBrowserStore();

    // Set first tab as active on mount if no active tab
    useEffect(() => {
        if (tabs.length > 0 && !activeTabId) {
            setActiveTab(tabs[0].id);
        }
    }, [tabs, activeTabId, setActiveTab]);

    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    const handleNavigateFromHome = (url) => {
        if (!activeTab) return;
        navigate(activeTab.id, url);
    };

    const handleIframeLoad = () => {
        if (activeTab) {
            setLoading(activeTab.id, false);
        }
    };

    return (
        <div className="h-full flex flex-col" style={{ backgroundColor: currentTheme.windowBg }}>
            {/* Tab Bar */}
            <BrowserTabBar />

            {/* Toolbar */}
            <BrowserToolbar activeTab={activeTab} />

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
                {activeTab && (
                    <>
                        {activeTab.url === 'home' ? (
                            <BrowserHome onNavigate={handleNavigateFromHome} />
                        ) : (
                            <div className="relative w-full h-full">
                                {activeTab.isLoading && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        style={{ backgroundColor: currentTheme.windowBg }}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div
                                                className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                                                style={{ borderColor: currentTheme.accent, borderTopColor: 'transparent' }}
                                            />
                                            <p style={{ color: currentTheme.textSecondary }}>Loading...</p>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    key={activeTab.url} // Force reload on URL change
                                    src={activeTab.url}
                                    onLoad={handleIframeLoad}
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    className="w-full h-full border-none"
                                    style={{ backgroundColor: '#fff' }}
                                    title="Browser Content"
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowserWindow;
