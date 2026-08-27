import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Dumbbell,
  BookOpen,
  Trophy,
  Globe,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';
import me from './me.jpg';
import { downloadPdfResume } from '@/lib/downloadResume';

const About: React.FC = () => {
  const { theme, openWindow, addNotification, quickLaunchRecruiter } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <div
      className="h-full p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Workstation Hero */}
        <div
          className="rounded-2xl border p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl"
          style={{
            backgroundColor: `${currentTheme.accent}0D`,
            borderColor: `${currentTheme.accent}25`,
          }}
        >
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 shadow-2xl p-1"
              style={{
                backgroundColor: currentTheme.windowHeader,
                borderColor: currentTheme.accent,
              }}
            >
              <img
                src={me}
                alt="Mohamed El Ouardi"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500 text-black shadow-md flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              Available
            </div>
          </div>

          {/* Profile Main Meta */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>
                  Mohamed El Ouardi
                </h1>
                <p className="text-base sm:text-lg font-semibold mt-0.5" style={{ color: currentTheme.accent }}>
                  Full-Stack Software Engineer
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 md:pt-0">
                <button
                  onClick={async () => {
                    addNotification('📥 Downloading Mohamed_El_Ouardi_CV.pdf to your device...', 'info');
                    const ok = await downloadPdfResume();
                    if (ok) addNotification('✅ PDF Resume downloaded successfully!', 'success');
                  }}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm active:scale-95"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: '#ffffff',
                  }}
                  title="Download PDF to computer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV (PDF)</span>
                </button>
                <button
                  onClick={() => openWindow('files')}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105 flex items-center gap-1.5"
                  title="Open in Workstation File & Document Viewer"
                >
                  <FileText className="w-3.5 h-3.5 opacity-80" />
                  <span>View in App</span>
                </button>
                <button
                  onClick={() => openWindow('contact')}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                >
                  <span>Contact</span>
                </button>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs opacity-80 mt-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                Sousse, Tunisia
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-green-400" />
                Open to Remote & On-Site
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                ISITCom Hammam Sousse
              </span>
            </div>

            {/* Bio Summary */}
            <p className="text-xs sm:text-sm opacity-90 leading-relaxed mt-4">
              Graduate in Computer Science from the Higher Institute of Communication and Computer Science (ISITCom Hammam Sousse), specializing in web development. Passionate about building robust full-stack architectures, high-converting digital products, and intelligent AI integrations.
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Education & Language / Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Education & Internships Highlight */}
          <div
            className="p-5 rounded-2xl border space-y-4"
            style={{
              backgroundColor: `${currentTheme.accent}08`,
              borderColor: `${currentTheme.accent}20`,
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: currentTheme.cardBorder }}>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" style={{ color: currentTheme.accent }} />
                <h3 className="font-bold text-sm sm:text-base">Education & Degrees</h3>
              </div>
              <button
                onClick={() => openWindow('experience')}
                className="text-[11px] font-semibold flex items-center gap-1 hover:underline opacity-80"
                style={{ color: currentTheme.accent }}
              >
                <span>View Timeline</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-semibold">
                  <span>Bachelor's Degree in Computer Science</span>
                  <span className="text-[11px] font-mono opacity-60">2023 – 2026</span>
                </div>
                <p className="opacity-75 text-xs">Institut Supérieur d'Informatique et des Technologies de Communication (ISITCom)</p>
                <span className="text-[11px] font-semibold text-orange-400 block pt-1">Specialization: Web Development</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center justify-between font-semibold">
                  <span>Baccalaureate in Computer Science</span>
                  <span className="text-[11px] font-mono opacity-60">2022 – 2023</span>
                </div>
                <p className="opacity-75 text-xs">Lycée Ali Bourguiba, Al Qalah al Kubra</p>
              </div>
            </div>
          </div>

          {/* Right Column: Languages & Personal Interests */}
          <div
            className="p-5 rounded-2xl border space-y-4"
            style={{
              backgroundColor: `${currentTheme.accent}08`,
              borderColor: `${currentTheme.accent}20`,
            }}
          >
            <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: currentTheme.cardBorder }}>
              <Sparkles className="w-5 h-5" style={{ color: currentTheme.accent }} />
              <h3 className="font-bold text-sm sm:text-base">Languages & Interests</h3>
            </div>

            {/* Languages */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-2">
                Languages
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { lang: 'English', level: 'Professional Fluency', code: 'EN' },
                  { lang: 'French', level: 'Professional Working', code: 'FR' },
                  { lang: 'Arabic', level: 'Native', code: 'AR' },
                ].map((item) => (
                  <div
                    key={item.lang}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center"
                  >
                    <span className="text-xs font-bold block">{item.lang}</span>
                    <span className="text-[10px] opacity-60 block mt-0.5">{item.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-2">
                Personal Interests & Hobbies
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Gym & Fitness', icon: Dumbbell },
                  { name: 'Tech Reading', icon: BookOpen },
                  { name: 'Chess & Strategy', icon: Trophy },
                ].map((interest) => (
                  <div
                    key={interest.name}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-1.5 text-center"
                  >
                    <interest.icon className="w-4 h-4" style={{ color: currentTheme.accent }} />
                    <span className="text-xs font-medium">{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Connect Footer */}
        <div
          className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: `${currentTheme.accent}0A`,
            borderColor: `${currentTheme.accent}20`,
          }}
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold">Connect with Mohamed</h4>
            <p className="text-xs opacity-70">Direct contact channels & online engineering profiles</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a
              href="https://github.com/mohamedwardi068"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold transition-all hover:scale-105"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-wardi-69502b324/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-[#60a5fa] border border-[#0a66c2]/40 text-xs font-semibold transition-all hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:Mohamed.ouardi@isitc.u-sousse.tn"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: currentTheme.accent,
                color: '#ffffff',
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Me</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

