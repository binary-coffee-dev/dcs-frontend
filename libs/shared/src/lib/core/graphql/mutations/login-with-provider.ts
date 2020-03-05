import gql from 'graphql-tag';

export const LOGIN_WITH_PROVIDER_MUTATION = gql`
    mutation login($provider: String!, $code: String!){
        loginWithProvider(provider: $provider, code: $code)
    }
`;
