const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");
const rootSequelize = require("./db/sequelize");

const sequelize = rootSequelize;

const columns = {
  "Row ID": "rowId",
  "Order ID": "orderId",
  "Order Date": "orderDate",
  "Ship Date": "shipDate",
  "Ship Mode": "shipMode",
  "Customer ID": "customerId",
  "Customer Name": "customerName",
  Segment: "segment",
  Country: "country",
  City: "city",
  State: "state",
  "Postal Code": "postalCode",
  Region: "region",
  "Product ID": "productId",
  Category: "category",
  "Sub-Category": "subCategory",
  "Product Name": "productName",
  Sales: "sales",
};

const OrderSalesRaw = sequelize.define("OrderSalesRaw", {
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
});

const CustomerDimension = sequelize.define("CustomerDimension", {
  customerId: { type: DataTypes.STRING },
  customerName: { type: DataTypes.STRING },
  segment: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING },
  postalCode: { type: DataTypes.STRING },
  region: { type: DataTypes.STRING },
});

const ProductDimension = sequelize.define("ProductDimension", {
  productId: { type: DataTypes.STRING },
  productName: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  subCategory: { type: DataTypes.STRING },
});

const OrderSalesFactTable = sequelize.define("OrderSalesFactTable", {
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
});

async function main() {
  try {
    const csvFilePath = path.join(__dirname, "data.csv");
    const csvData = fs.readFileSync(csvFilePath, "utf-8");

    const csvRows = csvData.split("\n");
    const headers = csvRows.shift().split(",");
    const data = csvRows.slice(1).map((row) => {
      const values = row.split(",");
      const obj = {};
      headers.forEach((header, index) => {
        if (values[index]) obj[columns[header]] = values[index];
      });
      return obj;
    });

    await sequelize.sync({ force: true });

    await OrderSalesRaw.sync();

    await OrderSalesRaw.bulkCreate(data);

    await CustomerDimension.sync();

    const customerDimensionData = data.map((row) => {
      const { customerId, customerName, segment, country, city, state, postalCode, region } = row;
      return { customerId, customerName, segment, country, city, state, postalCode, region };
    });

    await CustomerDimension.bulkCreate(customerDimensionData);

    await ProductDimension.sync();

    const productDimensionData = data.map((row) => {
      const { productId, productName, category, subCategory } = row;
      return { productId, productName, category, subCategory };
    });

    await ProductDimension.bulkCreate(productDimensionData);

    await OrderSalesFactTable.sync();

    const orderSalesFactTableData = data.map((row) => {
      const { rowId, orderId, productId, productName, customerId, postalCode, orderDate, shipDate, shipMode, sales } = row;
      return { rowId, orderId, productId, productName, customerId, postalCode, orderDate, shipDate, shipMode, sales };
    });

    await OrderSalesFactTable.bulkCreate(orderSalesFactTableData);

    console.log("Data has been seeded into the db!");

    const modelsDirPath = path.join(__dirname, "db/models");
    if (!fs.existsSync(modelsDirPath)) {
      fs.mkdirSync(modelsDirPath);
    }
    fs.writeFileSync(path.join(modelsDirPath, "OrderSalesRaw.js"), OrderSalesRaw.toString());
    fs.writeFileSync(path.join(modelsDirPath, "CustomerDimension.js"), CustomerDimension.toString());
    fs.writeFileSync(path.join(modelsDirPath, "ProductDimension.js"), ProductDimension.toString());
    fs.writeFileSync(path.join(modelsDirPath, "OrderSalesFactTable.js"), OrderSalesFactTable.toString());
    console.log("Models added to folder!");
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

main();
