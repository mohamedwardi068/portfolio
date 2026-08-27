import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { Sparkles, FastForward, Zap } from 'lucide-react';

const bootLogs = [
  '[ OK ] Initializing Mohamed OS Kernel 6.8.0-generic...',
  '[ OK ] Loading Full-Stack Developer Profile & Credentials...',
  '[ OK ] Mounting 10+ Production Repositories & Demos...',
  '[ OK ] Initializing Ubuntu Workstation Desktop Environment...',
  '[ OK ] Mohamed Dev Workstation Ready.',
];

const BootScreen: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { finishBooting, quickLaunchRecruiter } = useAppStore();

  useEffect(() => {
    // Ultra-fast 1.2s total boot progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => finishBooting(), 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 220);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [finishBooting]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-[#170018] flex flex-col items-center justify-between p-6 sm:p-10 z-[200] select-none text-white"
    >
      {/* Top Quick Actions */}
      <div className="w-full max-w-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-400 font-bold">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>MOHAMED DEV WORKSTATION</span>
        </div>

        {/* Skip / Fast Recruiter Bypasses */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => quickLaunchRecruiter('projects')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E94E1B] text-white shadow-lg hover:bg-[#FF6433] transition-all hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5" />
            <span> Quick Launch (Recruiter)</span>
          </button>
          <button
            onClick={finishBooting}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/15 transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>
        </div>
      </div>

      {/* Center Logo & Progress */}
      <div className="flex flex-col items-center max-w-md w-full my-auto text-center">
        {/* Ubuntu Circle of Friends / Mohamed Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#E94E1B] to-[#5E2750] flex items-center justify-center shadow-2xl p-0.5">
            <div className="w-full h-full bg-[#170018] rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold font-mono text-orange-500">MO</span>
            </div>
          </div>
        </motion.div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
          Mohamed El Ouardi
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-mono">
          Full-Stack Software Engineer • Workstation OS
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-[#E94E1B] rounded-full shadow-[0_0_12px_#E94E1B]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Realtime Boot Log */}
        <div className="w-full text-left font-mono text-[11px] text-green-400/90 h-6 truncate">
          {bootLogs[logIndex]}
        </div>
      </div>

      {/* Footer System Specs */}
      <div className="w-full max-w-2xl text-center text-[10px] text-neutral-400 font-mono">
        Ubuntu Linux 24.04 LTS Architecture • React 19 Ecosystem • Sousse, Tunisia
      </div>
    </motion.div>
  );
};

export default BootScreen;

