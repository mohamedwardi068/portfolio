import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Cpu,
  Terminal,
  Wrench,
  Sparkles,
  Layers,
  CheckCircle2,
  Activity,
  HardDrive,
  ExternalLink,
  ShieldCheck,
  Zap,
  Box
} from 'lucide-react';

interface TechItem {
  name: string;
  proficiency: 'Production Core' | 'Advanced' | 'Proficient' | 'Integrated';
  experienceYears: string;
  usageContext: string;
  relatedProjects: string[];
}

interface TechCategory {
  id: string;
  category: string;
  icon: React.ElementType;
  description: string;
  items: TechItem[];
}

const techInventory: TechCategory[] = [
  {
    id: 'frontend',
    category: 'Frontend Engineering',
    icon: Code2,
    description: 'Component-driven architectures, reactive state management, and modern styling frameworks.',
    items: [
      {
        name: 'React 18 / 19',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'Single-page applications, custom hooks, reusable design systems, and responsive viewports.',
        relatedProjects: ['NovaSon', 'EstateAI', 'GymBot', 'Portfolio OS'],
      },
      {
        name: 'TypeScript',
        proficiency: 'Production Core',
        experienceYears: '2+ yrs',
        usageContext: 'Strict type modeling, interface contracts, generic components, and bug prevention.',
        relatedProjects: ['EstateAI', 'GymBot', 'SaaS Analytics', 'Portfolio OS'],
      },
      {
        name: 'Tailwind CSS (v3 / v4)',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'Utility-first modern styling, dark/light theme systems, and responsive layouts.',
        relatedProjects: ['NovaSon', 'EstateAI', 'SWOO', 'AutoRepair Manager'],
      },
      {
        name: 'JavaScript (ES6+)',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'Async/await, DOM manipulation, closures, modern modular patterns.',
        relatedProjects: ['ShowRoom', 'NovaSon', 'SWOO'],
      },
      {
        name: 'Next.js & Angular',
        proficiency: 'Proficient',
        experienceYears: '1+ yrs',
        usageContext: 'Server-side rendering, routing conventions, structured enterprise modules.',
        relatedProjects: ['Client Web Portals'],
      },
      {
        name: 'HTML5 / SCSS / CSS Grid',
        proficiency: 'Advanced',
        experienceYears: '3+ yrs',
        usageContext: 'Semantic HTML, raw CSS Grid architectures, and fluid animations.',
        relatedProjects: ['SaaS Analytics Dashboard', 'Portfolio OS'],
      },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Databases',
    icon: Server,
    description: 'Scalable REST APIs, authentication layers, microservices, and database persistence.',
    items: [
      {
        name: 'Node.js & Express.js',
        proficiency: 'Production Core',
        experienceYears: '2.5+ yrs',
        usageContext: 'RESTful API endpoints, middleware pipelines, JWT auth, and business logic processing.',
        relatedProjects: ['GymBot Backend', 'Bus Brake Calipers System', 'SWOO', 'Kanban Board'],
      },
      {
        name: 'MongoDB & Mongoose',
        proficiency: 'Production Core',
        experienceYears: '2.5+ yrs',
        usageContext: 'NoSQL document schemas, aggregation pipelines, indexes, and relationship modeling.',
        relatedProjects: ['GymBot', 'Project Management System', 'Bus Spare Parts'],
      },
      {
        name: 'RESTful API Design',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'Stateless endpoints, standard HTTP status handling, pagination, and error validation.',
        relatedProjects: ['Bus Management API', 'SWOO Backend', 'Payment API'],
      },
      {
        name: 'PostgreSQL & SQL',
        proficiency: 'Proficient',
        experienceYears: '1.5+ yrs',
        usageContext: 'Relational data models, SQL queries, joins, and ACID transactional integrity.',
        relatedProjects: ['Academic Capstone DBs'],
      },
      {
        name: 'Spring Boot & Java',
        proficiency: 'Proficient',
        experienceYears: '1+ yrs',
        usageContext: 'Object-oriented backend design, Spring dependency injection, and MVC architecture.',
        relatedProjects: ['Academic Enterprise Apps'],
      },
    ],
  },
  {
    id: 'ai',
    category: 'AI & Intelligent Systems',
    icon: Sparkles,
    description: 'Generative AI integrations, large language models, voice input, and computer vision algorithms.',
    items: [
      {
        name: 'Google Gemini 2.5 API',
        proficiency: 'Integrated',
        experienceYears: '1+ yrs',
        usageContext: 'Structured JSON generation for AI fitness splits, macro calculators, and conversational coach.',
        relatedProjects: ['GymBot AI Health Coach'],
      },
      {
        name: 'Whisper Voice API',
        proficiency: 'Integrated',
        experienceYears: '1+ yrs',
        usageContext: 'Speech-to-text audio pipeline for operator voice entry in industrial bus maintenance.',
        relatedProjects: ['Smart Bus Platform'],
      },
      {
        name: 'MobileNet Vision Models',
        proficiency: 'Integrated',
        experienceYears: '1+ yrs',
        usageContext: 'Computer vision spare-parts detection and automatic serial number logging.',
        relatedProjects: ['Brake Calipers Platform'],
      },
      {
        name: 'Llama LLM Orchestration',
        proficiency: 'Integrated',
        experienceYears: '1+ yrs',
        usageContext: 'Local and cloud prompt engineering for workflow assistant logs.',
        relatedProjects: ['Smart Maintenance Helper'],
      },
    ],
  },
  {
    id: 'devops',
    category: 'DevOps & Workstation',
    icon: Terminal,
    description: 'Containerization, Linux workstation workflows, source control, and deployment pipelines.',
    items: [
      {
        name: 'Linux / Ubuntu Environment',
        proficiency: 'Advanced',
        experienceYears: '3+ yrs',
        usageContext: 'Primary developer workstation OS, Bash scripting, system permissions, and package management.',
        relatedProjects: ['Portfolio OS', 'Local Dev Workstations'],
      },
      {
        name: 'Docker & Containers',
        proficiency: 'Proficient',
        experienceYears: '1.5+ yrs',
        usageContext: 'Containerizing Node/React apps, multi-container Docker Compose stacks.',
        relatedProjects: ['Full-Stack Microservices'],
      },
      {
        name: 'Git & GitHub',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'Branching workflows, pull requests, semantic commits, and team version control.',
        relatedProjects: ['All 10+ Repositories'],
      },
      {
        name: 'CI/CD & Cloud Hosting',
        proficiency: 'Advanced',
        experienceYears: '2+ yrs',
        usageContext: 'Vercel automated deployments, GitHub Pages, Postman API testing suites.',
        relatedProjects: ['Swoo on Vercel', 'Portfolio Deployment'],
      },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Ecosystem',
    icon: Wrench,
    description: 'Development tooling, state management libraries, API inspection, and design handoff.',
    items: [
      {
        name: 'Zustand & Context API',
        proficiency: 'Production Core',
        experienceYears: '2+ yrs',
        usageContext: 'Global state orchestration without boilerplate, tab & window state stores.',
        relatedProjects: ['Portfolio OS', 'Kanban Board'],
      },
      {
        name: 'Figma to Code',
        proficiency: 'Advanced',
        experienceYears: '2+ yrs',
        usageContext: 'Translating UI/UX mockups into pixel-perfect, accessible, and responsive components.',
        relatedProjects: ['NovaSon', 'EstateAI'],
      },
      {
        name: 'Postman & REST Client',
        proficiency: 'Production Core',
        experienceYears: '3+ yrs',
        usageContext: 'API testing, environment variables, authentication header simulation.',
        relatedProjects: ['Bus Management APIs', 'GymBot'],
      },
      {
        name: 'Agile / Scrum Methodologies',
        proficiency: 'Advanced',
        experienceYears: '2+ yrs',
        usageContext: 'Sprint planning, user story decomposition, Kanban boards, and iterative delivery.',
        relatedProjects: ['Internship Team Sprints', 'Project Management App'],
      },
    ],
  },
];

const proficiencyColors: Record<string, { bg: string; text: string; border: string }> = {
  'Production Core': {
    bg: 'rgba(233, 78, 27, 0.18)',
    text: '#FF6433',
    border: 'rgba(233, 78, 27, 0.35)',
  },
  'Advanced': {
    bg: 'rgba(34, 197, 94, 0.15)',
    text: '#4ADE80',
    border: 'rgba(34, 197, 94, 0.3)',
  },
  'Proficient': {
    bg: 'rgba(59, 130, 246, 0.15)',
    text: '#60A5FA',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  'Integrated': {
    bg: 'rgba(168, 85, 247, 0.15)',
    text: '#C084FC',
    border: 'rgba(168, 85, 247, 0.3)',
  },
};

const Skills: React.FC = () => {
  const { theme, openWindow } = useAppStore();
  const currentTheme = themes[theme];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('frontend');

  const activeCategory =
    techInventory.find((cat) => cat.id === selectedCategoryId) || techInventory[0];

  return (
    <div
      className="h-full p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: currentTheme.cardBorder }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📊</span>
              <h1 className="text-2xl font-bold">Skills & System Monitor</h1>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                }}
              >
                Technology Inventory
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-70">
              Structured engineering competencies, framework proficiencies, and practical project application context.
            </p>
          </div>

          <button
            onClick={() => openWindow('terminal')}
            className="text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
            style={{
              backgroundColor: `${currentTheme.accent}15`,
              color: currentTheme.accent,
              border: `1px solid ${currentTheme.accent}30`,
            }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>terminal: $ stack</span>
          </button>
        </div>

        {/* Workstation Engine Hardware-Style Status Gauges (Visual / Decorative Developer Metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Core Specialization', value: 'Full-Stack Web', sub: 'React + Node.js + TS', icon: Code2 },
            { label: 'Engineering Experience', value: '3+ Years', sub: 'Frontend & Backend', icon: Activity },
            { label: 'Database & Cloud', value: 'MongoDB / SQL', sub: 'REST APIs & Docker', icon: HardDrive },
            { label: 'AI Integrations', value: 'Gemini + LLMs', sub: 'Vision & Speech APIs', icon: Sparkles },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: `${currentTheme.accent}08`,
                borderColor: `${currentTheme.accent}20`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium opacity-60 uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="w-4 h-4 opacity-75" style={{ color: currentTheme.accent }} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>
                  {stat.value}
                </p>
                <p className="text-[11px] font-mono opacity-60 truncate mt-0.5" style={{ color: currentTheme.accent }}>
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b" style={{ borderColor: currentTheme.cardBorder }}>
          {techInventory.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive ? 'scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive ? currentTheme.accent : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#ffffff' : currentTheme.textPrimary,
                  border: `1px solid ${isActive ? currentTheme.accent : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.category}</span>
                <span
                  className="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
                  style={{
                    backgroundColor: isActive ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {cat.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div
          className="p-3.5 rounded-xl border flex items-center gap-3 text-xs opacity-85"
          style={{
            backgroundColor: `${currentTheme.accent}0D`,
            borderColor: `${currentTheme.accent}20`,
          }}
        >
          <activeCategory.icon className="w-5 h-5 shrink-0" style={{ color: currentTheme.accent }} />
          <p>{activeCategory.description}</p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCategory.items.map((item, idx) => {
            const color = proficiencyColors[item.proficiency] || proficiencyColors['Production Core'];

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="p-4 sm:p-5 rounded-xl border flex flex-col justify-between transition-all hover:shadow-lg hover:border-orange-500/40"
                style={{
                  backgroundColor: `${currentTheme.accent}0A`,
                  borderColor: `${currentTheme.accent}20`,
                }}
              >
                <div>
                  {/* Top Bar with Name & Proficiency Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base tracking-tight" style={{ color: currentTheme.textPrimary }}>
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-mono opacity-60">
                        Experience: {item.experienceYears}
                      </span>
                    </div>

                    <span
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider shrink-0"
                      style={{
                        backgroundColor: color.bg,
                        color: color.text,
                        border: `1px solid ${color.border}`,
                      }}
                    >
                      {item.proficiency}
                    </span>
                  </div>

                  {/* Usage Context */}
                  <p className="text-xs opacity-80 leading-relaxed mb-3">
                    {item.usageContext}
                  </p>
                </div>

                {/* Related Projects Links */}
                {item.relatedProjects.length > 0 && (
                  <div className="pt-3 border-t mt-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono opacity-50 uppercase">Implemented in:</span>
                      {item.relatedProjects.map((proj) => (
                        <button
                          key={proj}
                          onClick={() => openWindow('projects')}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 font-medium transition-colors"
                        >
                          {proj}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
