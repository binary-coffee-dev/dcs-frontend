import { gql } from 'apollo-angular';

export const TAGS_QUERY = gql`
    query {
        tags(filters: {}, pagination: {limit: 100}, sort: []) {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;
