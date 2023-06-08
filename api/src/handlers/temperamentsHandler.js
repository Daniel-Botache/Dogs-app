const { Temperaments } = require("../db");
const URL = "https://api.thedogapi.com/v1/breeds/";
const axios = require("axios");

const getTemperamentsHandler = async (req, res) => {
  try {
    const responseApi = await axios.get(`${URL}`);
    const data = responseApi.data;
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
    const temperaments = await Temperaments.bulkCreate(
      temperamentsArray.map((temperament) => ({ name: temperament }))
    );
    res.status(200).json(temperamentsArray);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getTemperamentsHandler;
