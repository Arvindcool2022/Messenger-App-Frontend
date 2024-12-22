import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
interface RegisterResponse {
  fullname: string;
  id: string;
  profilepic: string;
}

export const useAllUsers = () => {
  return useQuery({ queryKey: ["allusers"], queryFn: getCurrentuser });
};
async function getCurrentuser() {
  const res = await axios.get<RegisterResponse[]>("user/all");
  return res.data;
}
