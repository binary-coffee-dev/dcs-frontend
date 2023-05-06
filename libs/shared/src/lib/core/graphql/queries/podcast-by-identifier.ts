import { gql } from 'apollo-angular';

export const PODCAST_BY_IDENTIFIER_QUERY = gql`
  query ($identifier: String!) {
    podcastByIdentifier(identifier: $identifier) {
      name
      episodes {
        data {
          id
          attributes {
            title
            url
            duration
            description
            banner
            date
          }
        }
      }
      identifier
      createdAt
      updatedAt
    }
  }
`;
