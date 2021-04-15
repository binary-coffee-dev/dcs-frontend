import gql from 'graphql-tag';

export const REMOVE_COMMENT_MUTATION = gql`
  mutation ($id: ID!){
    deleteComment(input: {where: {id: $id}}){
      comment {
        id
      }
    }
  }
`;
