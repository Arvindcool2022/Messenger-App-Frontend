import axios from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface LogoutResponse {
  message: string;
}
export const useLogout = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log("successfully logged out");
      toast.success("successful logged out");
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
    onError: (error) => {
      console.error("login failed:", error);
      toast.error("login failed");
      throw Error(error.message);
    },
  });
};
async function logoutUser() {
  const res = await axios.post<LogoutResponse>("auth/logout");
  return res.data;
}
