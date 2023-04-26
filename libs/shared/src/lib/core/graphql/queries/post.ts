import { gql } from 'apollo-angular';

export const POST_QUERY = gql`
    query fetchPost($id: ID!){
        post(id: $id, publicationState: PREVIEW) {
            id
            name
            enable
            title
            body
            published_at
            views
            tags {
                id
                name
            }
            comments
            banner {
                id
                url
            }
            author {
                id
                username
                email
                avatarUrl
                page
            }
        }
    }
`;
