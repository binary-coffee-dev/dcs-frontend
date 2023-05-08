import { gql } from 'apollo-angular';

export const EDIT_COMMENT_MUTATION = gql`
  mutation ($id: ID!, $body: String){
    updateComment(id: $id, data: {body: $body}){
      data {
        id
        attributes {
          body
          name
          user {
            data {
              id
              attributes {
                username
                avatarUrl
                role {
                  data {
                    attributes {
                      name
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

