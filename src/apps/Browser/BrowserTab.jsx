import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';

const BrowserTab = ({ tab, isActive, onClose, onClick }) => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    return (
        <div
            onClick={onClick}
            className="group relative flex items-center gap-2 px-4 py-2 min-w-[180px] max-w-[200px] cursor-pointer transition-colors"
            style={{
                backgroundColor: isActive ? currentTheme.windowBg : `${currentTheme.accent}10`,
                borderRight: `1px solid ${currentTheme.accent}20`,
                color: currentTheme.textPrimary,
            }}
        >
            {/* Loading indicator or favicon placeholder */}
            {tab.isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                <span className="text-sm">🌐</span>
            )}

            {/* Tab title */}
            <span className="flex-1 truncate text-sm">
                {tab.title}
            </span>

            {/* Close button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded p-0.5 transition-opacity"
                style={{ color: currentTheme.textPrimary }}
            >
                ×
            </button>
        </div>
    );
};

export default BrowserTab;
