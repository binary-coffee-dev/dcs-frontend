import { gql } from 'apollo-angular';

export const SIMILAR_POSTS_QUERY = gql`
    query ($id: ID!, $limit: Int) {
        similarPosts(id: $id, limit: $limit) {
            title
            body
            banner {
                data{
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

`;
