import React, { useContext, useEffect, useState } from "react";
import Pusher, { Channel } from "pusher-js";
import { AuthContext } from "@auth/interface/providers/auth.provider";

export interface ISocketContext {}
export interface ISocketProvider {
  children: React.ReactNode;
}

export const SocketContext = React.createContext<Partial<ISocketContext>>({});
export const SocketProvider: React.FC<ISocketProvider> = (props) => {
  const { account } = useContext<any>(AuthContext);
  const [socketClient, setSocketClient] = useState<Pusher>();
  const [socketChannel, setSocketChannel] = useState<Channel>();
  const [pusher, setPusher] = useState<Pusher>();
  useEffect(() => {
    if (account && !pusher) {
      const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        cluster: "us2",
      });
      setPusher(pusher);
      if (account.user.id) {
        var suscribe = pusher.subscribe(account.user.id);
        setSocketChannel(suscribe);
        setSocketClient(pusher);
      }
    }
  }, [account]);

  return (
    <SocketContext.Provider value={{ socketClient, socketChannel }}>
      {props.children}
    </SocketContext.Provider>
  );
};
