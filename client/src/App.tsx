// App.tsx — Woodhill Studios
// Off-white / Black / Teal palette
// WebGL Three.js page transition (Tao Tajima texture-blend style)

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState, useCallback, useRef } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import { WebGLTransition } from "./components/WebGLTransition";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import About from "./pages/About";
import Contact from './pages/Contact';
import MediaManager from './pages/MediaManager';
import NotFound from "./pages/NotFound";

// ── Transition Context ─────────────────────────────────────────────────────────
interface TransitionContextValue {
  triggerTransition: (snapshot: string | null, onDone: () => void) => void;
}

export const TransitionContext = createContext<TransitionContextValue>({
  triggerTransition: (_snap, onDone) => onDone(),
});

export function useTransition() {
  return useContext(TransitionContext);
}

// ── Page Fade (incoming page) ──────────────────────────────────────────────────
function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// ── Router ─────────────────────────────────────────────────────────────────────
function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">
          <PageFade><Home /></PageFade>
        </Route>
        <Route path="/artists/:id">
          {() => <PageFade><ArtistDetail /></PageFade>}
        </Route>
        <Route path="/artists">
          <PageFade><Artists /></PageFade>
        </Route>
        <Route path="/about">
          <PageFade><About /></PageFade>
        </Route>
        <Route path="/contact">
          <PageFade><Contact /></PageFade>
        </Route>
        <Route path="/media">
          <PageFade><MediaManager /></PageFade>
        </Route>
        <Route>
          <PageFade><NotFound /></PageFade>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string | null>(null);
  const pendingNavRef = useRef<(() => void) | null>(null);

  const triggerTransition = useCallback((snapshot: string | null, onDone: () => void) => {
    // Store the navigation callback to fire when WebGL transition completes
    pendingNavRef.current = onDone;
    setSnapshotDataUrl(snapshot);
    setIsTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    // Fire the actual navigation
    if (pendingNavRef.current) {
      pendingNavRef.current();
      pendingNavRef.current = null;
    }
    // Small delay so the incoming page can render before we hide the canvas
    setTimeout(() => {
      setIsTransitioning(false);
      setSnapshotDataUrl(null);
    }, 120);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster
            theme="light"
            toastOptions={{
              style: {
                background: '#F2EFE9',
                border: '1px solid rgba(10,10,10,0.10)',
                color: '#0A0A0A',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
              },
            }}
          />

          {/* Global overlays */}
          <GrainOverlay />
          <CustomCursor />

          {/* WebGL transition canvas — sits above everything */}
          <WebGLTransition
            isTransitioning={isTransitioning}
            snapshotDataUrl={snapshotDataUrl}
            onComplete={handleTransitionComplete}
          />

          {/* Main layout */}
          <TransitionContext.Provider value={{ triggerTransition }}>
            <div className="flex min-h-screen bg-[#F2EFE9]">
              <Navigation />
              <main className="flex-1 min-w-0">
                <Router />
              </main>
            </div>
          </TransitionContext.Provider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
