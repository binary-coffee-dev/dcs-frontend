import { gql } from 'apollo-angular';

export const COMMENTS_QUERY = gql`
  query ($postId: ID){
    commentsConnection(
      sort: "published_at:DESC"
      limit: 100
      start: 0
      where: {post: $postId}
    ){
      values {
        id
        body
        published_at
        name
        user {
          id
          username
          avatarUrl
          role { name type }
        }
      }
      aggregate {
        count
      }
    }
  }
`;
