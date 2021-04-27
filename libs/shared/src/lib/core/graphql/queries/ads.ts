import gql from 'graphql-tag';

export const ADS_QUERY = gql`
  query ($country: String!){
    findRandomAds( country:  $country ){
      id
      _id
      createdAt
      updatedAt
      country
      code
    }
  }
`;
