import { gql } from '@apollo/client';

export const QUERY_USER_ITEMS = gql`
query UserItems($username: String!) {
    userItems(username: $username) {
      username
      items {
        name
        description
      }
    }
  }  
`

export const QUERY_LIBRARIES = gql`
query Library {
  libraries {
    name
  }
}
`

export const QUERY_LIBRARY = gql`
query Library($id: ID!) {
  library(_id: $id) {
    _id
    users {
      items {
        name
        description
      }
    }
  }
}
`

export const QUERY_USER = gql`
query User {  
  user {
    username
    email
    items {
      name
      description
    }
  }
}
`
export const QUERY_USER_LIBRARY = gql`
query FindUserLibraries {
  findUserLibraries {
    name
  }
}
`