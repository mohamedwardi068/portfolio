import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, AppId } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { X, Minus, Square, Copy } from 'lucide-react';

interface UbuntuWindowProps {
  appId: AppId;
  title: string;
  children: React.ReactNode;
}

const UbuntuWindow: React.FC<UbuntuWindowProps> = ({ appId, title, children }) => {
  const {
    windows,
    activeWindow,
    theme,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useAppStore();

  const windowState = windows[appId];
  const currentTheme = themes[theme];
  const rndRef = useRef<Rnd>(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) return null;

  const isFocused = activeWindow === appId;
  const isMaximized = windowState.isMaximized || isMobile;

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

  return (
    <AnimatePresence>
      <Rnd
        ref={rndRef}
        position={isMaximized ? { x: 0, y: 0 } : windowState.position}
        size={
          isMaximized
            ? {
                width: isMobile ? '100vw' : 'calc(100vw - 4rem)',
                height: isMobile ? 'calc(100vh - 6rem)' : 'calc(100vh - 2.5rem)',
              }
            : windowState.size
        }
        onDragStop={(e, d) => {
          if (!isMaximized) {
            updateWindowPosition(appId, { x: Math.max(0, d.x), y: Math.max(0, d.y) });
          }
        }}
        onResizeStop={(e, dir, ref, delta, position) => {
          if (!isMaximized) {
            updateWindowSize(appId, {
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            });
            updateWindowPosition(appId, position);
          }
        }}
        dragHandleClassName="ubuntu-window-drag-handle"
        minWidth={isMobile ? 320 : 480}
        minHeight={isMobile ? 300 : 360}
        bounds="parent"
        style={{ zIndex: windowState.zIndex }}
        disableDragging={isMaximized}
        enableResizing={!isMaximized}
        onMouseDown={() => focusWindow(appId)}
        onTouchStart={() => focusWindow(appId)}
        className="touch-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className={`w-full h-full rounded-none md:rounded-2xl overflow-hidden flex flex-col transition-shadow duration-200 ${
            isFocused ? 'shadow-2xl' : 'shadow-lg opacity-95'
          }`}
          style={{
            backgroundColor: currentTheme.windowBg,
            border: isMobile
              ? 'none'
              : `1px solid ${isFocused ? currentTheme.windowBorderFocused : currentTheme.windowBorder}`,
            boxShadow: isFocused
              ? `0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 15px ${currentTheme.accentGlow}`
              : '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Ubuntu Style Window Header */}
          <div
            onDoubleClick={handleMaximize}
            className="ubuntu-window-drag-handle h-9 sm:h-10 flex items-center justify-between px-3 sm:px-4 select-none cursor-move shrink-0 border-b transition-colors"
            style={{
              backgroundColor: isFocused ? currentTheme.windowHeader : `${currentTheme.windowHeader}CC`,
              borderColor: currentTheme.cardBorder,
            }}
          >
            {/* Window Traffic Light Controls (Ubuntu Left / Classic style) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className="w-3.5 h-3.5 rounded-full bg-[#E95420] hover:bg-[#FF3800] transition-transform active:scale-90 flex items-center justify-center group"
                title="Close"
                aria-label="Close"
              >
                <X className="w-2.5 h-2.5 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
              </button>
              <button
                onClick={handleMinimize}
                className="w-3.5 h-3.5 rounded-full bg-[#E5A50A] hover:bg-[#FFC107] transition-transform active:scale-90 flex items-center justify-center group"
                title="Minimize"
                aria-label="Minimize"
              >
                <Minus className="w-2.5 h-2.5 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
              </button>
              <button
                onClick={handleMaximize}
                className="w-3.5 h-3.5 rounded-full bg-[#26A269] hover:bg-[#2EC27E] transition-transform active:scale-90 flex items-center justify-center group hidden sm:flex"
                title={isMaximized ? 'Restore' : 'Maximize'}
                aria-label="Maximize"
              >
                {isMaximized ? (
                  <Copy className="w-2 h-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
                ) : (
                  <Square className="w-2 h-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
                )}
              </button>
            </div>

            {/* Window Title */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold truncate px-2">
              <span
                style={{
                  color: isFocused ? currentTheme.textPrimary : currentTheme.textSecondary,
                }}
              >
                {title}
              </span>
            </div>

            {/* Right Action Hint / Spacer */}
            <div className="w-12 flex justify-end">
              <span className="text-[10px] font-mono opacity-30 hidden sm:inline">
                {isMaximized ? 'MAX' : 'WIN'}
              </span>
            </div>
          </div>

          {/* Window Body */}
          <div
            className="flex-1 overflow-auto relative"
            style={{ backgroundColor: currentTheme.windowBg }}
          >
            {children}
          </div>
        </motion.div>
      </Rnd>
    </AnimatePresence>
  );
};

export default UbuntuWindow;

