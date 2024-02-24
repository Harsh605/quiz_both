import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://quiz.metablocktechnologies.org");
    // const newSocket = io("http://192.168.1.16:5050");

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
