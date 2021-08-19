const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metalica'));

// console.log(bands);


io.on("connection", (client) => {
  console.log("Cliente Conectado");

  client.emit('active-bands',bands.getBands());
  
  
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
  
  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands',bands.getBands());
  });
});
