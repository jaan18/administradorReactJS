const { Router } = require("express");
const router = Router();
const MascotasCtrl = require("../controllers/Mascotas.controllers");
const { route } = require("./Admin.route");
const Auth = require("../helper/Auth");

router.post("/crear", Auth.verificarToken, MascotasCtrl.crear);
router.get("/mostrarMascotas", MascotasCtrl.mostrarTodos);
router.delete("/eliminar/:id", Auth.verificarToken, MascotasCtrl.eliminar);
router.put("/modificar/:id", Auth.verificarToken, MascotasCtrl.modificar);
router.get("/buscar/:nombre", Auth.verificarToken, MascotasCtrl.buscarMascota);

module.exports = router;
