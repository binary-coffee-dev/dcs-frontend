import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query pageQuery($limit: Int!, $start: Int!) {
        postsConnection(sort: "createdAt:desc", limit: $limit, start: $start){
            values {
                id
                name
                title
                enable
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
            }
            aggregate {
                count
            }
        }
        countPosts
    }
`;
