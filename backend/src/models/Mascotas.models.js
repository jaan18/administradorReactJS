const mongoose = require("mongoose");
const { Schema } = mongoose;

const MascotasSchema = new Schema({
  nombre: String,
  edad: String,
  raza: String,
  ubicacion: String,
});

module.exports = mongoose.model("mascotas", MascotasSchema);
