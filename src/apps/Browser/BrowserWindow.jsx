import { useEffect } from 'react';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import BrowserToolbar from './BrowserToolbar';
import BrowserTabBar from './BrowserTabBar';
import BrowserHome from './BrowserHome';

// Lucide icons
import { Lock, ArrowUpRight } from "lucide-react";

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

    const canEmbed = (url) => {
        const restrictedDomains = ['github.com', 'linkedin.com', 'twitter.com', 'x.com'];
        try {
            const hostname = new URL(url).hostname;
            return !restrictedDomains.some(domain => hostname.includes(domain));
        } catch (e) {
            return true;
        }
    };

    // Automatically stop loading for non-embeddable URLs since there is no iframe onLoad event
    useEffect(() => {
        if (activeTab?.isLoading && activeTab.url !== 'home' && !canEmbed(activeTab.url)) {
            setLoading(activeTab.id, false);
        }
    }, [activeTab, setLoading]);

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

                                {(() => {
                                    if (!canEmbed(activeTab.url)) {
                                        return (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 gap-4">
                                                
                                                {/* 🔒 replaced with Lucide Lock */}
                                                <Lock
                                                    className="w-16 h-16"
                                                    style={{ color: currentTheme.textPrimary }}
                                                />

                                                <h2 className="text-2xl font-bold" style={{ color: currentTheme.textPrimary }}>
                                                    Content Cannot be Embedded
                                                </h2>

                                                <p className="text-lg opacity-80 max-w-md" style={{ color: currentTheme.textSecondary }}>
                                                    This website ({new URL(activeTab.url).hostname}) prevents itself from being displayed in other applications.
                                                </p>

                                                <button
                                                    onClick={() => window.open(activeTab.url, '_blank')}
                                                    className="px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                                                    style={{
                                                        backgroundColor: currentTheme.accent,
                                                        color: '#fff'
                                                    }}
                                                >
                                                    Open in External Browser
                                                    {/* ↗ replaced with Lucide ArrowUpRight */}
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        );
                                    }

                                    return (
                                        <iframe
                                            key={activeTab.url}
                                            src={activeTab.url}
                                            onLoad={handleIframeLoad}
                                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                            className="w-full h-full border-none"
                                            style={{ backgroundColor: '#fff' }}
                                            title="Browser Content"
                                        />
                                    );
                                })()}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BrowserWindow;
