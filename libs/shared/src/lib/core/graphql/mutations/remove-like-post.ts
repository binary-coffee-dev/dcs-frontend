import gql from 'graphql-tag';

export const LIKE_REMOVE_MUTATION = gql`
  mutation ( $id: ID! ){
    deleteOpinion(input: {where: {id: $id}}){
      opinion {
        id
      }
    }
  }
`;
