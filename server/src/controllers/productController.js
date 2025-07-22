const { Product } = require("../db");
const { Op, where } = require("sequelize");

const getAllProducts = async () => {
  const products = await Product.findAll({});
  return products;
};

const getProductId = async (id) => {
  const product = await Product.findByPk(id);
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
  size,
  color,
  brand,
  material,
  season,
  isOnSale
) => {
  const whereClause = {};

  try {
    if (category) {
      whereClause.category = {
        [Op.iLike]: `%${category}%`,
      };
    }

    if (gender) {
      const searchGender = gender.toLowerCase();
      whereClause.gender = {
        [Op.contains]: [searchGender],
      };
    }

    if (size) {
      const searchSize = size.toUpperCase();
      whereClause.size = {
        [Op.contains]: [searchSize],
      };
    }

    if (color) {
      const searchColor = color.toLowerCase();
      whereClause.color = {
        [Op.contains]: [searchColor],
      };
    }

    if (brand) {
      whereClause.brand = {
        [Op.iLike]: `%${brand}%`,
      };
    }

    if (material) {
      whereClause.material = {
        [Op.iLike]: `%${material}%`,
      };
    }

    if (season) {
      whereClause.season = {
        [Op.iLike]: `%${season}%`,
      };
    }

    if (isOnSale) {
      whereClause.isOnSale = isOnSale;
    }

    const filteredProducts = await Product.findAll({
      where: whereClause,
    });

    return filteredProducts;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw new Error("Error al filtrar productos");
  }
};

const postProduct = async (
  name,
  price,
  description,
  image,
  category,
  gender,
  size,
  color,
  stock,
  brand,
  material
) => {
  // Validaciones básicas
  if (!Array.isArray(image))
    throw new Error("El campo image debe ser un array de URLs");
  if (!Array.isArray(gender))
    throw new Error("El campo gender debe ser un array");
  if (!Array.isArray(size)) throw new Error("El campo size debe ser un array");
  if (!Array.isArray(color))
    throw new Error("El campo color debe ser un array");

  const newProduct = await Product.create({
    name,
    price,
    description,
    image,
    category,
    gender,
    size,
    color,
    stock,
    brand,
    material,
  });

  return newProduct.toJSON();
};

// Modifiacion completa de producto
const putProduct = async (
  id,
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

// Modifiacion parcial de producto
const patchProduct = async (id, rating) => {
  try {
    // Verificar si el producto existe
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    // Validar el rating (ahora manejando tanto número como array)
    let ratingValue;

    if (Array.isArray(rating)) {
      ratingValue = parseFloat(rating[0]); // Convertir a número si viene como string
    } else {
      ratingValue = parseFloat(rating);
    }

    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      throw new Error("El rating debe ser un número entre 0 y 5");
    }

    // Obtener el array actual de ratings
    let currentRatings = [];
    if (existingProduct.rating) {
      currentRatings = Array.isArray(existingProduct.rating)
        ? existingProduct.rating
        : [existingProduct.rating];
    }

    // Agregar el nuevo rating al array
    const newRatings = [...currentRatings, ratingValue];

    // Calcular el promedio
    const averageRating =
      newRatings.reduce((a, b) => a + b, 0) / newRatings.length;

    // Actualizar el producto
    const [updatedRows] = await Product.update(
      {
        rating: newRatings,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedRows === 0) {
      throw new Error("No se pudo actualizar el producto");
    }

    return {
      success: true,
      message: "Producto actualizado correctamente",
      ratings: newRatings,
      averageRating: Number(averageRating.toFixed(2)),
      totalRatings: newRatings.length,
    };
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
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
