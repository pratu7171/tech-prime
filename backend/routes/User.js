const express = require("express");
const { signup, login } = require("../controllers/User");

const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);

exports.UserRouter = UserRouter;
