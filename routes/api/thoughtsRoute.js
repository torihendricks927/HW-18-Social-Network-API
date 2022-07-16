const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// route used to get all thoughts, single thought, create new thought, update a thought, or delete a thought
router.route('/').get(getThoughts).post(createThought);

// single thought route
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// route used to create a reaction stored in single thoughts or delete a reaction
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;