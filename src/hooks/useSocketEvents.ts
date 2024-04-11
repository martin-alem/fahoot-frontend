import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { IEventData } from '../utils/types';

const useSocketEvents = (event: string, socket: Socket | null, callback?: (payload: IEventData) => void) => {
  useEffect(() => {
    if (socket) {
      socket.on(event, (payload: IEventData) => {
        console.log(payload);
        if (callback) {
          callback(payload);
        }
      });
      return () => {
        socket.off(event);
      };
    }
  }, [socket, callback, event]);
};

export default useSocketEvents;
