import gql from "graphql-tag";
import { UserFragment } from "../fragments";

export default gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
