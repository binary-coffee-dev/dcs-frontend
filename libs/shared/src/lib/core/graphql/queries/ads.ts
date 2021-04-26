import gql from 'graphql-tag';

export const ADS_QUERY = gql`
  query ($country: String){
    ads(where: { country:  $country }){
      id
      _id
      createdAt
      updatedAt
      country
      code
    }
  }
`;
