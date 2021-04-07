const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  nombre: String,
  correo: String,
  contrasena: String,
});

module.exports = mongoose.model("admin", AdminSchema);
