const Auth = {};
const jwt = require("jsonwebtoken");

Auth.verificarToken = (req, res, next) => {
  if (!req.headers.autorizacion) {
    return res.json({
      mensaje: "No estas autorizado para esta ruta",
    });
  }
  const token = req.headers.autorizacion;
  if (token === "null") {
    return res.json({
      mensaje: "No estas autorizado para esta ruta",
    });
  }

  jwt.verify(token, "secreta", (error, resultado) => {
    if (error)
      return res.json({
        mensaje: "No estas autorizado para esta ruta",
      });
    next();
  });
};

module.exports = Auth;
