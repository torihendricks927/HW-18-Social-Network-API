const { Schema } = require('mongoose');

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
            requried: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // getter
        },
    }
);

const Reaction = model('reaction', reactionSchema);
module.exports = Reaction;