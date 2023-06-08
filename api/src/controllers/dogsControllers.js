const axios = require("axios");
const { Dogs } = require("../db");
const { Sequelize } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds/";

const DogsFromApi = async () => {
  const responseApi = await axios.get(`${URL}`);
  return responseApi.data;
};

const getAllDogs = async () => {
  return Dogs.findAll();
};

const getDogByIdFromApi = async (id) => {
  const response = await axios.get(`${URL}${id}`);
  const { name, weight, height, life_span, image, temperament } = response.data;
  return {
    name: name,
    weight: weight.metric,
    height: height.metric,
    life_span: life_span,
    image,
    temperament,
  };
};

const getDogByIdFromDB = async (id) => {
  return await Dogs.findOne({ where: { id } });
};

const getDogByNameFromApi = async (name) => {
  const apiResponse = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
  );
  return apiResponse.data;
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
  image,
  UserId
) => {
  return await Dogs.findOrCreate({
    where: { name, weight, height, lifespan, image, UserId },
  });
};

const deleteDogsController = async (id) => {
  return await Dogs.destroy({ where: { id } });
};

const putDogsController = async (id) => {
  return await Dogs.findByPk(id);
};

module.exports = {
  DogsFromApi,
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDB,
  getDogByNameFromApi,
  getDogByNameFromDb,
  createDogsController,
  deleteDogsController,
  putDogsController,
};
