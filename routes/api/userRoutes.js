const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/applications
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/applications/:applicationId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/applications/:applicationId/tags
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/applications/:applicationId/tags/:tagId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
