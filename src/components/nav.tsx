import { Outlet } from "react-router";
import { ThemeToggle } from "./Theming/theme-toggle";

const Navigation = () => {
  return (
    <>
      <ThemeToggle className="fixed right-5 top-5 z-50 shadow-none" />
      <Outlet />
    </>
  );
};

export default Navigation;
