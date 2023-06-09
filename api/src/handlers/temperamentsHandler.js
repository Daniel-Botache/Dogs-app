const { dogsFromApi } = require("../controllers/dogsControllers");
const {
  createTemperamentsDb,
} = require("../controllers/temperamentsControllers");

const getTemperamentsHandler = async (req, res) => {
  try {
    const data = await dogsFromApi();
    let temperamentsArray = [];
    data.forEach((dog) => {
      if (dog.temperament) {
        const temperament = dog.temperament.split(",");
        temperament.forEach((temperament) => {
          if (!temperamentsArray.includes(temperament)) {
            temperamentsArray.push(temperament);
          }
        });
      }
    });
    const temperaments = createTemperamentsDb(temperamentsArray);
    res.status(200).json(temperamentsArray);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getTemperamentsHandler;
