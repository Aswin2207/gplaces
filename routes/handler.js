exports.handler = (err, results, res) => {
    if(err.type == "auth"){
        authHandler(err,results,res)
    }else{
        err ? errHandler(res, err) : resHandler(res, results)
    }
}

errHandler = (res,err) => {
    let a = err.sqlMessage;
    let msg = "Something went wrong";    
    if(a.includes("Duplicate")){
       msg  = `Data already exist in ${a.split(".").pop().replace(/\'/,'')}` 
    }
    res.json(({"status": 409, "err": msg}));
};

resHandler = (res,results) => {
    res.status(200).json(({"status": 200,"data": results}))
};

authHandler = (err,results,res) => {
    if(err.check){
        res.status(200).json(({"status": 200,"data": results}))
    }else{
        res.status(401).json(({"status": 401,"err": "Credentials not valid"}))
    }
}
