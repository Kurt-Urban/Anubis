import gql from "graphql-tag";
import { ServerFragment } from "../fragments";

export default gql`
  query getServer($id: String!) {
    getServer(id: $id) {
      ...ServerFragment
    }
  }
  ${ServerFragment}
`;
