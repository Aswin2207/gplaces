const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/router');
const cors = require('cors');

app.use(cors());
app.options('*', cors()); 
app.use(express.json());

app.listen(port, () =>console.log(`App running on ${port}`));

app.use("/",routes);