const { Temperaments } = require("../db");
const URL = "https://api.thedogapi.com/v1/breeds/";
const axios = require("axios");

const createTemperamentsDb = async (temperamentsArray) => {
  return await Temperaments.bulkCreate(
    temperamentsArray.map((temperament) => ({ name: temperament }))
  );
};

module.exports = { createTemperamentsDb };
