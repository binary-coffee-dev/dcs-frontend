import gql from 'graphql-tag';

export const POST_BY_NAME_QUERY = gql`
    query fetchPost($id: String!) {
        postByName(name: $id) {
            id
            name
            title
            description
            body
            publishedAt
            views
            tags {
                id
                name
            }
            comments
            banner { url }
            author {
                username
                email
                avatarUrl
                page
            }
            tags{
                name
            }
        }
    }
`;
