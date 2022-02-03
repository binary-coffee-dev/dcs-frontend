import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query ($where: JSON!){
    users2(sort: "asc", limit: 16, start: 0, where: $where) {
      id
      username
      avatarUrl
      avatar {
        id
        name
        url
      }
      page
      comments
      posts
    }
  }
`;
