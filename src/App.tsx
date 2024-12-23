import { Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/Theming/theme-provider";
import Navigation from "./components/nav";
import LandingPage from "./components/LandingPage";
import Dashboard from "./app/main";
import LoginPage from "./app/login";
import SignupPage from "./app/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { AuthRedirect } from "./app/Authredirect";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <main className="h-[99vh]">
          <AuthRedirect />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<Navigation />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/app/:id?" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Toaster closeButton richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
