import { gql } from 'apollo-angular';

export const PODCAST_BY_IDENTIFIER_QUERY = gql`
  query ($identifier: String!) {
    podcastByIdentifier(identifier: $identifier) {
      name
      identifier
      episodes {
        id
        title
        url
        description
        banner
        date
        duration
      }
    }
  }
`;
