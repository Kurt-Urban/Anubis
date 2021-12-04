import { getServerQuery } from "@/queries";
import { useQuery } from "@apollo/client";

const useServer = (serverID?: string) => {
  const { data, loading } = useQuery(getServerQuery, {
    variables: { id: serverID },
    skip: serverID === "new",
    onError: () => console.log("Failed to find server"),
  });
  const server = data?.getServer;

  return { server, loading };
};

export default useServer;
