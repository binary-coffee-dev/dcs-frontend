import { gql } from 'apollo-angular';

export const TOP_POPULAR_USERS_QUERY = gql`
  query {
    topPopularUsers {
      users {
        id
        username
        avatarUrl
      }
      values
    }
  }
`;
