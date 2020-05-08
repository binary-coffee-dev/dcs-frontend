import gql from 'graphql-tag';

export const TAGS_QUERY = gql`
  query {
    tags {
      name
      id
    }
  }
`;
