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
`;

export const ADD_ITEM = gql`
mutation AddItem($name: String!, $description: String!) {
  addItem(name: $name, description: $description) {
    name
    description
  }
}
`

export const CREATE_LIBRARY = gql`
mutation CreateLibrary($name: String!, $description: String!) {
  createLibrary(name: $name, description: $description) {
    name
    description
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

export const REMOVE_ITEM = gql`
  mutation RemoveItem($itemId: ID!) {
  removeItem(itemId: $itemId) {
    username
    items {
      _id
    }
  }
}
`

export const REMOVE_LIBRARY_USER = gql`
mutation RemoveLibraryUser($libraryId: ID!) {
  removeLibraryUser(libraryId: $libraryId) {
    _id
    name
    users {
      username
    }
  }
}
`
export const ADD_LIBRARY_ITEM = gql`
mutation addLibraryItem($libraryId: ID!, $itemId: ID!) {
  addLibraryItem(libraryId: $libraryId, itemId: $itemId) {
    name
    items {
      name
      description
    }
  }
}
`

export const UPDATE_LIBRARY_ITEM = gql`
mutation updateLibraryItem($itemId: ID!, $name: String, $description: String) {
  updateLibraryItem(itemId: $itemId, name: $name, description: $description) {
    _id
    name
    users {
      _id
      username
      email
      password
      items {
        _id
        name
        description
      }
    }
  }
}
`