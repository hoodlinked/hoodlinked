import { gql } from '@apollo/client';

export const QUERY_USER_ITEMS = gql`
query UserItems($userId: ID!) {
  userItems(userId: $userId) {
    email
    _id
    username
    items {
      name
      description
    }
  }
} 
`

// expanded Query Libaries to render items in library cards
export const QUERY_LIBRARIES = gql`
query Libraries {
  libraries {
    _id
    name
    description
    users {
      username
      email
      items {
        name
      }
    }
  }
}
`

export const QUERY_LIBRARY = gql`
query Library($libraryId: ID!) {
  library(libraryId: $libraryId) {
    _id
    name
    users {
      _id
      username
      email
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
      _id
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
    _id
    description
  }
}
`

export const QUERY_LIBRARY_ITEMS = gql`
query LibraryItems($libraryId: ID!) {
  libraryItems(libraryId: $libraryId) {
    name
    items {
      name
      description
    }
  }
}
`