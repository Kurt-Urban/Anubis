import gql from "graphql-tag";

export default gql`
  mutation createServer($input: CreateServerInput!) {
    createServer(input: $input) {
      serverName
      ipAddress
      status
      bannerURL
      listSlot
      gameID
    }
  }
`;
