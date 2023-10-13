import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { PLAY_NAMESPACE } from '../utils/constant';

const BACKEND_SOCKET_URL = import.meta.env.VITE_APP_BACKEND_SOCKET_URL;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(`${BACKEND_SOCKET_URL}/${PLAY_NAMESPACE}`, { transports: ['websocket'] });
    setSocket(socketInstance);

    return () => {
      if (socketInstance && socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, []); // Empty dependency array ensures this useEffect runs once on mount and the return function runs on unmount

  return socket;
};
