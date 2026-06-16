import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ResumePage from "@/pages/ResumePage";
import ProjectDetailRoute from "@/pages/ProjectDetailRoute";

const queryClient = new QueryClient();

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnalyticsPageViews() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.gtag?.("config", "G-JWBTSJX7CH", {
      page_path: `${pathname}${window.location.search}${window.location.hash}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsPageViews />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/projects/:slug" component={ProjectDetailRoute} />
        <Route path="/resume" component={ResumePage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          ssrPath={ssrPath}
          base={import.meta.env.BASE_URL.replace(/\/$/, "")}
        >
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
