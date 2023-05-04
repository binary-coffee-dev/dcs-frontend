import { gql } from 'apollo-angular';

export const COMMENTS_QUERY = gql`
  query ($postId: ID){
    comments(
      sort: "createdAt:desc"
      pagination: { limit: 100, start: 0 }
      filters: { post: { id: {eq: $postId} } }
    ) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          body
          name
          user {
            data {
              id
              attributes {
                username
                avatarUrl
                role {
                  data {
                    attributes {
                      name
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
