import gql from "graphql-tag";
import { UserServerFragment } from "../fragments";

export default gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      ...UserServerFragment
    }
  }
  ${UserServerFragment}
`;
