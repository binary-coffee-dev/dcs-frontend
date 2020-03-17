import gql from 'graphql-tag';

export const UPDATE_PROFILE_MUTATION = gql`
    mutation updateUser($id: ID!, $email: String, $page: String) {
        updateUser(input: { where: {id: $id},data: { email: $email, page: $page } }) {
            user {
                id
                username
                email
                confirmed
                blocked
                role {
                    name
                }
                page
                avatarUrl
                avatar {
                    url
                }
            }
        }
    }
`;

export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
    mutation updateUser($id: ID!, $avatar: ID) {
        updateUser(input: { where: {id: $id},data: { avatar: $avatar } }) {
            user {
                id
                username
                email
                confirmed
                blocked
                role {
                    name
                }
                page
                avatarUrl
                avatar {
                    url
                }
            }
        }
    }
`;
