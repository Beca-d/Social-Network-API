const router = require('express').Router();
const {
  createReply,
  deleteReply,
} = require('../../controllers/thought-controller');

// POST (create) reply route at /api/replies/<thoughtId>
router.route('/:thoughtId').post(createReply);

//  DELETE reply route at /api/replies/<thoughtId>/<id>
router.route('/:thoughtId/:id').delete(deleteReply);

module.exports = router;