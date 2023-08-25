import { gql } from 'apollo-angular';

export const SUBSCRIBE_MUTATION = gql`
    mutation ($email: String!){
        subscribe(email: $email) {
            verified
        }
    }
`;
