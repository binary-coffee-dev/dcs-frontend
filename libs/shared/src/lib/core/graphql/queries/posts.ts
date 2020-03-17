import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query pageQuery($limit: Int!, $start: Int!, $where: JSON!) {
        postsConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where){
            values {
                id
                name
                title
                enable
                body
                comments
                description
                publishedAt
                views
                banner {
                    name
                    url
                }
                author {
                    id
                    username
                    email
                    page
                }
            }
            aggregate {
                count
            }
        }
        countPosts(where: $where)
    }
`;
