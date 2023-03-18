const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category, Library } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        userItems: async (parent, { userId }) => {
            return User.findById({ _id: userId }).populate('items')

        },
        library: async (parent, { libraryId }, context) => {
            return Library.findById({ _id: libraryId }).populate({
                path: 'users',
                populate: 'items'
            })
        },
        libraries: async (parent, args, context) => {
            return await Library.find().populate({
                path: 'users',
                populate: 'items'
            })
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'items',
                    populate: 'name'
                })

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        findUserLibraries: async (parent, args, context) => {
            if (context.user) {

                const libraries = await Library.find({
                    users: context.user._id,
                })
                
                return libraries
            }

            throw new AuthenticationError('Not logged in');
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
        addItem: async (parent, { name, description }, context) => {
            console.log(context);
            if (context.user) {
                const item = await Item.create({ name, description });

                await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { items: item._id } },
                    {new: true}
                );

                return item;
            }

            throw new AuthenticationError('Not logged in');

        },
        createLibrary: async (parent, { name }, context) => {
            console.log(context);
            if (context.user) {
                const library = await Library.create({ name });

                const user = await User.findById(context.user._id)

                await Library.findByIdAndUpdate(
                    library._id,
                    { $addToSet: { users: user._id } },
                    {new: true}
                );

                return library;
            }
        },
        addLibraryUser: async (parent, { libraryId }, context) => {
            console.log(context);
            if (context.user) {
                const user = await User.findById(context.user._id)

                const library = await Library.findOneAndUpdate(
                    { _id: libraryId },
                    {
                        $addToSet: { users: user._id }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )

                return library;
            }

            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;