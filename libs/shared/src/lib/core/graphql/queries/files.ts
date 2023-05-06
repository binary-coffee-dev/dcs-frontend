import {gql} from 'apollo-angular';

export const FILES_QUERY = gql`
  query ($limit: Int!, $start: Int!, $filters: ImageFiltersInput) {
    images(sort: ["createdAt:desc"], pagination: {limit: $limit, start: $start}, filters: $filters){
      data {
        id
        attributes {
          image {
            data {
              id
              attributes {
                url
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
