import gql from 'graphql-tag';

export const LIKE_CREATE_MUTATION = gql`
  mutation (
    $user: ID
    $post: ID
    $type: String
  ){
    createOpinion(input: {data: {post: $post, user: $user, type: $type}}){
      opinion {
        id
      }
    }
  }
`;
