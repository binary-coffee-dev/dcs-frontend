import gql from 'graphql-tag';

export const FILES_QUERY = gql`
#    query pageQuery($limit: Int!, $start: Int!) {
#        uploadsConnection(sort: "createdAt:desc",limit: $limit, start: $start) {
#            values {
#                id
#                name
#                url
#                mime
#            }
#            aggregate {
#                count
#            }
#        }
#        countUploads
#    }
    query ($limit: Int!, $start: Int!, $where: JSON) {
      imagesConnection(sort: "createdAt:desc",limit: $limit, start: $start, where: $where){
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
