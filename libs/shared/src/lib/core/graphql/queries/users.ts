import { gql } from 'apollo-angular';

export const GET_USERS = gql`
#  query ($where: JSON!){
#    users2(sort: "created_at:ASC", limit: 16, start: 0, where: $where) {
#      id
#      username
#      avatarUrl
#      avatar {
#        id
#        name
#        url
#      }
#      page
#      comments
#      posts
#    }
#  }
  query ($filters: UsersPermissionsUserFiltersInput, $start: Int, $limit: Int){
    users(filters: $filters, pagination: {start: $start, limit: $limit}, sort: ["createdAt:asc"]) {
      id
      createdAt
      updatedAt
      username
      confirmed
      blocked
      role {
        name
        type
      }
      avatar {
        url
      }
      avatarUrl
      name
      page
      comments
      posts
    }
  }
`;
