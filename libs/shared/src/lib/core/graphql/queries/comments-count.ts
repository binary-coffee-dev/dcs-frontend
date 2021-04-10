import gql from 'graphql-tag';

export const COMMENTS_COUNT_QUERY = gql`
  query ($user: ID!) {
    commentsConnection(where: {user: $user}) {
      aggregate {
        count
      }
    }
  }
`;
