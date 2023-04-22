import { gql } from 'apollo-angular';

export const SIMILAR_POSTS_QUERY = gql`
    query similarPosts($id: ID!, $limit: Int){
      similarPosts(id: $id, limit: $limit){
        title
        name
        banner {
          url
        }
        published_at
        id
        views
        comments
      }
    }
`;
