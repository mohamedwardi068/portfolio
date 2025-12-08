import { useAppStore } from '@/stores/useAppStore';
import { AnimatePresence } from 'framer-motion';
import Desktop from '@/components/Desktop/Desktop';
import BootScreen from '@/components/BootScreen/BootScreen';
import LoginScreen from '@/components/LoginScreen/LoginScreen';

const Index = () => {
  const { isBooting, isLoggedIn } = useAppStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isBooting && <BootScreen key="boot" />}
        {!isBooting && !isLoggedIn && <LoginScreen key="login" />}
        {!isBooting && isLoggedIn && <Desktop key="desktop" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
