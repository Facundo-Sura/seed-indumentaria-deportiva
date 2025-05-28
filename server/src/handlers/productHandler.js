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
  const { category, gender, size, color, brand, material, season, isOnSale } =
    req.query;

  try {
    if (
      !category &&
      !gender &&
      !size &&
      !color &&
      !brand &&
      !material &&
      !season &&
      !isOnSale
    ) {
      //   return res.status(400).json({ error: "Al menos un parámetro de filtro es requerido" });
      const allProducts = await getAllProducts();
      console.log(allProducts);
      return res.status(200).json(allProducts);
    }

    const response = await getProductsFilter(
      category,
      gender,
      size,
      color,
      brand,
      material,
      season,
      isOnSale
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
    stock,
    gender,
    size,
    color,
    brand,
    material,
  } = req.body;

  try {
    const response = await postProduct(
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
    );
    console.log(response);
    res.status(200).json({message: 'producto creado'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Modifiacion completa de producto
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
    console.log(response);
    res.status(200).json({message: 'producto modificado'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Modifiacion parcial de producto
const patchProductHandler = async (req, res) => {
  const { id } = req.params;

  const { rating } = req.body;

  try {
    const response = await patchProduct(id, rating);
    console.log(response);
    res.status(200).json({ message: "valoracion agregada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteProduct(id);
    console.log(response);
    res.status(200).json({ message: "Producto eliminado" });
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
