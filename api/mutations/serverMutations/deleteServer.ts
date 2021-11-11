import gql from "graphql-tag";

export default gql`
  mutation deleteServer($id: String!) {
    deleteServer(id: $id) {
      __typename
    }
  }
`;
