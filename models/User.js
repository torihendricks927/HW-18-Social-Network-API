const { Schema, Types, model } = require('mongoose');
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
            unique: true,
            // validate 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            }
            
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
    },
    {
            toJSON: {
                getters: true,
                virtuals: true,
            },
            id: false,
        }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', userSchema);
module.exports = User;