const mongoose = require('mongoose');

const Category = require('./Category');

const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    available: {
        type: Boolean, 
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;