import { useBrowserStore } from '@/stores/useBrowserStore';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import BrowserTab from './BrowserTab';
import { FiPlus } from 'react-icons/fi';

const BrowserTabBar = () => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const { tabs, activeTabId, setActiveTab, closeTab, addTab } = useBrowserStore();

    return (
        <div
            className="flex items-center border-b"
            style={{
                backgroundColor: currentTheme.windowHeader,
                borderColor: `${currentTheme.accent}30`,
            }}
        >
            {/* Tabs */}
            <div className="flex-1 flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <BrowserTab
                        key={tab.id}
                        tab={tab}
                        isActive={activeTabId === tab.id}
                        onClose={() => closeTab(tab.id)}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            {/* Add Tab Button */}
            <button
                onClick={() => addTab()}
                className="px-3 py-2 hover:bg-white/10 transition-colors"
                style={{ color: currentTheme.textPrimary }}
                title="New Tab"
            >
                <FiPlus className="w-4 h-4" />
            </button>
        </div>
    );
};

export default BrowserTabBar;
