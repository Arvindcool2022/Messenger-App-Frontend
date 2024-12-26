import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export type TMessages = {
  createdAt: Date;
  senderId: string;
  body: string;
  id: string;
};

interface Response {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  participantIDs: string[];
  messageIDs: string[];
  messages: TMessages[];
}
export const useGetCurrentConv = () => {
  const { id } = useParams();

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
