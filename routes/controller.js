const axios =require('axios')
const { response } = require('express')

exports.getPlaces = (req, res) => {
    console.log(req)
    const obj=req.body;
     const fetchUrl="https://maps.googleapis.com/maps/api/place/textsearch/json?query="+obj?.buildName+obj?.area+"&location="+obj?.coords?.lat+","+obj?.coords?.lng+"&radius=15000&key=AIzaSyDBIF6tEKyTxtxnH6zM_US7Jg4s6eM8VLQ";
    axios.get(fetchUrl)
    .then(response =>{ 
        var string = response.data;
        res.status(201).send({ "data": string});
    }),
      (error) => {
        console.log(error)
    }
    // db.query(query.GETALL_USER,
    //     (err, results) => handler(err, results, res));
};





