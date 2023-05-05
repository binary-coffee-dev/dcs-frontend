import { gql } from 'apollo-angular';

export const ME_QUERY = gql`
    query{
        myData {
            id
            username
            email
            avatarUrl
            confirmed
            blocked
            role {
                name
                type
            }
            page
            avatar {
                url
            }
        }
    }
`;
