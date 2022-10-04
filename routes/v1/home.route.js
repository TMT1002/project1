const {Router} = require("express"); 
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json("Hello everyone!!!")
});

module.exports = router;