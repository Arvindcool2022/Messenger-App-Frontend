import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.PROD) navigate("/login");
  }, []);

  return (
    <>
      <h1 className="text-6xl">Some landing page</h1>
      <NavLink to="/signup" end className="underline underline-offset-4">
        Register
      </NavLink>
      {"  "}
      <NavLink to="/login" end className="underline underline-offset-4">
        login
      </NavLink>
      {"  "}
      <NavLink to="/app" end className="underline underline-offset-4">
        app
      </NavLink>
    </>
  );
};

export default LandingPage;
