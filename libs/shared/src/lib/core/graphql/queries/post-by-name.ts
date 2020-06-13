import gql from 'graphql-tag';

export const POST_BY_NAME_QUERY = gql`
  query fetchPost($name: String!) {
    postByName(name: $name) {
      id
      name
      title
      description
      body
      publishedAt
      views
      tags {
        id
        name
      }
      comments
      banner { url }
      author {
        id
        username
        email
        avatarUrl
        page
      }
      tags{
        name
      }
    }
    likes:countOpinions(where: {post: $name, type: "like"})
    userLike:countOpinions(where: {post: $name, type: "like", user: "current"})
  }
`;
