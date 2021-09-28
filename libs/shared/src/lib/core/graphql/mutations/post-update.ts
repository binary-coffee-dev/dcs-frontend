import gql from 'graphql-tag';

export const POST_UPDATE_MUTATION = gql`
    mutation (
        $id: ID!
        $title: String
        $body: String
        $enable: Boolean
        $banner: ID
        $tags: [ID]
        $publishedAt: DateTime
    ){
        updatePost(
            input: {
                data: {
                    title: $title,
                    body: $body,
                    enable: $enable,
                    banner: $banner,
                    tags: $tags,
                    publishedAt: $publishedAt
                },
                where: {
                    id: $id
                }
            }
        ){
            post {
                id
            }
        }
    }
`;
