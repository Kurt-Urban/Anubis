import gql from "graphql-tag";
import { ServerFragment } from "./index";

const UserServerFragment = gql`
  fragment UserServerFragment on User {
    __typename
    servers {
      ...ServerFragment
    }
  }
  ${ServerFragment}
`;

export default UserServerFragment;
