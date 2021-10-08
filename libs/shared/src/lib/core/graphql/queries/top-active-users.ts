import { gql } from 'apollo-angular';

export const TOP_ACTIVE_USERS_QUERY = gql`
  query {
    topActiveUsers {
      users {
        id
        username
        avatarUrl
      }
      values
    }
  }
`;
