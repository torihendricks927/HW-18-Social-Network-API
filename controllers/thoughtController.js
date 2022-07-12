const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

      // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body}
    )
    .then((thought) => res.json(thought))
    .catch((err) => {
      return res.status(500).json(err)
    });
  },

    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) => {
            if(!thought) {
              return res.status(404).json({ message: 'No such thought exists' })
            }
            User.findOneAndUpdate(
                  { _id: req.params.userId },
                  { $pull: { users: req.params.userId } },
                  { new: true }
                )
            })
        .then(() => res.json({ message: 'thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },


        // POST /api/thoughts/:id/reactions
        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
            )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
        },
    
        // DELETE /api/thoughts/:id/reactions
        deleteReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: body.reactionId } } },
                { new: true, runValidators: true }
            )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json({message: 'Successfully deleted the reaction'});
            })
            .catch(err => res.status(500).json(err));
        },
    };
    

  