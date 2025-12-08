import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, AppId } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi';

interface UbuntuWindowProps {
  appId: AppId;
  title: string;
  children: React.ReactNode;
}

const UbuntuWindow = ({ appId, title, children }: UbuntuWindowProps) => {
  const {
    windows,
    theme,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useAppStore();

  const window = windows[appId];
  const currentTheme = themes[theme];
  const rndRef = useRef<Rnd>(null);

  if (window.isMinimized) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(appId);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(appId);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeWindow(appId);
  };

  const windowStyle = window.isMaximized
    ? { x: 0, y: 0, width: '100%', height: 'calc(100vh - 32px)' }
    : {
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <AnimatePresence>
      <Rnd
        ref={rndRef}
        position={window.isMaximized ? { x: 0, y: 0 } : window.position}
        size={
          window.isMaximized
            ? { width: '100%', height: 'calc(100vh - 32px)' }
            : window.size
        }
        onDragStop={(e, d) => {
          if (!window.isMaximized) {
            updateWindowPosition(appId, { x: d.x, y: d.y });
          }
        }}
        onResizeStop={(e, dir, ref, delta, position) => {
          if (!window.isMaximized) {
            updateWindowSize(appId, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
            });
            updateWindowPosition(appId, position);
          }
        }}
        dragHandleClassName="window-drag-handle"
        minWidth={400}
        minHeight={300}
        bounds="parent"
        style={{ zIndex: window.zIndex }}
        disableDragging={window.isMaximized}
        enableResizing={!window.isMaximized}
        onMouseDown={() => focusWindow(appId)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full h-full rounded-xl overflow-hidden shadow-2xl flex flex-col"
          style={{ backgroundColor: currentTheme.windowBg }}
        >
          {/* Title Bar */}
          <div
            className="window-drag-handle h-10 flex items-center justify-between px-4 cursor-move"
            style={{ backgroundColor: currentTheme.windowHeader }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              >
                <FiX className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              >
                <FiMinus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={handleMaximize}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
              >
                <FiMaximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <span
              className="text-sm font-medium absolute left-1/2 -translate-x-1/2"
              style={{ color: currentTheme.textPrimary }}
            >
              {title}
            </span>
            <div className="w-16" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </motion.div>
      </Rnd>
    </AnimatePresence>
  );
};

export default UbuntuWindow;
