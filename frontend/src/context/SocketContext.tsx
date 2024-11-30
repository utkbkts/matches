import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: {
    total: number;
    male: number;
    female: number;
    onlineUsers: [];
  };
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: {
    total: 0,
    male: 0,
    female: 0,
    onlineUsers: [],
  },
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{
    total: number;
    male: number;
    female: number;
    onlineUsers: [];
  }>({
    total: 0,
    male: 0,
    female: 0,
    onlineUsers: [],
  });

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_BASE_URL);

    setSocket(newSocket);

    newSocket.on(
      "online-status",
      (users: {
        total: number;
        male: number;
        female: number;
        onlineUsers: [];
      }) => {
        setOnlineUsers(users);
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return React.useContext(SocketContext);
};
