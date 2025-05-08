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

// Orden CORRECTO de rutas (las más específicas primero) Rutas usuarios
router.get("/filter", getFilterHandler);  // Filtros
router.get("/search", getProductHandler); // Búsqueda por nombre
router.get("/:id", getDetailHandler);     // Detalle por ID (UUID)
router.get("/", getProductHandler);       // Todos los productos
router.patch("/:id", patchProductHandler);

// Rutas de admin
router.post("/admin/", postProductHandler);
router.put("/admin/:id", putProductHandler);
router.delete("/admin/:id", deleteProductHandler);

module.exports = router;