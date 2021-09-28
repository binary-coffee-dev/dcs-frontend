import gql from 'graphql-tag';

export const POST_CREATE_MUTATION = gql`
    mutation (
        $title: String
        $body: String
        $enable: Boolean
        $banner: ID
        $author: ID
        $tags: [ID]
        $publishedAt: DateTime
    ){
        createPost(
            input: {
                data:  {
                    title: $title,
                    body: $body,
                    enable: $enable,
                    banner: $banner,
                    author: $author,
                    tags: $tags,
                    publishedAt: $publishedAt
                }
            }
        ){
            post {
                id
            }
        }
    }
`;
