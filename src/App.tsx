import { Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/Theming/theme-provider";
import Navigation from "./components/nav";
import Register from "./components/Register";
import LoginForm from "./components/Login-form";
import LandingPage from "./components/LandingPAge";
import Page from "./app/dashboard/page";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <main className="h-[99vh]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Navigation />}>
            <Route
              path="/login"
              element={<LoginForm className="mx-auto mt-2 h-full max-w-96" />}
            />
            <Route
              path="/signup"
              element={<Register className="mx-auto mt-2 h-full max-w-96" />}
            />
            <Route path="/app/:id?" element={<Page />} />
          </Route>
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
