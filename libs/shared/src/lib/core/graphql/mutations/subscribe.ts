import { gql } from 'apollo-angular';

export const SUBSCRIBE_MUTATION = gql`
    mutation verify( $email: String! ) {
        subscribe(email: $email){
            email
            enable
            verified
            token
            id
            created_at
            updated_at
        }
    }
`;
