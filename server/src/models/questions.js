const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Question",
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
      questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answerText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Agrega createdAt y updatedAt
    }
  );
}