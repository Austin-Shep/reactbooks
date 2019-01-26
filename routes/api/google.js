const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// here we wil lroute the controller, to be accesed from our api on client side
router
    .route("/")
    .get(googleController.findAll);

module.exports = router;