// App.tsx — Woodhill Studios
// Off-white / Black / Teal palette
// Routes: / | /artists | /artists/:id | /about | /contact | /media

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import WarpTransition from "./components/WarpTransition";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import About from "./pages/About";
import Contact from './pages/Contact';
import MediaManager from './pages/MediaManager';
import NotFound from "./pages/NotFound";

function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">
          <PageFade><Home /></PageFade>
        </Route>
        <Route path="/artists/:id">
          {() => (
            <PageFade><ArtistDetail /></PageFade>
          )}
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

function App() {
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

          {/* Main layout */}
          <div className="flex min-h-screen bg-[#F2EFE9]">
            <Navigation />
            <main className="flex-1 min-w-0">
              <WarpTransition>
                <Router />
              </WarpTransition>
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
