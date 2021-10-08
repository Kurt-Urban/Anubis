import gql from "graphql-tag";

const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    servers {
      id
      serverName
    }
    email
    googleID
  }
`;

export default UserFragment;
