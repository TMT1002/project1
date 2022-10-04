const {Router} = require("express"); 
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const homeRoute = require("./home.route");
const adminRoute = require("./admin.route");

const router = Router();
const defaultRoutes = [
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;

