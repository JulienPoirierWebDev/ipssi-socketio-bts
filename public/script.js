"use strict";

const cards = document.querySelectorAll(".card");

cards.forEach((oneCard) => {
  oneCard.addEventListener("click", (event) => {
    event.preventDefault();
    oneCard.classList.toggle("flip");
  });
});

const socket = io();

const form = document.querySelector("#form");
const input = document.querySelector("#message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(input.value);

  socket.emit("chat:message", input.value);
  input.value = "";
});

socket.on("chat:message", (data) => {
  console.log("message en cours de reception");
  const messages = document.querySelector(".messages");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = data;
  div.appendChild(p);
  messages.appendChild(div);
});
