import { gql } from 'apollo-angular';

export const POST_BY_NAME_QUERY = gql`
    query ($name: String!, $noUpdate: Boolean) {
        postByName(name: $name, noUpdate: $noUpdate) {
            data {
                id
                attributes {
                    title
                    body
                    author {
                        data {
                            id
                            attributes {
                                username
                                avatarUrl
                            }
                        }
                    }
                    banner {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    tags {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    enable
                    name
                    views
                    readingTime
                    comments
                    likes
                    createdAt
                    updatedAt
                    publishedAt
                }
            }
        }
        likes:opinions(filters: {post: {name: {eq: $name}}, type: {eq: "like"}}) {
            meta {
                pagination {
                    total
                }
            }
        }
    }
`;
