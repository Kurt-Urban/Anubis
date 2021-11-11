import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserMutation } from "@/mutations";
import { getServerQuery } from "@/queries";

interface Server {
  id: string;
  ownerID: string;
  tags: object[];
  serverName: string;
  status: string;
  ipAddress: string;
  bannerURL: string;
  gameID: string;
  listSlot: string;
}

interface ServerContextProps {
  serverID: string;
}

export const ServerContext = createContext<{
  server: Server;
}>({
  server: {
    id: "",
    ownerID: "",
    tags: [],
    serverName: "",
    status: "",
    ipAddress: "",
    bannerURL: "",
    gameID: "",
    listSlot: "",
  },
});

const ServerProvider: React.FC<ServerContextProps> = ({
  children,
  serverID,
}) => {
  const [server, setServer] = useState({
    id: "",
    ownerID: "",
    tags: [],
    serverName: "",
    status: "",
    ipAddress: "",
    bannerURL: "",
    gameID: "",
    listSlot: "",
  });

  return (
    <ServerContext.Provider
      value={{
        server,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export function useAppContext() {
  return useContext(ServerContext);
}

export default ServerProvider;
