import gql from 'graphql-tag';

export const POST_QUERY = gql`
    query fetchPost($id: ID!) {
        post(id: $id){
            id
            name
            enable
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
            banner { id url }
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
