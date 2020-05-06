import gql from 'graphql-tag';

export const POST_CREATE_MUTATION = gql`
    mutation (
        $title: String
        $body: String
        $description: String
        $enable: Boolean
        $banner: ID
        $author: ID
        $tags: [ID]
    ){
        createPost(
            input: {
                data:  {
                    title: $title,
                    body: $body,
                    description: $description,
                    enable: $enable,
                    banner: $banner,
                    author: $author,
                    tags: $tags
                }
            }
        ){
            post {
                id
            }
        }
    }
`;
