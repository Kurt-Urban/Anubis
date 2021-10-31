import gql from "graphql-tag";

export default gql`
  mutation createServerTag($input: CreateServerTagInput!) {
    createServerTag(input: $input)
  }
`;
