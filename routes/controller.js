// const db = require('./connection');
const { sendToken, verifyToken } = require('./handler');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const user = require('../schemas/user');
const db = require('../db/connect');
const request = require('../schemas/request');

exports.getAll = (req, res) => {
    // db.query(query.GETALL_USER,
    //     (err, results) => handler(err, results, res));
};

exports.registerUser = (req, res) => {
    const dbConnect = db.getDb();
    req.body.password ? req.body.password = hashSync(req.body.password, genSaltSync(10)) : null;
    const document = new user({
        name: req.body.name,
        email: req.body.email,
        phoneNbr: req.body.phone,
        role: req.body.role,
        password: req.body.password,
        pincode: req.body.pincode ? req.body.pincode : null,
        latitude: req.body.latitude ? req.body.latitude : null,
        longitude: req.body.longitude ? req.body.longitude : null,
        city: req.body.city ? req.body.city : null,
        state: req.body.state ? req.body.state : null,
        landmark: req.body.landmark ? req.body.landmark : null,
        area: req.body.area ? req.body.area : null,
        doorNbr: req.body.doorNbr ? req.body.doorNbr : null,
        street: req.body.street ? req.body.street : null,
        createdBy: req.body.createdby ? req.body.createdby : null
    });
    dbConnect.collection("Users").findOne({
        $or: [
            { email: req.body.email },
            { phoneNbr: req.body.phone }]
    }, function (err, result) {
        if (result) {
            res.status(409).json({ "err": "Email or Phone Number Already Exists" });
        }
        else {
            dbConnect
                .collection("Users")
                .insertOne(document, function (err, result) {
                    if (result) {
                        res.status(201).json({ "data": "User Registered SuccessFully!" });
                    }
                    if (err) {
                        res.status(500).json({ "err": "Internal Server Error!" });
                    }
                });
        }

    });

};
exports.creatUser = (req, res) => {
    const verifiedAcess = verifyToken(req);
    if (verifiedAcess) {
        const dbConnect = db.getDb();
        const defaultPasswd = hashSync("Test@123", genSaltSync(10));
        const document = new user({
            name: req.body.name,
            email: req.body.email,
            phoneNbr: req.body.phone,
            role: req.body.role,
            password: defaultPasswd,
            pincode: req.body.pincode ? req.body.pincode : null,
            latitude: req.body.latitude ? req.body.latitude : null,
            longitude: req.body.longitude ? req.body.longitude : null,
            city: req.body.city ? req.body.city : null,
            state: req.body.state ? req.body.state : null,
            landmark: req.body.landmark ? req.body.landmark : null,
            area: req.body.area ? req.body.area : null,
            doorNbr: req.body.doorNbr ? req.body.doorNbr : null,
            createdBy: req.body.createdby ? req.body.createdby : null
        });
        dbConnect.collection("Users").findOne({
            $or: [
                { email: req.body.email },
                { phoneNbr: req.body.phone }]
        }, function (err, result) {
            if (result) {
                res.status(409).json({ "err": "Email or Phone Number Already Exists" });
            }
            else {
                dbConnect
                    .collection("Users")
                    .insertOne(document, function (err, result) {
                        if (result) {
                            res.status(201).json({ "data": "User Added SuccessFully!" });
                        }
                        if (err) {
                            res.status(500).json({ "err": "Internal Server Error!" });
                        }
                    });
            }

        });
    }
    else {
        res.status(401).json({ "err": "Session Not Valid,Please reauthenticate" });
    }

};

exports.getAllUsers = (req, res) => {
    const verifiedAcess = verifyToken(req);
    if (verifiedAcess) {
        const dbConnect = db.getDb();
        dbConnect.collection("Users").find({role:req.body.role}).toArray(function (err, result) {
            if (result) {
                res.status(200).json(result);
            }
            if (!result) {
                res.status(200).json({res:"No Data Found"});
            }
            else if(err){
                res.status(500).json({res:"Internal Server Error"});
            }
        });
    }
    else {
        res.status(401).json({ "err": "Session Not Valid,Please reauthenticate" });
    }
};

exports.deleteUser = (req, res) => {
    // db.query(query.DELETE_USER, req.params.id,
    //     (err, results) => handler(err, results, res));
};

exports.dummy = (req, res) => {
    let msg = "Something went wrong";
    res.json(({ "status": 409, "err": msg }));

};

exports.signInUser = (req, res) => {
    const dbConnect = db.getDb();
    dbConnect.collection("Users").findOne({
        $or: [
            { email: req.body.email },
            { phoneNbr: req.body.email }]
    }, function (err, result) {
        if (result) {
            const token = sendToken(result)
            res.status(200).json({ "status": "Logged In SuccessFully", "data": { name: result.name, userId: result.userId, token: token } });
        }
        else if (err) {
            res.status(409).json({ "err": "User Not Registered,Please Register" });
        }
        else {
            res.status(500).json({ "err": "Internal Server Error" });
        }
    });
};

exports.createReq = (req, res) => {
    const verifiedAcess = verifyToken(req);
    if (verifiedAcess) {
        const dbConnect = db.getDb();
        const document = new request({
            serviceName: req.body.serviceName,
            custMobile: req.body.userPhone,
            serviceLocation: req.body.serviceLocation,
            serviceCoordinates: req.body.serviceCoordinates,
            status: req.body.status,
            serviceDate: req.body.serviceDate,
            serviceTime: req.body.serviceTime,
            serviceId: req.body.serviceId,
            adminMargin: req.body.adminMargin,
            techieMargin: req.body.techieMargin,
            technicianDetails: req.body.technicianDetails,
            custName: req.body.custName,
            totalPrice: req.body.totalPrice,
            createdBy: req.body.createdBy
        })
        dbConnect.collection("requests").findOne({ createdBy: req.body.createdBy, phone: req.body.serviceDate },
            function (err, result) {
                if (result) {
                    res.status(417).json({ "err": "Request Already Exists" });
                }
                else {
                    dbConnect.collection("requests").insertOne(document, function (err, result) {
                        if (result) {
                            res.status(201).json({ "res": "Request Created SuccessFully" });
                        }
                        if (err) {
                            res.status(500).json({ "err": "Interval Server Error" });
                        }

                    })
                }
                })
        //     }
    }
    else {
        res.status(401).json({ "err": "Session Not Valid,Please reauthenticate" });
    }

};

exports.getReq = (req, res) => {
    const verifiedAcess = verifyToken(req);
    if (verifiedAcess) {
        const dbConnect = db.getDb();
        dbConnect.collection("requests").find().toArray(function(err,result){

          console.log(result)

            if (result) {
                res.status(200).json({data:result});
            }

            else if(!result){
                res.status(200).json({res:"No Data Available"});
            }

           else  if(err){
            res.status(500).json({ "err": "Internal Server Error" });
            }
        });
    }
    else {
        res.status(401).json({ "err": "Session Not Valid,Please reauthenticate" });
    }

};

exports.dashDetails = (req, res) => {
    const verifiedAcess = verifyToken(req);
    if (verifiedAcess) {
        const dbConnect = db.getDb();
        dbConnect.collection("requests").aggregate([{ "$facet": {
            "total": [
              { "$match" : { "status": { "$exists": true }}},
              { "$count": "total" },
            ],
            "created": [
              { "$match" : {"status": { "$exists": true, "$in": [1] }}},
              { "$count": "created" }
            ],
            "accepted": [
              { "$match" : {"status": { "$exists": true, "$in": [2] }}},
              { "$count": "accepted" }
            ],
            "cancelled": [
                { "$match" : {"status": { "$exists": true, "$in": [3,4] }}},
                { "$count": "cancelled" }
              ],
              "intiated": [
                { "$match" : {"status": { "$exists": true, "$in": [5] }}},
                { "$count": "intiated" }
              ],
              "completed": [
                { "$match" : {"status": { "$exists": true, "$in": [0] }}},
                { "$count": "completed" }
              ],
            
          }},
          { "$project": {
            "total": { "$arrayElemAt": ["$total.total", 0] },
            "created": { "$arrayElemAt": ["$created.created", 0] },
            "accepted": { "$arrayElemAt": ["$accepted.accepted", 0] },
            "cancelled": { "$arrayElemAt": ["$cancelled.cancelled", 0] },
            "intiated": { "$arrayElemAt": ["$intiated.intiated", 0]},
            "completed": { "$arrayElemAt": ["$completed.completed", 0] }
          }}
        ]).toArray(function(err,result){
         console.log(result)

            if (result) {
                res.status(200).json(result);
            }

            else if(!result){
                res.status(200).json({res:"No Data Available"});
            }

           else  if(err){
            res.status(500).json({ "err": "Internal Server Error" });
            }
        });
    }
    else {
        res.status(401).json({ "err": "Session Not Valid,Please reauthenticate" });
    }

};


