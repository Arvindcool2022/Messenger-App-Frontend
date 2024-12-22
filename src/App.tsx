import { Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/Theming/theme-provider";
import Navigation from "./components/nav";
import LandingPage from "./components/LandingPage";
import Dashboard from "./app/main";
import LoginPage from "./app/login";
import SignupPage from "./app/register";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <main className="h-[99vh]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Navigation />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/app/:id?" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
