import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
    mutation login($identifier: String!, $password: String!){
        login(input: {identifier: $identifier, password: $password}){
            jwt
        }
    }
`;
