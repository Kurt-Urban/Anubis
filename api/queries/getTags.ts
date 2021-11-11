import gql from "graphql-tag";

export default gql`
  query getTags {
    getTags {
      value
      id
      servers {
        server {
          serverName
          id
        }
      }
    }
  }
`;
