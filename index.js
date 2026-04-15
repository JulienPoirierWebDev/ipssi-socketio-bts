const express = require("express");
const { createServer } = require("http");
const fs = require("fs").promises;
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

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
  console.log("un utilisateur", socket.id);

  socket.on("chat:message", (data) => {
    console.log(data);
    io.emit("chat:message", data);
  });
});

server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Le serveur est lancé sur le port 3000");
});
