import { gql } from 'apollo-angular';

export const CREATE_COMMENT_MUTATION = gql`
    mutation create(
        $body: String
        $post: ID
    ) {
        createComment(input: {data: {body: $body, post: $post}}){
            comment {
                id
                body
                publishedAt
                name
                user {
                    username
                    avatar {
                        url
                    }
                }
            }
        }
    }
`;
