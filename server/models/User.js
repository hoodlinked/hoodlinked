const mongoose = require('mongoose');
const Item = require('./Item');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //regex for valid email with match field
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // }
    ],
    // libraries: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Library',
    //     }
    // ]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified ('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
}); 

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;