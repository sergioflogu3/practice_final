const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();

//routes
userRouter
    .route("/")
    .post(userController.addUser)
    .get(userController.getAllUsers);
userRouter
    .route('/:id')
    .get(userController.getAllUsers)
    .put(userController.updatedUserById)
    .delete(userController.deleteUserById);

module.exports = userRouter;