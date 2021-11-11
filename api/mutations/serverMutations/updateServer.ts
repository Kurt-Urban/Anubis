import { ServerFragment } from "@/fragments";
import gql from "graphql-tag";

export default gql`
  mutation updateServer(
    $input: UpdateServerInput!
    $tags: [String!]
    $id: String!
  ) {
    updateServer(input: $input, tags: $tags, id: $id) {
      ...ServerFragment
    }
  }
  ${ServerFragment}
`;
