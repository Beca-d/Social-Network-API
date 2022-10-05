const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// GET all users and POST new user routes for users after api/
router.route('/').get(getAllUsers).post(createUser);

// GET, PUT, and DELETE User at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Get and Delete friend at /api/<userID>/friends/<FriendID>
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;