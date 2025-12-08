import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { motion } from 'framer-motion';

import { Palette, Server, Rocket, Wrench } from 'lucide-react';

const skillCategories = [
  {
    category: 'Frontend',
    icon: Palette,
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 78 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    category: 'DevOps',
    icon: Rocket,
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 82 },
      { name: 'Kubernetes', level: 70 },
      { name: 'Terraform', level: 68 },
    ],
  },
  {
    category: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 95 },
      { name: 'VS Code', level: 92 },
      { name: 'Figma', level: 75 },
      { name: 'Linux', level: 85 },
      { name: 'Agile/Scrum', level: 88 },
    ],
  },
];

const Skills = () => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = themes[theme];

  return (
    <div
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <h1 className="text-2xl font-bold mb-6">Technical Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="rounded-xl p-5"
            style={{ backgroundColor: `${currentTheme.accent}10` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-8 h-8" />
              <h2 className="text-lg font-semibold">{category.category}</h2>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span style={{ color: currentTheme.accent }}>{skill.level}%</span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${currentTheme.accent}20` }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: currentTheme.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Skills Tags */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Other Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Redux', 'Zustand', 'React Query', 'Jest', 'Cypress',
            'Storybook', 'Webpack', 'Vite', 'ESLint', 'Prettier',
            'Redis', 'RabbitMQ', 'Nginx', 'GitHub Actions', 'Vercel'
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: `${currentTheme.accent}20`,
                color: currentTheme.textPrimary,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
