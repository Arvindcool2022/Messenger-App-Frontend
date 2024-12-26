import axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useSocketMessages from "./useSocketMessages";

export type TMessages = {
  createdAt: string;
  senderId: string;
  body: string;
  id: string;
};

export interface GetConvResponse {
  id: string;
  createdAt: string;
  modifiedAt: string;
  participantIDs: string[];
  messageIDs: string[];
  messages: TMessages[];
}
export const useGetCurrentConv = () => {
  const { id } = useParams();
  useSocketMessages();

  return useQuery({
    queryKey: ["conv", id],
    enabled: !!id,
    queryFn: () => getConv(id),
  });
};

async function getConv(id: string | undefined) {
  const res = await axios.get<GetConvResponse>(`message/${id}`);

  return res.data;
}
