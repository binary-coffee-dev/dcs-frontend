import gql from 'graphql-tag';

export const POSTS_QUERY = gql` { posts { id title description createdAt } } `;
