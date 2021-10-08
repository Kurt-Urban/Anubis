import gql from "graphql-tag";
import { UserFragment } from "../fragments";

export default gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      firstName
      lastName
      googleID
      email
    }
  }
`;
