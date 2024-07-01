const express = require("express");
const login = require("../controllers/User")

const UserRoutes = express.Router();

UserRoutes.post("/login", login);

module.exports = UserRoutes;
