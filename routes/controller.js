const db = require('../configs/connection');
const { handler } = require('../configs/handler');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.getAll = (req, res) => {
    db.query(query.GETALL_USER,
        (err, results) => handler(err, results, res));
};

exports.creatUser = (req, res) => {
    req.body.pwd ? req.body.pwd = hashSync(req.body.pwd, genSaltSync(10)) : null;
    db.query(query.CREATE_USER, req.body,
        (err, results) => handler(err, results, res));
};

exports.updateUser = (req, res) => {
    let data = [req.body, req.params.id];
    db.query(query.UPDATE_USER, data,
        (err, results) => handler(err, results, res));
};

exports.deleteUser = (req, res) => {
    db.query(query.DELETE_USER, req.params.id,
        (err, results) => handler(err, results, res));
};

exports.signInUser = (req, res) => {
    db.query(query.SIGNIN_USER, req.body.username,
    (err, results) => {
        let check = false;
        results.map(val => {
            check = compareSync(req.body.pwd, val.pwd)
            delete val.pwd
        })
        if(check){
            results.map(val=>val.token = sign({ result: val }, "qwe1234", {expiresIn: "1h"}))
            results = results[0]
        }
        let body = { check: check, type: 'auth' }
        handler(body, results, res)
    });
};

