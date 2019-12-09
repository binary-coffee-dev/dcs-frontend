import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query pageQuery($limit: Int!, $start: Int!) {
        postsConnection(sort: "createdAt:desc", limit: $limit, start: $start){
            values {
                id
                title
                body
                description
                createdAt
                banner {
                    name
                    url
                }
            }
            aggregate {
                count
            }
        }
    }
`;
