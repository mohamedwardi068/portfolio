import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiCalendar } from 'react-icons/fi';
import me from './me.jpg';

const About = () => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = themes[theme];

  return (
    <div
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div
            className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: `${currentTheme.accent}33` }}
          >
            <img
              src={me}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">Mohamed El Ouardi</h1>
            <p
              className="text-xl mb-3"
              style={{ color: currentTheme.accent }}
            >
              Full-Stack Developer
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-sm opacity-70">
              <span className="flex items-center gap-1">
                <FiMapPin className="w-4 h-4" />
                Sousse, Tunisia
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                3+ years exp
              </span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <h2
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: `${currentTheme.textSecondary}33` }}
          >
            About Me
          </h2>
          <p className="leading-relaxed opacity-90">
            I'm a passionate full-stack developer with over 5 years of experience building
            scalable web applications. I specialize in React, TypeScript, and Node.js, with
            a strong foundation in cloud technologies and DevOps practices.
          </p>
          <p className="leading-relaxed opacity-90 mt-4">
            When I'm not coding, you'll find me contributing to open-source projects,
            writing technical blog posts, or exploring new technologies. I believe in
            writing clean, maintainable code and creating user experiences that delight.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Projects', value: '30+' },
            { label: 'Clients', value: '10+' },
            { label: 'Commits', value: '1000+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: `${currentTheme.accent}15` }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: currentTheme.accent }}
              >
                {stat.value}
              </div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div>
          <h2
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: `${currentTheme.textSecondary}33` }}
          >
            Connect
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: FiGithub, label: 'GitHub', href: 'https://github.com/mohamedwardi068' },
              { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-wardi-69502b324/' },
              {
                icon: FiMail,
                label: 'Email',
                href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Mohamed.ouardi@isitc.u-sousse.tn'
              }

            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"                      // OPEN IN NEW TAB
                rel="noopener noreferrer"            // SECURITY
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: `${currentTheme.accent}22` }}
              >
                <social.icon className="w-5 h-5" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
