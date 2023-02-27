const userRoute = require("../core/routerConfig");
const user = require("../controllers/userController");
const { authenticate } = require("../core/userAuth");

userRoute
  .route("/users")
  .post(user.signup)
  .get(user.getAllUsers)
  .patch(authenticate, user.verifyUserEmail);
userRoute.route("/users/:userId").get(user.getUserById);
userRoute.route("/users/login").post(user.login);
userRoute.route("/users/add-interests").post(authenticate,user.addUserInterest);
userRoute.route("/users/follow-user").post(authenticate,user.followUser);
userRoute.route("/user/unfollow-user").post(authenticate,user.unfollowUser);
module.exports = userRoute;
