import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { User, Lock, Zap, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import me from '@/apps/About/costumepic.png';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const { login, quickLaunchRecruiter } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center p-6 z-[150] select-none"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(42, 6, 41, 0.95) 0%, #170018 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="flex flex-col items-center max-w-sm w-full text-center"
      >
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500 shadow-2xl p-0.5 bg-[#2A0629]">
            <img
              src={me}
              alt="Mohamed El Ouardi"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#170018] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Username */}
        <h2 className="text-white text-2xl font-bold tracking-tight">Mohamed El Ouardi</h2>
        <p className="text-xs text-orange-400 font-mono mt-0.5 mb-6">Full-Stack Software Engineer</p>

        {/* Primary 1-Click Quick Launch Button (Recruiter Friendly) */}
        <button
          onClick={() => quickLaunchRecruiter('projects')}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#E94E1B] to-[#FF6433] text-white font-bold text-sm shadow-xl hover:shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
        >
          <Zap className="w-4 h-4" />
          <span>Quick Launch (Explore Workstation)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Optional Password Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          <div className="relative w-full">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Session password (or press Enter)"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.07] backdrop-blur-md text-white placeholder-neutral-400 border border-white/15 focus:outline-none focus:border-[#E94E1B] text-xs transition-colors"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            Enter Workstation Session
          </button>
        </form>

        <p className="text-neutral-400 text-xs mt-6 flex items-center gap-1.5 opacity-80">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          <span>Interactive Linux OS • Portfolio v2.0</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginScreen;

