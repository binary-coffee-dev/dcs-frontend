import { gql } from 'apollo-angular';

export const RECENT_COMMENTS_QUERY = gql`
  query ($limit: Int){
    recentComments (limit: $limit) {
      body
      email
      name
      user {
        data {
          id
          attributes {
            username
            avatarUrl
          }
        }
      }
      post {
        data {
          id
          attributes {
            title
            name
            body
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
