import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';

const BrowserHome = ({ onNavigate }) => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const projects = [
        {
            title: 'E-Commerce Platform',
            url: 'https://github.com/Hama/ecommerce-platform',
            icon: '🛒',
        },
        {
            title: 'Task Management App',
            url: 'https://github.com/Hama/task-manager',
            icon: '📋',
        },
        {
            title: 'AI Chat Interface',
            url: 'https://github.com/Hama/ai-chat',
            icon: '🤖',
        },
        {
            title: 'Portfolio OS',
            url: 'https://github.com/Hama/ubuntu-desktop-sim',
            icon: '💻',
        },
    ];

    return (
        <div
            className="h-full overflow-auto p-8"
            style={{ backgroundColor: currentTheme.windowBg, color: currentTheme.textPrimary }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: currentTheme.accent }}>
                        Welcome to Portfolio Browser
                    </h1>
                    <p className="text-lg opacity-70">
                        Explore my projects and connect with me on GitHub
                    </p>
                </div>

                {/* Projects Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">My Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                            <button
                                key={project.url}
                                onClick={() => onNavigate(project.url)}
                                className="p-6 rounded-xl transition-all hover:scale-105 text-left"
                                style={{
                                    backgroundColor: `${currentTheme.accent}15`,
                                    border: `1px solid ${currentTheme.accent}40`,
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="text-4xl p-3 rounded-lg"
                                        style={{ backgroundColor: `${currentTheme.accent}25` }}
                                    >
                                        {project.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                                        <p className="text-sm opacity-60">{project.url}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* GitHub Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Connect with Me</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => onNavigate('https://github.com/Hama')}
                            className="p-6 rounded-xl transition-all hover:scale-105 text-left"
                            style={{
                                backgroundColor: `${currentTheme.accent}15`,
                                border: `1px solid ${currentTheme.accent}40`,
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="text-4xl p-3 rounded-lg"
                                    style={{ backgroundColor: `${currentTheme.accent}25` }}
                                >
                                    🐙
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">GitHub Profile</h3>
                                    <p className="text-sm opacity-60">github.com/Hama</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowserHome;
