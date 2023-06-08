const { Router } = require("express");
const {
  getDogsHandler,
  getDogsByIdHandler,
  getDogByNameHandler,
  createDogHandler,
  putDogHandler,
  deleteDoghandler,
} = require("../handlers/dogsHandlers");
//routes for /dogs

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/?name", getDogByNameHandler);
dogsRouter.get("/:id", getDogsByIdHandler);
dogsRouter.post("/", createDogHandler);
dogsRouter.delete("/:id", deleteDoghandler);
dogsRouter.put("/:id", putDogHandler);
module.exports = dogsRouter;
