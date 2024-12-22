import { Outlet } from "react-router";
import { ThemeToggle } from "./Theming/theme-toggle";

const Navigation = () => {
  return (
    <>
      <ThemeToggle className="absolute right-5 top-5 z-10 shadow-none" />
      <Outlet />
    </>
  );
};

export default Navigation;
