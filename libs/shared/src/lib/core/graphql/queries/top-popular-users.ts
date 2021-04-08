import gql from 'graphql-tag';

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
