import { gql } from 'apollo-angular';

export const LIKE_CREATE_MUTATION = gql`
  mutation ($post: ID!, $user: ID!, $type: String!){
    createOpinion(data: {post: $post, user: $user, type: $type}){
      data {
        id
      }
    }
  }
`;
