import { gql } from 'apollo-angular';

export const TOP_ACTIVE_USERS_QUERY = gql`
    query {
        topActiveUsers {
            users {
                data{
                    id
                    attributes {
                        username
                        avatarUrl
                    }
                }
            }
            values
        }
    }
`;
