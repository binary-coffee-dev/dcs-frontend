import { gql } from 'apollo-angular';

export const REMOVE_COMMENT_MUTATION = gql`
  mutation ($id: ID!){
    deleteComment(id: $id){
      data {
        id
      }
    }
  }
`;
