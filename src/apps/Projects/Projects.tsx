import { useAppStore } from '@/stores/useAppStore';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { themes } from '@/styles/themes';
import { ComponentType } from 'react'; // Added to avoid potential type errors if needed, but mainly for the icons below
import { ShoppingCart, ClipboardList, Bot, Laptop, CloudSun, FileCode, Star, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    stars: 128,
    image: ShoppingCart,
    githubUrl: 'https://github.com/Hama/ecommerce-platform',
    demoUrl: 'https://demo-ecommerce.example.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Real-time collaborative task management with drag-and-drop, notifications, and team features.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
    stars: 89,
    image: ClipboardList,
    githubUrl: 'https://github.com/Hama/task-manager',
    demoUrl: 'https://demo-taskmanager.example.com',
  },
  {
    id: 3,
    title: 'AI Chat Interface',
    description: 'An intelligent chatbot interface powered by OpenAI with conversation history and custom prompts.',
    tech: ['React', 'OpenAI', 'TailwindCSS', 'Vercel'],
    stars: 256,
    image: Bot,
    githubUrl: 'https://github.com/Hama/ai-chat',
    demoUrl: 'https://demo-aichat.example.com',
  },
  {
    id: 4,
    title: 'Portfolio OS',
    description: 'This Ubuntu-style desktop portfolio you are currently viewing!',
    tech: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
    stars: 342,
    image: Laptop,
    githubUrl: 'https://github.com/Hama/ubuntu-desktop-sim',
    demoUrl: 'https://hama.dev',
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with 7-day forecasts, location search, and animated weather icons.',
    tech: ['React', 'OpenWeather API', 'Chart.js'],
    stars: 67,
    image: CloudSun,
    githubUrl: 'https://github.com/Hama/weather-dashboard',
    demoUrl: 'https://weather.example.com',
  },
  {
    id: 6,
    title: 'Code Snippet Manager',
    description: 'Organize and share code snippets with syntax highlighting and cloud sync.',
    tech: ['Vue.js', 'Firebase', 'Monaco Editor'],
    stars: 145,
    image: FileCode,
    githubUrl: 'https://github.com/Hama/snippet-manager',
    demoUrl: 'https://snippets.example.com',
  },
];

const Projects = () => {
  const theme = useAppStore((state) => state.theme);
  const { openWindow } = useAppStore();
  const { addTab } = useBrowserStore();
  const currentTheme = themes[theme];

  const handleOpenLink = (url: string) => {
    openWindow('browser');
    addTab(url);
  };

  return (
    <div
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl p-5 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: `${currentTheme.accent}10` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="text-4xl p-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${currentTheme.accent}20` }}
              >
                <project.image className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div
                    className="flex items-center gap-1 text-sm"
                    style={{ color: currentTheme.accent }}
                  >
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                </div>
                <p className="text-sm opacity-70 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${currentTheme.accent}25`,
                        color: currentTheme.accent,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleOpenLink(project.githubUrl)}
                    className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </button>
                  <button
                    onClick={() => handleOpenLink(project.demoUrl)}
                    className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
