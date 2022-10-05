const router = require('express').Router();
const {
  getAllThought,
  getThoughtByID,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

// GET all thoughts route at /api/thoughts/
router.route('/').get(getAllThought);

// POST a new thought route at /api/thoughts/<userid>
router.route('/:userid').post(createThought);

// GET or PUT (update) a thought route at /api/thoughts/<thoughtID>
router.route('/:id').get(getThoughtByID).put(updateThought);

// DELETE a thought route at /api/thoughts/<userid>/<thoughtID>
router.route('/:userid/:id').delete(deleteThought);

module.exports = router;