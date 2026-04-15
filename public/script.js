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
const messageInput = document.querySelector("#message");
const pseudoInput = document.querySelector("#pseudo");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (messageInput.value === "" || pseudoInput.value === "") {
    return;
  }

  socket.emit("chat:message", messageInput.value, pseudoInput.value);
  messageInput.value = "";
});

socket.on("chat:message", (message, pseudo) => {
  console.log("message en cours de reception");
  const messages = document.querySelector(".messages");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = `${pseudo} : ${message}`;
  div.appendChild(p);
  messages.appendChild(div);
});

socket.on("chat:init", (data) => {
  console.log(data);
  data.forEach((element) => {
    const { pseudo, message } = element;
    const messages = document.querySelector(".messages");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${pseudo} : ${message}`;
    div.appendChild(p);
    messages.appendChild(div);
  });
});
