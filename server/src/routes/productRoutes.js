const { Router } = require("express");
const upload = require("../middlewares/upload");
const {
  createProduct,
  getProducts,
  getProductByBarcode,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = Router();

router.get("/", getProducts);
router.get("/:barcode", getProductByBarcode);

// Ruta para crear producto con imágenes
router.post("/", upload.array('imagenes', 5), createProduct); // máximo 5 imágenes

// Ruta para actualizar producto con imágenes
router.patch("/:barcode", upload.array('imagenes', 5), updateProduct);

router.delete("/:barcode", deleteProduct);

module.exports = router;