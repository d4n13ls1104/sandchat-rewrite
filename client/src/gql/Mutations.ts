export const CREATE_USER_MUTAITON = `
  mutation createUser(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(createUserInput: { email: $email, username: $username, password: $password }) {
      user {
        id,
        username,
        createdAt
      },
      errors {
        field,
        message
      }
    }
  }
`;
