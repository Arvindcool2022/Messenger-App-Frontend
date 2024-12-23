import { useAllUsers } from "@/app/main/hooks/useAllUsers";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: alluserData, error } = useAllUsers();

  useEffect(() => {
    if (alluserData && ["/signup", "/login"].includes(location.pathname))
      navigate("/app");

    if (error && location.pathname.startsWith("/app")) navigate("/login");
  }, [alluserData, error, location.pathname, navigate]);
  return null;
};
