const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const replyRoutes = require('./reply-routes');

// add subdirectory of /users to userRoutes`
router.use('/users', userRoutes);

// add subdirectory of /thoughts to thoughtRoutes
router.use('/thoughts', thoughtRoutes);

// add subdirectory of /replies to replyRoutes
router.use('/replies', replyRoutes);

router.use((req, res) => {
  res.status(400).json({ err: 'Page Not Found!' });
});

module.exports = router;