import { gql } from 'apollo-angular';

export const VERIFY_SUBSCRIPTION_MUTATION = gql`
    mutation verify( $token: String! ) {
        verify(token: $token){
            email
            enable
            verified
            token
            _id
            id
            createdAt
            updatedAt
        }
    }
`;
