import { gql } from 'apollo-angular';

export const UNSUBSCRIBE_MUTATION = gql`
    mutation ($unsubscribeToken: String!){
        unsubscribe(unsubscribeToken: $unsubscribeToken) {
            verified
        }
    }
`;
