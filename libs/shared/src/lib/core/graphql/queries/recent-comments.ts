import gql from 'graphql-tag';

export const RECENT_COMMENTS_QUERY = gql`
  query{
    recentComments {
      id
      body
      createdAt
      post {
        name
      }
      user {
        username
      }
    }
  }
`;