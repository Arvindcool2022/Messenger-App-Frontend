import { useAllUsers } from "@/app/main/hooks/useAllUsers";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isError, isSuccess } = useAllUsers();

  useEffect(() => {
    if (["/signup", "/login"].includes(location.pathname) && !isError)
      navigate("/app");

    if (isError && location.pathname.startsWith("/app")) navigate("/login");
  }, [isSuccess, isError]);
  return null;
};
