import { gql } from 'apollo-angular';

export const POSTS_QUERY = gql`
  query ($limit: Int!, $start: Int!, $filters: PostFiltersInput!, $sort: [String], $state: PublicationState!){
    posts(filters: $filters, pagination: {limit: $limit, start: $start}, sort: $sort, publicationState: $state) {
      data {
        id
        attributes {
          title
          name
          comments
          likes
          views
          createdAt
          updatedAt
          publishedAt
          enable
          banner {
            data {
              id
              attributes {
                url
              }
            }
          }
          author {
            data {
              id
              attributes {
                username
                avatarUrl
              }
            }
          }
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;
