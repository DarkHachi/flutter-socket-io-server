const {io} = require('../index');

io.on("connection", (client) => {
  console.log("Cliente Conectado");

  client.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("nuevo-mensaje", (payload) => {
    console.log(payload);
    // io.emit("nuevo-mensaje", payload); //emite el mensaje a todos
    client.broadcast.emit("nuevo-mensaje", payload); //emite a todos menos a quien emitio
  });
});
