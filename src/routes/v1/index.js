import express from 'express';
import dataRoute from './data.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/data',
    route: dataRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
