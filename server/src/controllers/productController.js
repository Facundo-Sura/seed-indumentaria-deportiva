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

const getProductsFilter = async (
  category,
  gender,
  color,
  size,
  rating,
  min,
  max
) => {
  const whereClause = {};

  if (category) {
    whereClause.category = {
      [Op.iLike]: `%${category}%`,
    };
  }

  if (gender) {
    whereClause.gender = {
      [Op.iLike]: `%${gender}%`,
    };
  }

  if (color) {
    const searchColor = color.toLowerCase();
    whereClause.color = {
      [Op.contains]: [searchColor]
    };
  }

  if (size) {
    const searchSize = size.toUpperCase();
    whereClause.size = {
      [Op.contains]: [searchSize] // Busca si el array contiene el tamaño especificado,
    };
  }

  if (rating) {
    whereClause.rating = {
      [Op.gte]: rating,
    };
  }

  if (min && max) {
    whereClause.price = {
      [Op.between]: [min, max],
    };
  } else if (min) {
    whereClause.price = {
      [Op.gte]: min,
    };
  } else if (max) {
    whereClause.price = {
      [Op.lte]: max,
    };
  }

  const filteredProducts = await Product.findAll({
    where: whereClause,
  });

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
