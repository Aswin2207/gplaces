const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null,required:true },
  email: { type: String, unique: true,required:true },
  phoneNbr: { type: Number, unique: true,required:true },
  password: { type: String,unique:true,required:true },
  role: { type: Number,required:true },
  createdBy:{type:Number},
  pincode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  state: { type: String },
  city: { type: String },
  landmark: { type: String },
  Area: { type: Number },
  doorNbr: { type: Number },
  street: { type: String }
});



module.exports = mongoose.model("user", userSchema);