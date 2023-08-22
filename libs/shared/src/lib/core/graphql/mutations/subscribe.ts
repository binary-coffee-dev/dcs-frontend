import { gql } from 'apollo-angular';

export const SUBSCRIBE_MUTATION = gql`
    mutation ( $email: String! ){
      subscribe(email: $email) {
        email
        enable
        verified
        token
        createdAt
        updatedAt
      }
    }
`;
