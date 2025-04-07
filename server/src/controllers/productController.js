const { Product } = require("../db");
const { Op, where } = require("sequelize");

const getAllProducts = async () => {
  const products = await Product.findAll({});
  return products;
};

const getProductId = async (id) => {
  const product = await Product.findByPk(id);
  console.log(product);
  return product;
};

const getProductName = async (name) => {
  const product = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return product;
};

const getProductsFilter = async (category, gender, size, rating, min, max) => {
  const products = await getAllProducts();
  let filteredProducts = products;

  if (category) {
    filteredProducts = await Product.findAll({
      where: {
        category: {
          [Op.iLike]: `%${category}%`,
        },
      },
    });
  }

  if (gender) {
    filteredProducts = await Product.findAll({
      where: {
        gender: {
          [Op.iLike]: `%${gender}%`,
        },
      },
    });
  }

  if (size) {
    filteredProducts = await Product.findAll({
      where: {
        size: {
          [Op.iLike]: `%${size}%`,
        },
      },
    });
  }

  if (rating) {
    filteredProducts = await Product.findAll({
      where: {
        rating: {
          [Op.gte]: rating,
        },
      },
    });
  }

  if (min && max) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
  console.log(filteredProducts);
    return filteredProducts;
};
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
