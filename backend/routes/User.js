const express = require("express");
const {login} = require("../controllers/User")

const UserRouter = express.Router();

UserRouter.post("/login", login);

exports.UserRouter = UserRouter;
