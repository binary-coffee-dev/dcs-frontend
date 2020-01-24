import gql from 'graphql-tag';

export const CREATE_COMMENT_MUTATION = gql`
    mutation create(
        $captcha: String
        $token: String
        $body: String
        $email: String
        $name: String
        $post: ID
    ) {
        createCommentByCaptcha(
            input: {
                body: $body,
                email: $email,
                name: $name,
                post: $post
                captcha: $captcha
                token: $token
            }
        ) {
            comment {
                id
            }
        }
    }
`;
