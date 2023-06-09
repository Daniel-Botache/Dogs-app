const axios = require("axios");
const { Dogs } = require("../db");
const { Temperaments } = require("../db");
const { Sequelize } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds/";

const cleanInfo = (array) => {
  return array.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      lifespan: dog.life_span,
      weight: dog.weight.metric,
      height: dog.height.metric,
      temperament: dog.temperament,
      image: dog.image.url,
      created: false,
    };
  });
};

const dogsFromApi = async () => {
  const responseApi = await axios.get(`${URL}`);
  const data = responseApi.data;
  let dogApi = cleanInfo(data);
  return dogApi;
};

const dogsFromDb = async () => {
  const dogs = await Dogs.findAll({
    include: [
      {
        model: Temperaments,
        as: "temperament",
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  const dogsWithTemperaments = dogs.map((dog) => {
    const temperaments = dog.temperament.map((temp) => temp.name);
    return {
      ...dog.toJSON(),
      temperament: temperaments.join(", "),
    };
  });

  return dogsWithTemperaments;
};

const getDogByIdFromDB = async (id) => {
  return await Dogs.findOne({ where: { id } });
};

const getDogByNameFromApi = async (name) => {
  const apiResponse = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
  );
  const data = apiResponse.data;
  const dogApi = data.map((dog) => {
    let imageExtension = ".jpg"; // Extensión por defecto
    if (dog.id === 15 || dog.id === 125 || dog.id === 212) {
      imageExtension = ".png";
    }
    return {
      id: dog.id,
      name: dog.name,
      life_span: dog.life_span,
      weight: dog.weight.metric,
      height: dog.height.metric,
      temperament: dog.temperament,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}${imageExtension}`,
      created: false,
    };
  });
  return dogApi;
};

const getDogByNameFromDb = async (lowerCaseName) => {
  return await Dogs.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${lowerCaseName}%`,
      },
    },
  });
};

const createDogsController = async (
  name,
  weight,
  height,
  lifespan,
  temperaments,
  image,
  userId
) => {
  const newDog = await Dogs.findOrCreate({
    where: { name, weight, height, lifespan, image },
  });
  //relation many to many
  const temperamentsArr = temperaments;
  temperamentsArr.forEach(async (temperament) => {
    await newDog[0].addTemperament(temperament);
  });
  //relation one Dog to one User
  await newDog[0].setUser(userId);

  return newDog;
};

const deleteDogsController = async (id) => {
  return await Dogs.destroy({ where: { id } });
};

const putDogsController = async (id) => {
  return await Dogs.findByPk(id);
};

module.exports = {
  dogsFromApi,
  dogsFromDb,
  getDogByIdFromDB,
  getDogByNameFromApi,
  getDogByNameFromDb,
  createDogsController,
  deleteDogsController,
  putDogsController,
};
