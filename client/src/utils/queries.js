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
    items {
      name
      description
    }
  }
}
`
