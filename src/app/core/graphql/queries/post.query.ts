import gql from 'graphql-tag';

export const POST_QUERY = gql` query fetchPost($id: ID!){ post(id: $id) { id title description body createdAt } } `;
