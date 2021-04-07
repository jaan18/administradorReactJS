const moongose = require("mongoose");

URI = "mongodb://localhost/mascotas";

moongose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then((db) => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

module.exports = moongose;
