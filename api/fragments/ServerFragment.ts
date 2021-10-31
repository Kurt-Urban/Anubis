import gql from "graphql-tag";

const ServerFragment = gql`
  fragment ServerFragment on Server {
    id
    serverName
    ipAddress
    status
    bannerURL
    listSlot
    gameID
    tags {
      tag {
        value
        id
      }
    }
  }
`;

export default ServerFragment;
