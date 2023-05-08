import { gql } from 'apollo-angular';

export const REMOVE_IMAGE_MUTATION = gql`
    mutation ($id: ID!){
        removeFile(id: $id) {
            data {
                id
            }
        }
    }
`;
