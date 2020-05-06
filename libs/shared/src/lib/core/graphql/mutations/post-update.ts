import gql from 'graphql-tag';

export const POST_UPDATE_MUTATION = gql`
    mutation (
        $id: ID!
        $title: String
        $body: String
        $description: String
        $enable: Boolean
        $banner: ID
        $tags: [ID]
    ){
        updatePost(
            input: {
                data: {
                    title: $title,
                    body: $body,
                    description: $description,
                    enable: $enable,
                    banner: $banner,
                    tags: $tags
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
