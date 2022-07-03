const mongoose = require("mongoose");


const reqSchema = new mongoose.Schema({
    serviceName: { type: String, unique: true, required: true },
    serviceId: { type: Number, unique: true, required: true },
    createdBy: { type: Number, unique: true, required: true },
    adminMargin: { type: Number },
    status: { type: Number, unique: true, required: true },
    custMobile: { type: String, unique: true, required: true },
    totalPrice: { type: String, unique: true, required: true },
    technicianDetails: { type: Object, unique: true },
    techieMargin:{ type: Number },
    custName: { type: String, unique: true },
    serviceLocation: { type: String, required: true },
    serviceCoordinates: { type: Object, required: true },
    serviceDate: { type: String },
    serviceTime: { type: String },
    createdOn: { type: String }
});

module.exports = mongoose.model("request", reqSchema);