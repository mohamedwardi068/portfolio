import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { 
    Headphones, 
    Building2, 
    Dumbbell, 
    BarChart3, 
    Kanban, 
    ShoppingCart, 
    Wrench, 
    Monitor, 
    CreditCard,
    Sparkles 
} from 'lucide-react';

const BrowserHome = ({ onNavigate }) => {
    const theme = useAppStore((state) => state.theme);
    const currentTheme = themes[theme];

    const projects = [
        {
            title: 'NovaSon — Audio & Tech E-Commerce',
            subtitle: 'React 19 & Tailwind v4 E-Commerce',
            url: 'https://github.com/mohamedwardi068/NovaSon',
            icon: Headphones,
            isNew: true,
        },
        {
            title: 'EstateAI — Real Estate Platform',
            subtitle: 'Interactive Maps & Search',
            url: 'https://github.com/mohamedwardi068/EstateAI',
            icon: Building2,
            isNew: true,
        },
        {
            title: 'GymBot — AI Fitness Coach',
            subtitle: 'Gemini 2.5 AI Full-Stack Coach',
            url: 'https://github.com/mohamedwardi068/AiPoweredGymApp',
            icon: Dumbbell,
            isNew: true,
        },
        {
            title: 'SaaS Analytics Dashboard',
            subtitle: 'Pure CSS Grid & React Metrics',
            url: 'https://github.com/mohamedwardi068/E_commerce_Dashboard',
            icon: BarChart3,
            isNew: true,
        },
        {
            title: 'Kanban Project Management',
            subtitle: 'Full-Stack Agile Workflow',
            url: 'https://github.com/mohamedwardi068/ProjectManagementSystem',
            icon: Kanban,
            isNew: true,
        },
        {
            title: 'E-Commerce Platform (Swoo)',
            subtitle: 'Full-Stack Shopping Solution',
            url: 'https://swoo.vercel.app/',
            icon: ShoppingCart,
            isNew: false,
        },
        {
            title: 'AutoRepair Manager',
            subtitle: 'Workshop Operations App',
            url: 'https://mohamedwardi068.github.io/BusAtelierDeploy/',
            icon: Wrench,
            isNew: false,
        },
        {
            title: 'ShowRoom — Electronics Accessories',
            subtitle: 'Client-Side Accessories Store',
            url: 'https://mohamedwardi068.github.io/ShowRoomDeploy/',
            icon: Monitor,
            isNew: false,
        },
        {
            title: 'Payment Checkout System',
            subtitle: 'MERN Stripe-like Checkout',
            url: 'https://payment-five-mocha.vercel.app/',
            icon: CreditCard,
            isNew: false,
        },
    ];

    return (
        <div
            className="h-full overflow-auto p-6 md:p-8"
            style={{ backgroundColor: currentTheme.windowBg, color: currentTheme.textPrimary }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: currentTheme.accent }}>
                        Welcome to Portfolio Browser
                    </h1>
                    <p className="text-base opacity-70">
                        Explore my latest projects, live demos, and source code repositories
                    </p>
                </div>

                {/* Projects Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl sm:text-2xl font-semibold">Featured Projects</h2>
                        <span 
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: `${currentTheme.accent}20`, color: currentTheme.accent }}
                        >
                            {projects.length} Apps
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                            <button
                                key={project.url}
                                onClick={() => onNavigate(project.url)}
                                className="relative p-5 rounded-xl transition-all duration-200 hover:scale-[1.02] text-left group"
                                style={{
                                    backgroundColor: `${currentTheme.accent}12`,
                                    border: `1px solid ${currentTheme.accent}35`,
                                }}
                            >
                                {project.isNew && (
                                    <span 
                                        className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase"
                                        style={{ backgroundColor: currentTheme.accent, color: '#fff' }}
                                    >
                                        <Sparkles className="w-2.5 h-2.5" />
                                        New
                                    </span>
                                )}
                                <div className="flex items-center gap-4">
                                    <div
                                        className="text-3xl p-3 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${currentTheme.accent}25`, color: currentTheme.accent }}
                                    >
                                        <project.icon className="w-7 h-7" />
                                    </div>
                                    <div className="min-w-0 flex-1 pr-10">
                                        <h3 className="font-semibold text-base mb-0.5 truncate group-hover:text-opacity-100">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs opacity-65 truncate mb-1">
                                            {project.subtitle}
                                        </p>
                                        <p className="text-xs opacity-50 truncate font-mono">
                                            {project.url}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* GitHub & LinkedIn Connect Section */}
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Connect with Me</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => onNavigate('https://github.com/mohamedwardi068')}
                            className="p-5 rounded-xl transition-all hover:scale-[1.02] text-left"
                            style={{
                                backgroundColor: `${currentTheme.accent}12`,
                                border: `1px solid ${currentTheme.accent}35`,
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="text-3xl p-3 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${currentTheme.accent}25` }}
                                >
                                    🐙
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base mb-0.5">GitHub Profile</h3>
                                    <p className="text-xs opacity-60">github.com/mohamedwardi068</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => onNavigate('https://www.linkedin.com/in/mohamed-wardi-69502b324/')}
                            className="p-5 rounded-xl transition-all hover:scale-[1.02] text-left"
                            style={{
                                backgroundColor: `${currentTheme.accent}12`,
                                border: `1px solid ${currentTheme.accent}35`,
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="text-3xl p-3 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${currentTheme.accent}25` }}
                                >
                                    💼
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base mb-0.5">LinkedIn Profile</h3>
                                    <p className="text-xs opacity-60">linkedin.com/in/mohamed-wardi-69502b324</p>
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
