import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "./useCurrentUer";

const serverDomain =
  import.meta.env.MODE === "development"
    ? "http://localhost:9000"
    : import.meta.env.VITE_SOCKET;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { data: authUser, isLoading } = useCurrentUser();

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(serverDomain, {
        query: { userId: authUser.id },
      });

      socketRef.current = socket;
      console.log(socket);

      socket.on("connect", () => {
        const engine = socket.io.engine;
        console.log("connected", engine.transport.name);
      });
      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      socket.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport.name);
      });

      socket.on("upgradeError", (error) => {
        console.error("Transport upgrade error:", error);
      });

      return () => {
        socket.close();
        socketRef.current = null;
        socket.off("connect");
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("upgrade");
        socket.off("upgradeError");
      };
    }

    if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return { socket: socketRef.current };
};
