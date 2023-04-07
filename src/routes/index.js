const Router = require("express");
const healthCheckRoutes = require("./healthCheck");
const publicRoutes = require("./public");
const apiRoutes = require("./api");
const adminRoutes = require("./admin");
const apiMiddleware = require("../middleware/apiAuth");

const router = Router();

const defaultRoutes = [
  {
    path: "/",
    route: healthCheckRoutes,
    middlewares: [],
  },
  {
    path: "/pub",
    route: publicRoutes,
    middlewares: [],
  },
  {
    path: "/api",
    route: apiRoutes,
    middlewares: [apiMiddleware],
  },
  {
    path: "/api/admin",
    route: adminRoutes,
    middlewares: [apiMiddleware],
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, ...route.middlewares, route.route);
});

module.exports = router;
