const { sequelize } = require("../src/db.js");
const { Product } = require("../src/db.js");
const productsData = require("../src/api/products.json"); // Cambié el nombre para mayor claridad

async function initializeDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la DB establecida');

    await sequelize.sync({ force: true });
    console.log('✅ Tablas sincronizadas');

    if (!Product) throw new Error('Modelo Product no encontrado');

    // Corregido: accede a productsData.products
    await Product.bulkCreate(productsData.products);
    console.log(`✅ ${productsData.products.length} productos insertados`); // Muestra el conteo real

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await sequelize.close();
  }
}

initializeDB();