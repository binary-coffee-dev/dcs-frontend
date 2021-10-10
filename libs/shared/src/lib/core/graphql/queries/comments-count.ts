import { gql } from 'apollo-angular';

export const COMMENTS_COUNT_QUERY = gql`
  query ($user: ID!) {
    commentsConnection(where: {user: $user}) {
      aggregate {
        count
      }
    }
  }
`;
