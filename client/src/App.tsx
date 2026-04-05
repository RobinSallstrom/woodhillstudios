// App.tsx — Woodhill Studios
// Underground Cinema Design System
// Routes: / | /artists | /artists/:id | /about | /contact

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import About from "./pages/About";
import Contact from './pages/Contact';
import MediaManager from './pages/MediaManager';
import NotFound from "./pages/NotFound";

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45 }}
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
          <PageTransition><Home /></PageTransition>
        </Route>
        <Route path="/artists/:id">
          {() => (
            <PageTransition><ArtistDetail /></PageTransition>
          )}
        </Route>
        <Route path="/artists">
          <PageTransition><Artists /></PageTransition>
        </Route>
        <Route path="/about">
          <PageTransition><About /></PageTransition>
        </Route>
        <Route path="/contact">
          <PageTransition><Contact /></PageTransition>
        </Route>
        <Route path="/media">
          <PageTransition><MediaManager /></PageTransition>
        </Route>
        <Route>
          <PageTransition><NotFound /></PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: '#111',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E8E0D5',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
              },
            }}
          />
          <CustomCursor />
          <div className="flex min-h-screen bg-[#050505]">
            <Navigation />
            <main className="flex-1 min-w-0">
              <Router />
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
