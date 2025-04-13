const {
  getAllProducts,
  getProductId,
  getProductName,
  getProductsFilter,
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productController");

const getProductHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const response = await getProductName(name);
      return res.status(200).json(response);
    } else {
      const response = await getAllProducts();
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFilterHandler = async (req, res) => {
  const { category, gender, color, size, rating, min, max } = req.query;

  try {
    if (!category && !gender && !color && !size && !rating && !min && !max) {
      //   return res.status(400).json({ error: "Al menos un parámetro de filtro es requerido" });
      const allProducts = await getAllProducts();
      return res.status(200).json(allProducts);
    }

    const ratingNum = rating ? Number(rating) : undefined;
    const minNum = min ? Number(min) : undefined;
    const maxNum = max ? Number(max) : undefined;
    
    if (rating && isNaN(ratingNum)) {
      return res.status(400).json({ error: "Rating debe ser un número" });
    }

    const response = await getProductsFilter(
      category,
      gender,
      color,
      size,
      rating,
      min,
      max
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postProductHandler = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    rating,
    stock,
    gender,
    size,
  } = req.body;
  try {
    const response = await postProduct(
      name,
      price,
      description,
      image,
      category,
      rating,
      stock,
      gender,
      size
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putProductHandler = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    image,
    category,
    rating,
    stock,
    gender,
    size,
  } = req.body;
  try {
    const response = await putProduct(
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
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const patchProductHandler = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    image,
    category,
    rating,
    stock,
    gender,
    size,
  } = req.body;
  try {
    const response = await patchProduct(
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
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProduct(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProductHandler,
  getFilterHandler,
  getDetailHandler,
  postProductHandler,
  putProductHandler,
  patchProductHandler,
  deleteProductHandler,
};
