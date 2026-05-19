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

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
