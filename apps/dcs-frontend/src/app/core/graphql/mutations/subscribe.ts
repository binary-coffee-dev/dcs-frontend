import gql from 'graphql-tag';

export const SUBSCRIBE_MUTATION = gql`
    mutation verify( $email: String! ) {
        subscribe(email: $email){
            email
            enable
            verified
            token
            id
            createdAt
            updatedAt
        }
    }
`;
