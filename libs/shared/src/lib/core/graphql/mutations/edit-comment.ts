import { gql } from 'apollo-angular';

export const EDIT_COMMENT_MUTATION = gql`
  mutation ($id: ID!, $body: String){
    updateComment(id: $id, data: {body: $body}){
      data {
        id
        attributes {
          body
          user {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
