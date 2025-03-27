const { Product } = require("../db");
const { Op, where } = require("sequelize");
const axios = require("axios");
const URL = "https://fakestoreapi.com/products";

const getAllProducts = async () => {
  // productos de la api fake store
  const response = await axios.get(URL);
  const products = response.data;
  return products;
};

const getProductId = async (id) => {
  // producto por id de la api fake store
  const product = (await axios.get(`${URL}/${id}`)).data;
  return product;
};

const getProductName = async (name) => {
  // producto por nnpmbre de la api fake store
  const product = (await axios.get(`${URL}`)).data.filter(
    (product) => product.title === name
  );
  return product;
};

const getProductsFilter = async (category, gender, size, rating, min, max) => {
  const products = await getAllProducts();
  let filteredProducts = products;
};
if (category) {
  filteredProducts = filteredProducts.filter(
    (product) => product.category === category
  );
}
if (gender) {
  filteredProducts = filteredProducts.filter(
    (product) => product.category === gender
  );
  if (size) {
    filteredProducts = filteredProducts.filter(
      (product) => product.size === size
    );
  }
  if (rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating.rate >= rating
    );
  }
  if (min && max) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
  return filteredProducts;
}

const postProduct = async (
  name,
  price,
  description,
  image,
  category,
  rating,
  stock,
  gender,
  size
) => {
  return await Product.create({
    name,
    price,
    description,
    image,
    category,
    rating,
    stock,
    gender,
    size,
  });
};

const putProduct = async (
  name,
  price,
  description,
  image,
  category,
  rating,
  stock,
  gender,
  size
) => {
  return await Product.update(
    {
      name,
      price,
      description,
      image,
      category,
      rating,
      stock,
      gender,
      size,
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
  getProductsFilter,
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
};
