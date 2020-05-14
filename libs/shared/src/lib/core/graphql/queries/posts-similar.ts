import gql from 'graphql-tag';

export const SIMILAR_POSTS_QUERY = gql`
    query similarPosts($id: ID!, $limit: Int){
      similarPosts(id: $id, limit: $limit){
        title
        description
        name
        banner {
          url
        }
        publishedAt
        id
      }
    }
`;
