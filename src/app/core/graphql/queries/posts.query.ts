import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query pageQuery($limit: Int!, $start: Int!) {
        postsConnection(sort: "publishedAt:desc", limit: $limit, start: $start){
            values {
                id
                name
                title
                body
                description
                publishedAt
                views
                banner {
                    name
                    url
                }
                author {
                    username
                    email
                    page
                }
                comments
            }
            aggregate {
                count
            }
        }
        countPosts
    }
`;
