const { Router } = require("express");
const getTemperamentsHandler = require("../handlers/temperamentsHandler");
//routes for /temperaments

const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);

module.exports = temperamentsRouter;
