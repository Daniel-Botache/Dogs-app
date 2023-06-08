const { User } = require("../db");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Faltan datos");
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send("Usuario no encontrado");
    if (user.password != password) {
      return res.status(403).send("Contraseña incorrecta");
    }
    return res.status(200).json({ access: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Faltan datos");
    const user = await User.findOrCreate({ where: { email, password } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  loginHandler,
  createUserHandler,
};
