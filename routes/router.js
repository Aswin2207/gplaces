const router = require("express").Router();
const cntrl = require('./controller');

router.route("/users")
      .post(cntrl.getAllUsers)
      
router.route("/register").
      post(cntrl.registerUser)

router.route("/createUser").
      post(cntrl.creatUser)

// router.route("/user/:id")
//       .put(cntrl.updateUser)
//       .delete(cntrl.deleteUser)

router.route("/authenticate")
      .post(cntrl.signInUser)

 router.route("/requests/create")
      .post(cntrl.createReq)

 router.route("/requests")
      .get(cntrl.getReq)

 router.route("/dashboard")
      .get(cntrl.dashDetails)
     
 router.route("/")
      .get(cntrl.dummy)

  
module.exports = router