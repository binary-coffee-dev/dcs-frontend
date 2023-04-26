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
                published_at
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
