import { gql } from 'apollo-angular';

export const SIMILAR_POSTS_QUERY = gql`
    query ($id: ID!, $limit: Int) {
        similarPosts(id: $id, limit: $limit) {
            title
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
            name
            views
            comments
            likes
            createdAt
            updatedAt
            publishedAt
        }
    }

`;
