const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogsRoutes");
const temperamentsRouter = require("./temperamentsRoutes");
const loginRouter = require("./loginRoutes");

const routes = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

routes.use("/login", loginRouter);
routes.use("/dogs", dogsRouter);
routes.use("/temperaments", temperamentsRouter);

module.exports = routes;
