import axios from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { SignupData } from "../resolvers";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface RegisterResponse {
  message: string;
}
const useRegister = (reset: () => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data.data, data.status);
      toast.success("Registration successful: " + data.status);
      reset();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
      throw Error(error.message);
    },
  });
};
async function registerUser(data: SignupData) {
  return await axios.post<RegisterResponse>("auth/register", data);
}

export default useRegister;
