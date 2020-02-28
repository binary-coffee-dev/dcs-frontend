import gql from 'graphql-tag';

export const CAPTCHA_QUERY = gql`
    query{
        captcha{
            captcha
            token
        }
    }
`;
