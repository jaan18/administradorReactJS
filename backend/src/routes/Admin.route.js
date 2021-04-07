const { Router } = require("express");
const router = Router();
const AdminCtrl = require("../controllers/Admin.controllers");

router.post("/crear", AdminCtrl.crearAdmin);
router.post("/login", AdminCtrl.login);

module.exports = router;
