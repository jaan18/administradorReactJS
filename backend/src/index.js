const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./database");

app.set("Port", 4000);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origen: "*" }));

app.use("/admin", require("./routes/Admin.route"));
app.use("/mascotas", require("./routes/Mascotas.route"));

app.listen(app.get("Port"), () => {
  console.log("Servidor en el puerto", app.get("Port"));
});
