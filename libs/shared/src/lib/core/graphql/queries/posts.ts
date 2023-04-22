import { gql } from 'apollo-angular';

export const POSTS_QUERY = gql`
    query pageQuery($limit: Int!, $start: Int!, $where: JSON!, $sort: String!) {
        postsConnection(sort: $sort, limit: $limit, start: $start, where: $where){
            values {
                id
                name
                title
                enable
                body
                comments
                published_at
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
                    avatarUrl
                }
                tags{
                    name
                }
            }
            aggregate {
                count
            }
        }
        countPosts(where: $where)
    }
`;
