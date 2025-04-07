const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Order', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      size: {
        type: DataTypes.STRING, // o ENUM con tallas disponibles
        allowNull: false
      },
      priceAtPurchase: { // Guarda el precio en el momento de la compra
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'shipped', 'cancelled'),
        defaultValue: 'pending'
      },
      purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  };