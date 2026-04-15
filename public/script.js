 const cards = document.querySelectorAll(".card");

  cards.forEach((oneCard) => {
    oneCard.addEventListener('click', (event) => {
      event.preventDefault();
      oneCard.classList.toggle("flip")
    })
  })


  const socket = io();
