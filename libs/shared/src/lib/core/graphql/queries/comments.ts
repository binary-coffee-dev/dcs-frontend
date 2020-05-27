import gql from 'graphql-tag';

export const COMMENTS_QUERY = gql`
    query ($postId: ID){
        commentsConnection(
            sort: "publishedAt:desc"
            limit: 100
            start: 0
            where: {post: $postId}
        ){
            values {
                id
                body
                publishedAt
                name
                user {
                    username
                    avatarUrl
                }
            }
            aggregate {
                count
            }
        }
    }
`;
