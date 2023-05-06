import { gql } from 'apollo-angular';

export const POST_UPDATE_MUTATION = gql`
    mutation (
        $id: ID!
        $title: String
        $body: String
        $enable: Boolean
        $banner: ID
        $tags: [ID]
        $publishedAt: DateTime
    ) {
        updatePost(id: $id, data: {
            publishedAt: $publishedAt
            title: $title
            body: $body
            enable: $enable
            banner: $banner
            tags: $tags
        }) {
            data {
                id
            }
        }
    }
`;
