import { gql } from 'apollo-angular';

export const RECENT_COMMENTS_QUERY = gql`
  query ($limit: Int){
    recentComments (limit: $limit){
      id
      body
      publishedAt
      post {
        name
      }
      user {
        username
        avatarUrl
      }
    }
  }
`;
