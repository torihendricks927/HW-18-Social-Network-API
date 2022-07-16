
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users,
            // headCount: await headCount(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
// get single user file
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .lean()
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No users with that ID' })
              : res.json({
                  user,
                //   grade: await grade(req.params.studentId),
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

    //   create new user
      postUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },

    //   update user
    updateUser(req, res) {
      User.findOneAndUpdate(
        {_id: req.params.userId},
        { $set: req.body }
      )
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    //   delete user and thoughts
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.findOneAndUpdate(
                {users: req.params.userId},
                {$pull: {users: req.params.userId} },
                {new: true }
              )
          )
          .then(() => res.json({ message: 'user deleted!' }))
          .catch((err) => res.status(500).json(err));
      }, 


      // Add a friend
  newFriend(req, res) {
    // console.log('You are adding a');
    // console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { assignment: { friendsId: req.params.friendsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
