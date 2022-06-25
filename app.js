const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./api/router');
const cors = require('cors');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(cors());
app.options('*', cors()); 
app.use(express.json());

app.listen(port, () =>console.log(`App running on ${port}`));

app.use("/",routes);