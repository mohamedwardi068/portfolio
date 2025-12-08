import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiInfo, FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';

const NotificationCenter = () => {
  const { notifications, removeNotification, theme } = useAppStore();
  const currentTheme = themes[theme];

  const getIcon = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <FiAlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <FiInfo className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed top-12 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md"
            style={{ backgroundColor: currentTheme.windowBg }}
          >
            {getIcon(notification.type)}
            <span
              className="flex-1 text-sm"
              style={{ color: currentTheme.textPrimary }}
            >
              {notification.message}
            </span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <FiX
                className="w-4 h-4"
                style={{ color: currentTheme.textSecondary }}
              />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
