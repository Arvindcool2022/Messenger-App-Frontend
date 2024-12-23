import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
type TMessages = {
  createdAt: Date;
  senderId: string;
  body: string;
}[];

interface Response {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  participantIDs: string[];
  messageIDs: string[];
  messages: TMessages;
}
export const useGetCurrentConv = (id: string | undefined) => {
  return useQuery({
    queryKey: ["conv", id],
    enabled: !!id,
    queryFn: () => getConv(id),
  });
};

async function getConv(id: string | undefined) {
  const res = await axios.get<Response>(`message/${id}`);
  return res.data;
}
