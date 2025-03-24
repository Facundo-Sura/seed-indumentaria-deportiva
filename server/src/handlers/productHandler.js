const {
  getAllProducts,
  getProductId,
  getProductName,
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
      res.status(200).json(response);
    } else {
      const response = await getAllProducts();
      res.status(200).json(response);
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

module.exports = {getProductHandler, getDetailHandler}