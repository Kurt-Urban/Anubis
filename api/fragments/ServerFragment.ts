import gql from "graphql-tag";

const ServerFragment = gql`
  fragment ServerFragment on Server {
    id
    serverName
    ipAddress
    status
    bannerURL
    listSlot
    tags {
      tag {
        value
      }
    }
  }
`;

export default ServerFragment;
