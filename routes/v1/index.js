const {Router} = require("express"); 
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const homeRoute = require("./home.route")

const router = Router();
const defaultRoutes = [
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;

