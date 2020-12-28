const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RequestSchema = new Schema({
  reqData: String,
});

module.exports = mongoose.model("Request", RequestSchema);
