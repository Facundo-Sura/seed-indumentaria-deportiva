const { Product } = require("../db");
const axios = require("axios");
const URL = "https://fakestoreapi.com/products";

const getAllProducts = async () => {
  const response = await axios.get(URL);
  const products = response.data;
  return products;
};

const getProductId = async (id) => {
  const product = (await axios.get(`${URL}/${id}`)).data;
  return product;
};

const getProductName = async (name) => {
  const product = (await axios.get(`${URL}`)).data.filter(
    (product) => product.title === name
  );
  return product;
};

const postProduct = async (
  title,
  price,
  description,
  image,
  category,
  rating
) => {
  return await Product.create({
    title,
    price,
    description,
    image,
    category,
    rating,
  });
};

const putProduct = async (
  id,
  title,
  price,
  description,
  image,
  category,
  rating
) => {
  return await Product.update(
    {
      title,
      price,
      description,
      image,
      category,
      rating,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

const patchProduct = async (id, rating) => {
  return await Product.update(
    {
      rating,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

const deleteProduct = async (id) => {
  return await Product.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductId,
  getProductName,
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
};
