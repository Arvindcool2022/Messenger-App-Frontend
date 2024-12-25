import axios from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RegisterResponse {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  senderId: string;
  conversationsIds: string;
  body: string;
}

export const useSendMessages = (clearInput: () => void) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      sendMessage(id, message),
    onError: (error: unknown, variables: { id: string; message: string }) => {
      console.error("Error sending message:", error);
      toast.error("Error sending message: " + variables.message);
    },
    onSuccess: (
      data: RegisterResponse,
      variables: { id: string; message: string },
    ) => {
      console.log("Message sent successfully:", data);
      toast.success("Message sent successfully: " + data.body);
      clearInput();
      qc.invalidateQueries({ queryKey: ["conv", variables.id] });
    },
  });
};

async function sendMessage(id: string, message: string) {
  if (!id) throw new Error("Receiver ID not found");
  if (!message) throw new Error("Message can't be empty");

  const data = { message };
  console.log(data);
  const res = await axios.post<RegisterResponse>(`message/send/${id}`, data);
  return res.data;
}
