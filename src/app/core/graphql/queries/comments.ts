import gql from 'graphql-tag';

export const COMMENTS_QUERY = gql`
    query{
        captcha{
            captcha
            token
        }
    }
`;
