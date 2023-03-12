const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category, Library } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        userItems: async (parent, { username }) => {
           return User.findOne({ username }).populate('items')
            
        },
        library: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'libraries.users',
                    populate: 'items'
                })
            }
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with that email');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addItem: async (parent, { owner, name, description, available }) => {
            const item = await Item.create({ owner, name, description, available });

            await User.findOneAndUpdate(
                { _id: owner },
                { $addToSet: { items: item._id } }
            );

            return item;
        }
    }
};

module.exports = resolvers;