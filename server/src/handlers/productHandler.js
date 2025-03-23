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

module.exports = {getProductHandler}