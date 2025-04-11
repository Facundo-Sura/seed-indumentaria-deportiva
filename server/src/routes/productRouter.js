const { Router } = require("express");

const router = Router();

const {
  getProductHandler,
  getFilterHandler,
  getDetailHandler,
  postProductHandler,
  putProductHandler,
  patchProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");

// Orden CORRECTO de rutas (las más específicas primero)
router.get("/filter", getFilterHandler);  // Filtros
router.get("/search", getProductHandler); // Búsqueda por nombre
router.get("/:id", getDetailHandler);     // Detalle por ID (UUID)
router.get("/", getProductHandler);       // Todos los productos

// Resto de las rutas...
router.post("/", postProductHandler);
router.put("/:id", putProductHandler);
router.patch("/:id", patchProductHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;