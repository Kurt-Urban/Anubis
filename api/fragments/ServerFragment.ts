import gql from "graphql-tag";

const ServerFragment = gql`
  fragment ServerFragment on Server {
    __typename
    id
    serverName
    ownerID
    ipAddress
    description
    bannerURL
    trailerURL
    websiteURL
    discordURL
    listSlot
    gameVersion
    country
    port
    playerLikes
    tags {
      tag {
        value
      }
    }
  }
`;

export default ServerFragment;
