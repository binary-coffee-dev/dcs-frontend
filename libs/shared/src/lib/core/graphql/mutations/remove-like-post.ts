import { gql } from 'apollo-angular';

export const LIKE_REMOVE_MUTATION = gql`
  mutation ($id: ID!){
    deleteOpinion(id: $id){
      data {
        id
      }
    }
  }
`;
