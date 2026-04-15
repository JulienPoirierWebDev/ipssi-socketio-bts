const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

let count = 0;

app.use(express.static('public'))

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


app.get("/contact", (request, response) => {

  console.log("hello");
  response.json({message: "Contact"})
})


app.listen(3000, (err) => {

  if (err) {
      return console.log(err);
  }

  console.log("Le serveur est lancé sur le port 3000");
});
