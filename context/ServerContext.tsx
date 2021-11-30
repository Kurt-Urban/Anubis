import { createContext, useContext, useState } from "react";

interface Server {
  id: string;
  ownerID: string;
  tags: object[];
  serverName: string;
  status: string;
  ipAddress: string;
  bannerURL: string;

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
