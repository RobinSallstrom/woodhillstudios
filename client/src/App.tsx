// App.tsx — Woodhill Studios
// Single long-scroll page: / (Hero → About → Artists → Contact)
// Plus /media admin route

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import MediaManager from "./pages/MediaManager";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/media" component={MediaManager} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster
            toastOptions={{
              style: {
                background: '#F2EFE9',
                border: '1px solid rgba(10,10,10,0.1)',
                color: '#0A0A0A',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
              },
            }}
          />
          <CustomCursor />
          <Navigation />
          <main>
            <Router />
          </main>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
