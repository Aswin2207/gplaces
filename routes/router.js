const router = require("express").Router();
const cntrl = require('./controller');

router.route("/similarPlaces")
      .post(cntrl.getPlaces)
      

module.exports = router