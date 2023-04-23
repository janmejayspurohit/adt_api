const AppResponse = require("../../middleware/AppResponse");
const catchAsync = require("../../helpers/catchAsync");
const { OrderSalesRaw } = require("../../../db/models");
const { sequelize } = require("../../../db/models");
const { Op } = require("sequelize");

const report1 = catchAsync(async (req, res, next) => {
  const result = await OrderSalesRaw.findAll({
    where: {
      category: { [Op.not]: null },
    },
    attributes: ["category", "subCategory", [sequelize.fn("count", sequelize.col("orderId")), "orderCount"]],
    group: ["category", "subCategory"],
  });

  const data = { result };
  next(new AppResponse({ data }));
});

module.exports = {
  report1,
};
