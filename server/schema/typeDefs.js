const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Library {
        _id: ID
        name: String
        items: [Item]
        users: [User]
    }

    type Item {
        _id: ID
        name: String
        description: String
        owner: User
        available: Boolean
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
        libraries: [Library]
    }
`;

module.exports = typeDefs;