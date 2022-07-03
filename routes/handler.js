const jwt = require('jsonwebtoken');


exports.verifyToken = (req) => {
    if(req.headers['token'] && req.headers['userid'] ){
      const authenticated = jwt.verify(req.headers['token'],"72e5e758253201f053d4474ce4f5ae4e");
      if(authenticated){
        return true
      }
      else{
        return false
      }
    }
    else{
        return false
    }
};

exports.sendToken = (result) => {
    const token= jwt.sign(
        { user_id: result.userId, email:result.email },
         "72e5e758253201f053d4474ce4f5ae4e"
      );
      return token
};

// errHandler = (res,err) => {
//     let a = err.sqlMessage;
//     let msg = "Something went wrong";    
//     if(a.includes("Duplicate")){
//        msg  = `Data already exist in ${a.split(".").pop().replace(/\'/,'')}` 
//     }
//     res.json(({"status": 409, "err": msg}));
// };

// resHandler = (res,results) => {
//     res.status(200).json(({"status": 200,"data": results}))
// };

// authHandler = (err,results,res) => {
//     if(err.check){
//         res.status(200).json(({"status": 200,"data": results}))
//     }else{
//         res.status(401).json(({"status": 401,"err": "Credentials not valid"}))
//     }
// };

