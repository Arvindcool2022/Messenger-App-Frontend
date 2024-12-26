import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
interface RegisterResponse {
  isOnline?: boolean;
  fullname: string;
  id: string;
  profilepic: string;
}

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allusers"],
    queryFn: getCurrentuser,
    retry: (failureCount, error) => {
      return (
        !(error instanceof AxiosError && error.response?.status === 403) &&
        failureCount <= 3
      );
    },
  });
};
async function getCurrentuser() {
  const res = await axios.get<RegisterResponse[]>("user/all");
  return res.data;
}
