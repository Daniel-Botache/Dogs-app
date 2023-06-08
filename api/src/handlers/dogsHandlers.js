const {
  DogsFromApi,
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDB,
  getDogByNameFromApi,
  getDogByNameFromDb,
  createDogsController,
  deleteDogsController,
  putDogsController,
} = require("../controllers/dogsControllers");
//---------------------------------------------------------------------

const getDogsHandler = async (req, res) => {
  try {
    const data = await DogsFromApi();
    const responseDb = await getAllDogs();
    const dogsArray = [...data, ...responseDb]; //array where the dogs from the API and the DB will be stored
    return res.status(200).json(dogsArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//---------------------------------------------------------------------

const getDogsByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let dog = {};
    if (id.length < 4) {
      dog = await getDogByIdFromApi(id);
    } else {
      dog = await getDogByIdFromDB();
    }
    if (!dog.name) return res.status(404).send("dog not found");
    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//---------------------------------------------------------------------

const getDogByNameHandler = async (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  try {
    const lowerCaseName = name.toLowerCase();

    // Search in the external API
    const apiDogs = await getDogByNameFromApi(name);

    // Search in the DB
    const dbDogs = await getDogByNameFromDb(lowerCaseName);

    const allDogs = [...apiDogs, ...dbDogs]; //array where the dogs from the API and the DB will be stored

    if (allDogs.length === 0) {
      return res.status(404).json({
        message: "No se encontraron razas de perros con ese nombre.",
      });
    }

    return res.status(200).json(allDogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//---------------------------------------------------------------------

const createDogHandler = async (req, res) => {
  try {
    const { name, weight, height, lifespan, image, UserId } = req.body;
    if (!name || !weight || !height || !lifespan || !image)
      return res.status(400).send("Faltan datos");
    const dog = await createDogsController(
      name,
      weight,
      height,
      lifespan,
      image,
      UserId
    );
    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//---------------------------------------------------------------------

const deleteDoghandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDogsController(id);
    const dogs = await getAllDogs();
    return res.status(200).json(dogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//----------------------------------------------------------------------

const putDogHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight, height, lifespan, image } = req.body;
    const dog = await putDogsController(id);
    if (!dog) return res.status(404).send("Dog not found");

    //New values from body to DB
    dog.name = name;
    dog.weight = weight;
    dog.height = height;
    dog.lifespan = lifespan;
    dog.image = image;
    await dog.save(); //saving changes
    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getDogsHandler,
  getDogsByIdHandler,
  getDogByNameHandler,
  createDogHandler,
  deleteDoghandler,
  putDogHandler,
};
