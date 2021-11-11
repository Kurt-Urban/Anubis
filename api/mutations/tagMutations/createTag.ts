import gql from "graphql-tag";

export default gql`
  mutation createTag($input: CreateTagInput!) {
    createTag(input: $input) {
      value
      id
    }
  }
`;
