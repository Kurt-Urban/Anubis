import { getUserServersQuery } from "@/queries";
import { useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";

interface Tag {
  id: string;
  value: string;
}
interface Server {
  id: string;
  serverName: string;
  ownerID: string;
  ipAddress: string;
  description: string;
  status: string;
  bannerURL: string;
  trailerURL: string;
  websiteURL: string;
  discordURL: string;
  listSlot: string;
  gameVersion: string;
  country: string;
  port: number;
  playerLikes: number;
  tags: Tag[];
}

interface ServerContextProps {
  userID: string;
}

export const ServerContext = createContext<{
  servers: Server[];
}>({
  servers: [],
});

const ServerProvider: React.FC<ServerContextProps> = ({ children }) => {
  const [servers, setServers] = useState([]);

  return (
    <ServerContext.Provider
      value={{
        servers,
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
