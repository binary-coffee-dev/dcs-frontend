import { gql } from 'apollo-angular';

export const TAGS_QUERY = gql`
  query {
    tags {
      name
      id
    }
  }
`;
