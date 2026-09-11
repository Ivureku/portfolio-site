import StatusBar from '@/components/layout/StatusBar';
import SiteFooter from '@/components/layout/SiteFooter';
import Intro from '@/components/sections/Intro';
import Trajectory from '@/components/sections/Trajectory';
import Work from '@/components/sections/Work';
import Toolkit from '@/components/sections/Toolkit';
import Contact from '@/components/sections/Contact';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotionSync } from '@/hooks/useReducedMotionSync';
import { useThemeSync } from '@/hooks/useThemeSync';

const App = () => {
  useReducedMotionSync();
  useThemeSync();
  useScrollProgress();
  useActiveSection();

  return (
    <>
      <a
        href="#trajectory"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <StatusBar />
      <main id="main">
        <Intro />
        <Trajectory />
        <Work />
        <Toolkit />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
