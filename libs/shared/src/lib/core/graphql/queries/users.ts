import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query ($where: JSON!){
    users(sort: "asc", limit: 10, start: 0, where: $where) {
      id
      username
      avatarUrl
      page
      email
    }
  }
`;
