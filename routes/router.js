const router = require("express").Router();
const cntrl = require('./controller');

router.route("/users")
      .get(cntrl.getAll)
      .post(cntrl.creatUser)

router.route("/user/:id")
      .put(cntrl.updateUser)
      .delete(cntrl.deleteUser)

router.route("/auth")
      .post(cntrl.signInUser)
  
  
module.exports = router