import gql from "graphql-tag";

const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    servers {
      id
      serverName
      ipAddress
      status
      bannerURL
      listSlot
      gameID
    }
    email
    googleID
  }
`;

export default UserFragment;
