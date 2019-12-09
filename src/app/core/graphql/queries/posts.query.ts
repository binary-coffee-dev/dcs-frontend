import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query {
        postsConnection(sort: "createdAt:desc", limit: 1, start: 0){
            values {
                title
                body
                description
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
