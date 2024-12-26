import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export const useOnlineUser = () => {
  const [onlineUsers, setOnlineUser] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("getAllOnlineUsers", (users: string[]) => {
        setOnlineUser(users);
      });

      return () => {
        socket.off("getAllOnlineUsers");
      };
    }
  }, [socket]);
  console.log("onlineUsers", onlineUsers);
  return onlineUsers;
};
