const { Router } = require("express");
const {
  loginHandler,
  createUserHandler,
} = require("../handlers/loginHandlers");

//routes for /login

const loginRouter = Router();

loginRouter.post("/", loginHandler);
loginRouter.post("/create", createUserHandler);

module.exports = loginRouter;
