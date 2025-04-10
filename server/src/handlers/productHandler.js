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
  const { name, category, gender, size, rating, min, max } = req.query;
  try {
    if (name) {
      const response = await getProductName(name);
      return res.status(200).json(response);
    }
    if (category || gender || size || rating || min || max) {
      const response = await getProductsFilter(
        category,
        gender,
        size,
        rating,
        min,
        max
      );
      return res.status(200).json(response);
    } else {
      const response = await getAllProducts();
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  getDetailHandler,
  postProductHandler,
  putProductHandler,
  patchProductHandler,
  deleteProductHandler,
};
