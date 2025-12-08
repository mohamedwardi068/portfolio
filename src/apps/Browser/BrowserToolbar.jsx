import { useState } from 'react';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiHome } from 'react-icons/fi';

const BrowserToolbar = ({ activeTab }) => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const { navigate, goBack, goForward, reload } = useBrowserStore();
    const [urlInput, setUrlInput] = useState(activeTab?.url || '');

    const canGoBack = activeTab && activeTab.historyIndex > 0;
    const canGoForward = activeTab && activeTab.historyIndex < activeTab.history.length - 1;

    const handleNavigate = () => {
        if (!activeTab || !urlInput.trim()) return;

        let url = urlInput.trim();
        // Add https:// if no protocol specified
        if (!url.startsWith('http://') && !url.startsWith('https://') && url !== 'home') {
            url = 'https://' + url;
        }

        navigate(activeTab.id, url);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleNavigate();
        }
    };

    const handleHome = () => {
        if (!activeTab) return;
        navigate(activeTab.id, 'home');
        setUrlInput('home');
    };

    // Update URL input when active tab changes
    useState(() => {
        if (activeTab) {
            setUrlInput(activeTab.url);
        }
    }, [activeTab?.url]);

    return (
        <div
            className="flex items-center gap-2 p-2 border-b"
            style={{
                backgroundColor: currentTheme.windowHeader,
                borderColor: `${currentTheme.accent}30`,
            }}
        >
            {/* Navigation Buttons */}
            <button
                onClick={() => activeTab && goBack(activeTab.id)}
                disabled={!canGoBack}
                className="p-2 rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: currentTheme.textPrimary }}
                title="Back"
            >
                <FiArrowLeft className="w-4 h-4" />
            </button>

            <button
                onClick={() => activeTab && goForward(activeTab.id)}
                disabled={!canGoForward}
                className="p-2 rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: currentTheme.textPrimary }}
                title="Forward"
            >
                <FiArrowRight className="w-4 h-4" />
            </button>

            <button
                onClick={() => activeTab && reload(activeTab.id)}
                className="p-2 rounded hover:bg-white/10 transition-colors"
                style={{ color: currentTheme.textPrimary }}
                title="Reload"
            >
                <FiRefreshCw className="w-4 h-4" />
            </button>

            <button
                onClick={handleHome}
                className="p-2 rounded hover:bg-white/10 transition-colors"
                style={{ color: currentTheme.textPrimary }}
                title="Home"
            >
                <FiHome className="w-4 h-4" />
            </button>

            {/* URL Bar */}
            <div className="flex-1">
                <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={(e) => e.target.select()}
                    placeholder="Enter URL or search..."
                    className="w-full px-4 py-1.5 rounded-full outline-none transition-colors"
                    style={{
                        backgroundColor: currentTheme.windowBg,
                        color: currentTheme.textPrimary,
                        border: `1px solid ${currentTheme.accent}40`,
                    }}
                />
            </div>
        </div>
    );
};

export default BrowserToolbar;
