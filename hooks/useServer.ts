import { getServerQuery } from "@/queries";
import { useQuery } from "@apollo/client";

export const useServer = (serverID: string) => {
  const { data } = useQuery(getServerQuery, {
    variables: { id: serverID },
    onCompleted: () => {
      console.log("Found Server");
    },
    onError: () => console.log("Failed to find server"),
  });
  const server = data?.getServer;
  return { server };
};
