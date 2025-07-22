const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // Nombre de la tabla de usuarios
          key: "id",
        },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Products", // Nombre de la tabla de productos
          key: "id",
        },
      },
      reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      timestamps: true, // Agrega createdAt y updatedAt
    }
  );
};
