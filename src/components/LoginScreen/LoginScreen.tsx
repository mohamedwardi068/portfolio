import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { FiUser, FiLock } from 'react-icons/fi';

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const login = useAppStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      login();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-[150]"
      style={{
        background: 'linear-gradient(135deg, #2C001E 0%, #5E2750 50%, #DD4814 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center"
      >
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DD4814] to-[#E95420] flex items-center justify-center mb-6 shadow-2xl">
          <FiUser className="w-16 h-16 text-white" />
        </div>

        {/* Username */}
        <h2 className="text-white text-2xl font-light mb-8">Developer</h2>

        {/* Password Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (any key)"
              className="w-72 h-12 pl-12 pr-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[#DD4814] transition-colors"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="px-8 py-2 rounded-full bg-[#DD4814] text-white font-medium hover:bg-[#E95420] transition-colors"
          >
            Sign In
          </button>
        </motion.form>

        <p className="text-white/40 text-sm mt-8">
          Click Sign In or press Enter to continue
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginScreen;
