"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderSalesFactTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderSalesFactTable.init(
    {
      rowId: { type: DataTypes.INTEGER },
      orderId: { type: DataTypes.STRING },
      productId: { type: DataTypes.STRING },
      productName: { type: DataTypes.STRING },
      customerId: { type: DataTypes.STRING },
      postalCode: { type: DataTypes.STRING },
      orderDate: { type: DataTypes.STRING },
      shipDate: { type: DataTypes.STRING },
      shipMode: { type: DataTypes.STRING },
      sales: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: "OrderSalesFactTable",
    }
  );
  return OrderSalesFactTable;
};
