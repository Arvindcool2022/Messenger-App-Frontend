import axios from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { loginData } from "../resolvers";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface RegisterResponse {
  message: string;
}
const uselogin = (reset: () => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("login successful: " + data.status);
      reset();
      navigate("/app");
    },
    onError: (error) => {
      console.error("login failed:", error);
      toast.error("login failed");
      throw Error(error.message);
    },
  });
};
async function loginUser(data: loginData) {
  return await axios.post<RegisterResponse>("auth/login", data);
}

export default uselogin;
