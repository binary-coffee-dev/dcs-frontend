import { gql } from 'apollo-angular';

export const POST_QUERY = gql`
    query ($id: ID!) {
        post(id: $id) {
            data {
                id
                attributes {
                    name
                    enable
                    title
                    body
                    publishedAt
                    views
                    tags {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    comments
                    banner {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                    }
                    author {
                        data {
                            id
                            attributes {
                                username
                                email
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }

`;
