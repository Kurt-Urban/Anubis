import { getTagsQuery } from "@/queries";
import { useQuery } from "@apollo/client";

const useTags = () => {
  const { data, error } = useQuery(getTagsQuery);
  if (error) {
    console.error(error);
  }

  const tags = data?.getTags;
  return { tags };
};

export default useTags;
