import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';

const BootScreen = () => {
  const [progress, setProgress] = useState(0);
  const finishBooting = useAppStore((state) => state.finishBooting);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => finishBooting(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [finishBooting]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#2C001E] flex flex-col items-center justify-center z-[200]"
    >
      {/* Ubuntu Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-[#DD4814]"
        >
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle cx="60" cy="20" r="12" fill="currentColor" />
          <circle cx="25" cy="80" r="12" fill="currentColor" />
          <circle cx="95" cy="80" r="12" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-3xl font-light mb-8 tracking-wider"
      >
        ubuntu
      </motion.h1>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          className="h-full bg-[#DD4814] rounded-full"
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/60 text-sm mt-4"
      >
        Loading system...
      </motion.p>
    </motion.div>
  );
};

export default BootScreen;
