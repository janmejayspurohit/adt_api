"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderSalesRaw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderSalesRaw.init(
    {
      rowId: { type: DataTypes.INTEGER },
      orderId: { type: DataTypes.STRING },
      orderDate: { type: DataTypes.STRING },
      shipDate: { type: DataTypes.STRING },
      shipMode: { type: DataTypes.STRING },
      customerId: { type: DataTypes.STRING },
      customerName: { type: DataTypes.STRING },
      segment: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING },
      postalCode: { type: DataTypes.STRING },
      region: { type: DataTypes.STRING },
      productId: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      subCategory: { type: DataTypes.STRING },
      productName: { type: DataTypes.STRING },
      sales: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      modelName: "OrderSalesRaw",
    }
  );
  return OrderSalesRaw;
};
