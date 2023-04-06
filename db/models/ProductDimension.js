"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDimension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductDimension.init(
    {
      productId: { type: DataTypes.STRING },
      productName: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      subCategory: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "ProductDimension",
    }
  );
  return ProductDimension;
};
