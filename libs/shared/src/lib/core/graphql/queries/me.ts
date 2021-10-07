import { gql } from 'apollo-angular';

export const ME_QUERY = gql`
    query{
        myData{
            id
            username
            email
            page
            avatarUrl
            role { name type }
        }
    }
`;
