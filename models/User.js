const { Schema, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
            // validate 
        },
        thoughts: [thoughtSchema],
        friends: [userSchema],
        },
        {
            toJSON: {
                getters: true,
            },
        }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;