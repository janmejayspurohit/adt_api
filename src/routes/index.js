import { Router } from "express";
import healthCheckRoutes from "./healthCheck";
import publicRoutes from "./public";
import apiRoutes from "./api";
import adminRoutes from "./admin";
import apiMiddleware from "../middleware/apiAuth";
import adminMiddleware from "../middleware/adminAuth";

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
    middlewares: [apiMiddleware, adminMiddleware],
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, ...route.middlewares, route.route);
});

export default router;
