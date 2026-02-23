const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const Validations = require("../validators/validators.validate");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middlware");
const {allowRoles} = require("../middlewares/role.middleware");


const userRouter = Router();

userRouter.route("/signup").post(Validations.validateSignup, validate, UserController.signup);
userRouter.route("/login").post(Validations.validateLogin,validate, UserController.login);

userRouter.route("/logout").post(verifyJWT,allowRoles("user"), UserController.logout);
userRouter.route("/refresh-token").post(verifyJWT, allowRoles("admin"),UserController.refreshTokenAgain);
userRouter.route("/update-password").post(verifyJWT, UserController.updateUserPassword);
userRouter.route("/delete-user").post(verifyJWT,allowRoles("admin"),UserController.deleteUser);
userRouter.route("/current-user").post(verifyJWT, allowRoles("user"), UserController.currentUser);

// export default userRouter;
module.exports = userRouter;