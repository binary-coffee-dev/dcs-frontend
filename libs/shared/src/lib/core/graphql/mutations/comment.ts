import { gql } from 'apollo-angular';

export const CREATE_COMMENT_MUTATION = gql`
    mutation create($body: String, $post: ID) {
        createComment(data: {body: $body, post: $post}){
            data {
                id
                attributes {
                    body
                    email
                    name
                    user {
                        data {
                            id
                            attributes {
                                username
                                avatar {
                                    data {
                                        id
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
