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

const report2 = catchAsync(async (req, res, next) => {
  const result = await OrderSalesRaw.findAll({
    where: { sales: { [Op.not]: NaN } },
    attributes: ["country", [sequelize.fn("SUM", sequelize.col("sales")), "totalSales"]],
    group: "country",
    order: sequelize.literal("SUM(sales) DESC"),
    raw: true,
  });
  const data = { result };
  next(new AppResponse({ data }));
});

const report3 = catchAsync(async (req, res, next) => {
  const fetchedResult = await OrderSalesRaw.findAll({});

  let result = {};

  if (fetchedResult && fetchedResult.length) {
    fetchedResult.forEach((item) => {
      const month = new Date(item.orderDate).getMonth() + 1;
      const year = new Date(item.orderDate).getFullYear();
      if (!month || !year) return;
      if (!item.sales) return;
      if (!result[year]) {
        result[year] = {};
      }
      if (result[year][month]) {
        result[year][month] += item.sales;
      } else {
        result[year][month] = item.sales;
      }
    });

    result = Object.keys(result)
      .sort((a, b) => parseInt(a) - parseInt(b)) // sort years in ascending order
      .reduce((acc, key) => {
        acc[key] = Object.keys(result[key])
          .sort((a, b) => parseInt(a) - parseInt(b)) // sort months in ascending order
          .reduce((nestedAcc, nestedKey) => {
            nestedAcc[nestedKey] = result[key][nestedKey];
            return nestedAcc;
          }, {});
        return acc;
      }, {});
  }

  const data = { result };
  next(new AppResponse({ data }));
});

const newData = catchAsync(async (req, res, next) => {
  await OrderSalesRaw.create({ ...req.body, rowId: Date.now() % 10000 });
  next(new AppResponse({ data: { message: "New data entered" } }));
});

module.exports = {
  report1,
  report2,
  report3,
  newData,
};
