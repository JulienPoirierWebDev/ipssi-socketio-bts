const express = require("express");
const { createServer } = require("http");
const fs = require("fs").promises;
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const inMemoryDB = [];

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  try {
    const myPath = path.join(__dirname, "pages/index.html");
    const html = await fs.readFile(myPath, "utf8");
    response.send(html);
  } catch (error) {
    console.error(error);
    response.status(500).send("Erreur lors du chargement de la page HTML.");
  }
});

io.on("connection", (socket) => {
  io.to(socket.id).emit("chat:init", inMemoryDB);

  socket.on("chat:message", (message, pseudo) => {
    inMemoryDB.push({ pseudo, message });
    console.log(message, pseudo);
    io.emit("chat:message", message, pseudo);
  });
});

server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Le serveur est lancé sur le port 3000");
});

// Comment faire pour identifier l'utilisateur lors de l'envoi du message ?
// Comment faire pour qu'un utilisateur qui arrive en cours de conversation puisse
// récupérer l'ensemble des messages ?
