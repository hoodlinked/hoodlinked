const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Library {
        _id: ID
        name: String 
        users: [User]
        creator: User
    }

    type Item {
        _id: ID
        name: String!
        description: String!
        owner: User
        available: Boolean!
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
        userItems(username: String!): User 
        user: User
        library(_id: ID!): Library
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!):Auth
        addItem(name: String!, description: String!, available: Boolean!): Item
        createLibrary(name: String!): Library
        addLibraryUser(
            libraryId: ID!
        ): Library
        
    }
`;

module.exports = typeDefs;
