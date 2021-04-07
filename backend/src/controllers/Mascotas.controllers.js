const MascotasCtrl = {};
const Mascota = require("../models/Mascotas.models");

MascotasCtrl.crear = async (req, res) => {
  const { nombre, edad, raza, ubicacion, id } = req.body;
  const NuevaMascota = new Mascota({
    nombre,
    edad,
    raza,
    ubicacion,
  });
  const respuesta = await NuevaMascota.save();
  res.json({
    mensaje: "Mascota creada",
    respuesta,
  });
};

MascotasCtrl.mostrarTodos = async (req, res) => {
  const respuesta = await Mascota.find();
  res.json(respuesta);
};

MascotasCtrl.eliminar = async (req, res) => {
  const id = req.params.id;
  await Mascota.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Mascota eliminada de la base de datos",
  });
};

MascotasCtrl.modificar = async (req, res) => {
  const id = req.params.id;
  await Mascota.findByIdAndUpdate({ _id: id }, req.body);
  res.json({
    mensaje: "Mascota actualizada",
  });
};

MascotasCtrl.buscarMascota = async (req, res) => {
  const nombre = req.params.nombre;
  const respuesta = await Mascota.findOne({
    nombre: { $regex: ".*" + nombre + ".*" },
  });
  res.json(respuesta);
};

module.exports = MascotasCtrl;
