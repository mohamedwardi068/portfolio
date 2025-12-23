import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { ShoppingCart, Wrench, Monitor, Laptop, CreditCard } from 'lucide-react';

const BrowserHome = ({ onNavigate }) => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const projects = [
        {
            title: 'E-Commerce Platform',
            url: 'https://swoo.vercel.app/',
            icon: ShoppingCart,
        },
        {
            title: 'AutoRepair Manager',
            url: 'https://mohamedwardi068.github.io/BusAtelierDeploy/',
            icon: Wrench,
        },
        {
            title: 'ShowRoom - Electronics Accessories',
            url: 'https://mohamedwardi068.github.io/ShowRoomDeploy/',
            icon: Monitor,
        },
        {
            title: 'Payment Checkout System',
            url: 'https://payment-five-mocha.vercel.app/',
            icon: CreditCard,
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
                                        className="text-4xl p-3 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${currentTheme.accent}25` }}
                                    >
                                        <project.icon className="w-8 h-8" />
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
                            onClick={() => onNavigate('https://github.com/mohamedwardi068')}
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
                                    <p className="text-sm opacity-60">github.com/mohamedwardi068</p>
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
