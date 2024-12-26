import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export const useOnlineUser = () => {
  const [onlineUsers, setOnlineUser] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      console.log("added getAllOnlineUsers");
      socket.on("getAllOnlineUsers", (users: string[]) => {
        console.log("getAllOnlineUsers", users);
        setOnlineUser(users);
      });

      return () => {
        socket.off("getAllOnlineUsers");
        console.log("removed getAllOnlineUsers");
      };
    }
  }, [socket]);

  console.log("onlineUsers", onlineUsers);
  return onlineUsers;
};
