import { gql } from 'apollo-angular';

export const FILES_QUERY = gql`
    query ($limit: Int!, $start: Int!, $where: JSON) {
      imagesConnection(sort: "created_at:DESC",limit: $limit, start: $start, where: $where){
        values {
          id
          image {
            id
            name
            url
            mime
          }
        }
        aggregate {
          count
          totalCount
        }
      }
    }
`;
