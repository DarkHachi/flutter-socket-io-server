require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");
//App de Express

//Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);

//Mensajes de Sockets
require('./sockets/socket');

//Path publico
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en puerto!!!!", process.env.PORT);
});
