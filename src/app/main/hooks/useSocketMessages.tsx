import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { GetConvResponse } from "./useGetCurrentConv";

const useSocketMessages = () => {
  const { id } = useParams();
  const { socket } = useSocket();
  const qc = useQueryClient();

  useEffect(() => {
    if (socket) {
      socket.on("messages", (newMessage) => {
        qc.setQueryData(["conv", id], (prev: GetConvResponse) => {
          const messages = [...prev.messages, newMessage];
          console.log("new messages", newMessage, messages);
          return { ...prev, messages };
        });
      });

      return () => {
        socket.off("messages");
      };
    }
  }, [socket]);
  return null;
};

export default useSocketMessages;
