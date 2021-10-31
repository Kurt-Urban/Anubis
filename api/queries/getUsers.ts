import gql from "graphql-tag";
import { UserFragment } from "../fragments";

export default gql`
  query getUsers {
    getUsers {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
