import gql from "graphql-tag";

export default gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      googleID
      email
    }
  }
`;
