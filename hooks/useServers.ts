import { getUserServersQuery } from "@/queries";
import { useQuery } from "@apollo/client";

const useServers = (userID?: string) => {
  const { data, loading } = useQuery(getUserServersQuery, {
    skip: !userID,
    variables: { id: userID },
  });
  const servers = data?.getUser.servers;

  return { servers, loading };
};

export default useServers;
