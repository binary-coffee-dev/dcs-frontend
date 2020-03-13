import gql from 'graphql-tag';

export const ME_QUERY = gql`
    query{
        myData{
            id
            username
            email
            page
            avatarUrl
        }
    }
`;
