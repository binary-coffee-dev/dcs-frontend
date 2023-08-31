import { gql } from 'apollo-angular';

export const VERIFY_SUBSCRIPTION_MUTATION = gql`
    mutation ($token: String!){
        verify(token: $token) {
            verified
        }
    }
`;
