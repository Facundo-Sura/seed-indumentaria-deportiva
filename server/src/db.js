require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
const capitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [capitalize(entry[0]), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Order, Cart, Favorite, Question, Review } = sequelize.models;

// Relaciones User-Product (muchos a muchos a través de Cart)
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });

// Relaciones User-Product (muchos a muchos a través de Favorite)
User.belongsToMany(Product, { 
  through: Favorite, 
  foreignKey: 'userId',
  as: 'favorites' // alias para diferenciar de la relación del carrito
});
Product.belongsToMany(User, { 
  through: Favorite, 
  foreignKey: 'productId',
  as: 'favoritedBy' 
});

// Relaciones Product-Review (un producto tiene muchas reviews)
Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// Relaciones User-Review (un usuario puede hacer muchas reviews)
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Relaciones Product-Question (un producto tiene muchas preguntas)
Product.hasMany(Question, { foreignKey: 'productId' });
Question.belongsTo(Product, { foreignKey: 'productId' });

// Relaciones User-Question (un usuario puede hacer muchas preguntas)
User.hasMany(Question, { foreignKey: 'userId' });
Question.belongsTo(User, { foreignKey: 'userId' });

// Relación User-Product a través de Order (compras)
User.belongsToMany(Product, { 
  through: Order, 
  foreignKey: 'userId',
  as: 'purchases' // alias para diferenciar
});
Product.belongsToMany(User, { 
  through: Order, 
  foreignKey: 'productId',
  as: 'purchasedBy' 
});

// Si necesitas acceder directamente a la compra:
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

// Manejo de errores en la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Database error:", err);
  });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  sequelize,
};
