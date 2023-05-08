import { gql } from 'apollo-angular';

export const UPDATE_PROFILE_MUTATION = gql`
    mutation ($id: ID!, $email: String, $page: String) {
        updateUsersPermissionsUser(id: $id, data: { email: $email, page: $page }) {
            data {
                id
                attributes {
                    username
                    email
                    confirmed
                    blocked
                    page
                    avatarUrl
                    avatar {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
    mutation ($id: ID!, $avatar: ID) {
        updateUsersPermissionsUser(id: $id, data: { avatar: $avatar }) {
            data {
                id
                attributes {
                    username
                    email
                    confirmed
                    blocked
                    page
                    avatarUrl
                    avatar {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;
