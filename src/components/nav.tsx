import { NavLink, Outlet } from "react-router";
import { ThemeToggle } from "./Theming/theme-toggle";

const Navigation = () => {
  return (
    <>
      <div className="absolute right-5 top-5">
        {/* <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          Home
        </NavLink> */}
        <ThemeToggle className="shadow-none" />
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
