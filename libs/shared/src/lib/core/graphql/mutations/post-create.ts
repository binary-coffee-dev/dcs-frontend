import { gql } from 'apollo-angular';

export const POST_CREATE_MUTATION = gql`
    mutation (
        $title: String
        $body: String
        $enable: Boolean
        $banner: ID
        $author: ID
        $tags: [ID]
        $publishedAt: DateTime) {
        createPost(
            data: {
                publishedAt: $publishedAt
                title: $title
                body: $body
                enable: $enable
                banner: $banner
                author: $author
                tags: $tags
            }
        ) {
            data {
                id
            }
        }
    }
`;
