import { createServerTagMutation } from "@/mutations";
import { useMutation } from "@apollo/client";

const useServerTags = (serverID: string, tagID: string) => {
  const [createServerTag] = useMutation(createServerTagMutation, {
    onError: () => console.log("Failed to create Server Tag"),
  });
  return createServerTag({
    variables: {
      input: {
        serverID,
        tagID,
      },
    },
  });
};

export default useServerTags;
