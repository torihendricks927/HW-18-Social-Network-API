const { Schema, Types, model } = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);


// const Reaction = model('reaction', reactionSchema);
module.exports = reactionSchema;