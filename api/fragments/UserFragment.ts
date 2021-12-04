import gql from "graphql-tag";

const UserFragment = gql`
  fragment UserFragment on User {
    __typename
    id
    firstName
    lastName
    email
    role
  }
`;

export default UserFragment;
