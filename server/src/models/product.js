const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Para múltiples imágenes
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING, // Ej: "camisetas", "pantalones", "vestidos"
      allowNull: false,
    },
    gender: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Género al que va dirigido
      allowNull: false,
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Ej: ["S", "M", "L"]
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Ej: ["rojo", "azul", "negro"]
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER, // Cantidad disponible
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING, // Marca del producto
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING, // Ej: "algodón", "poliéster"
      allowNull: true, // Opcional
    },
    isOnSale: {
      type: DataTypes.BOOLEAN, // ¿Está en oferta?
      allowNull: true,
      defaultValue: false,
    },
    discountPercentage: {
      type: DataTypes.INTEGER, // Porcentaje de descuento (ej: 20)
      allowNull: true, // Opciona
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0, // Valor mínimo de rating
        max: 5, // Valor máximo de rating
      },
    },
  });
};
