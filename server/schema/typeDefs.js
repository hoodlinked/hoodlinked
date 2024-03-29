const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Library {
        _id: ID
        name: String 
        users: [User]
        items: [Item]
        description: String!
    }

    type Item {
        _id: ID
        name: String!
        description: String!
    }

    type Category {
        _id: ID
        name: String
        items: [Item]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        items: [Item]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        userItems(userId: ID!): User 
        user: User
        library(libraryId: ID!): Library
        libraries: [Library]
        findUserLibraries: [Library]
        searchLibraries: [Library]
        libraryItems(libraryId: ID!): Library
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!):Auth
        addItem(name: String!, description: String! ): Item
        createLibrary(name: String!, description: String!): Library
        addLibraryUser(
            libraryId: ID!
        ): Library
        removeItem(itemId: ID!): User
        removeLibraryUser(libraryId: ID!): Library
        addLibraryItem(libraryId: ID!, itemId: ID!): Library    
        updateLibraryItem( itemId: ID!, name: String, description: String): Library      
    }
`;

module.exports = typeDefs;
