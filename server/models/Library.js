const mongoose = require('mongoose');

const { Schema } = mongoose;

const librarySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // items: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Item'
    //     }
    // ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ], 
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
