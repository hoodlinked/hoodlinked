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