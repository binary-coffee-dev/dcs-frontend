import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query {
        posts {
            id
            title
            description
            createdAt
            banner {
                url
            }
        }
    }
`;
