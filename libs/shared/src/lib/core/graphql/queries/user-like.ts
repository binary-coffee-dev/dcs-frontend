import { gql } from 'apollo-angular';

export const USER_LIKE_QUERY = gql`
    query ($name: String!, $userId: ID!) {
        userLike:opinions(filters: {post: {name: {eq: $name}}, type: {eq: "like"}, user: {id: {eq: $userId}}}) {
            meta {
                pagination {
                    total
                }
            }
        }
    }
`;
