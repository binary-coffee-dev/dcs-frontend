import { gql } from 'apollo-angular';

export const REMOVE_IMAGE_MUTATION = gql`
  mutation ($id: ID!){
    deleteFile(input: {where: {id: $id}}){
      file {
        id
      }
    }
  }
`;
