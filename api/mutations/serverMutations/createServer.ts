import { ServerFragment } from "@/fragments";
import gql from "graphql-tag";

export default gql`
  mutation createServer($input: CreateServerInput!, $tags: [String!]) {
    createServer(input: $input, tags: $tags) {
      ...ServerFragment
    }
  }
  ${ServerFragment}
`;
