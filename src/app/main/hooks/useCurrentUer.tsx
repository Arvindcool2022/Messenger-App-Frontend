import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({ queryKey: ["currentUser"], queryFn: getCurrentuser });
};
interface RegisterResponse {
  conversationsIDs: string[];
  createdAt: string;
  fullname: string;
  gender: "male" | "female";
  id: string;
  profilepic: string;
  username: string;
}
async function getCurrentuser() {
  const res = await axios.get<RegisterResponse>("user/current");
  return res.data;
}
