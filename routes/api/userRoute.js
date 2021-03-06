const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    postUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// api/users route to get all users, get single user, post new user, update user, or delete user
router.route('/').get(getUsers).post(postUser);

// route for single user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route to post new friend to users friend list or delete a friend off list
router.route('/:userId/friends/:friendId').post(newFriend).delete(deleteFriend);

module.exports = router;