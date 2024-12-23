import axios from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
interface RegisterResponse {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  senderId: string;
  conversationsIds: string;
  body: string;
}
export const useSendMessages = (id: string | undefined) => {
  if (!id) return Error("receiver id not found");
  return useMutation({
    mutationFn: sendMessage,
    onError(error, variables, context) {},
    onSuccess(data, variables, context) {},
  });
};

async function sendMessage(data: { message: string }) {
  return await axios.post<RegisterResponse>("message/send/:id", data);
}
