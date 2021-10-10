import { gql } from 'apollo-angular';

export const RECENT_COMMENTS_QUERY = gql`
  query ($limit: Int){
    recentComments (limit: $limit){
      id
      body
      createdAt
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
