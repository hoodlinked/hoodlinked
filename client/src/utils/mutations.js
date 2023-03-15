import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        password
      }
    }
  }  
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        password
      }
    }
  }  
`

export const ADD_ITEM = gql`
mutation AddItem($name: String!, $description: String!, $available: Boolean!) {
  addItem(name: $name, description: $description, available: $available) {
    name
    description
    available
  }
}
  `

export const CREATE_LIBRARY = gql`
  mutation CreateLibrary( $name: String!) {
    createLibrary(name: $name) {
      name
    }
  }  
  `

export const ADD_LIBRARY_USER = gql`
  mutation AddLibraryUser($libraryId: ID!) {
    addLibraryUser(libraryId: $libraryId) {
      _id
    }
  }
  `
